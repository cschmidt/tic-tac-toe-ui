import React, { Component } from 'react'
import AWS from 'aws-sdk'
import { CognitoAuth } from 'amazon-cognito-auth-js'
import { GoogleLogin, GoogleLogout } from 'react-google-login'


// FIXME: don't hard-code configuration
const IDENTITY_POOL_ID = 'us-west-2:4c116aed-72e0-4fb1-86ed-76f9ea375aef'
const COGNITO_USER_POOL_ID = 'us-west-2_QbYc7mC5Y'
const COGNITO_CLIENT_ID = '3dj46869mjf0h1bfbga4u0q57g'
const GOOGLE_CLIENT_ID = '986004864358-a571g131o3k6nnbrgbltsk5q3eo4bt1v.apps.googleusercontent.com'
const AWS_REGION = 'us-west-2'


const logGoogleUserInfo = (googleUser) => {
  console.log('googleUser', googleUser)
  let profile = googleUser.getBasicProfile()
  let authResponse = googleUser.getAuthResponse()
  console.log('profile', profile)
  console.log('authResponse', authResponse)
}


const onSignIn = (googleUser) => {
  // logGoogleUserInfo(googleUser)
  if (googleUser.isSignedIn()) {
    let tokenId = googleUser['tokenId']
    // Add the Google access token to the Cognito credentials login map
    AWS.config.region = AWS_REGION
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITY_POOL_ID,
      Logins: {
        'accounts.google.com': tokenId
      }
    })
    // Obtain AWS credentials
    AWS.config.credentials.get(function() {
      console.log('credentials', AWS.config.credentials)
    })
  }
}


const getGoogleAuthInstance = () => {
  console.log('window', window)
  console.log('window.gapi', window.gapi)
  return window.gapi && window.gapi.auth2.getAuthInstance()
}


const checkSignIn = async() => {
  // see https://developers.google.com/identity/sign-in/web/reference#gapiauth2getauthinstance
  const googleAuth = getGoogleAuthInstance()
  console.log('isSignedIn', googleAuth.isSignedIn.get())
  const googleUser = googleAuth.currentUser.get()
  logGoogleUserInfo(googleUser)
  let userPool = new CognitoAuth({
    UserPoolId: COGNITO_USER_POOL_ID,
    ClientId: COGNITO_CLIENT_ID,
    AppWebDomain: '158c49d1a7ef4787a756dd146669efa7.vfs.cloud9.us-west-2.amazonaws.com',
    TokenScopesArray: ['phone', 'email', 'profile'],
    RedirectUriSignIn: 'https://158c49d1a7ef4787a756dd146669efa7.vfs.cloud9.us-west-2.amazonaws.com',
    RedirectUriSignOut: 'https://158c49d1a7ef4787a756dd146669efa7.vfs.cloud9.us-west-2.amazonaws.com',
    IdentityProvider: 'Google'
  })
  userPool.userhandler = {
    onSuccess: data => console.log('success', data),
    onFailure: data => console.log('failure', data)
  }
  userPool.parseCognitoWebResponse(window.location.href)
  let cognitoUser = userPool.getCurrentUser()
  console.log('cognitoUser', cognitoUser)
}

const cognitoSignIn = () => {
  let userPool = new CognitoAuth({
    UserPoolId: COGNITO_USER_POOL_ID,
    ClientId: COGNITO_CLIENT_ID,
    AppWebDomain: 'schmidt-disturber.auth.us-west-2.amazoncognito.com',
    TokenScopesArray: ['phone', 'email', 'profile'],
    RedirectUriSignIn: 'https://158c49d1a7ef4787a756dd146669efa7.vfs.cloud9.us-west-2.amazonaws.com/login',
    RedirectUriSignOut: 'https://158c49d1a7ef4787a756dd146669efa7.vfs.cloud9.us-west-2.amazonaws.com',
    IdentityProvider: 'Google'
  })
  userPool.getSession()
}

const isSignedIn = () => {
  const googleAuth = getGoogleAuthInstance()
  return googleAuth && googleAuth.isSignedIn.get()
}


class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { signedIn: false }
  }

  componentDidMount() {
    // this.setState({ signedIn: isSignedIn() })
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div>
          <button onClick={cognitoSignIn}>Sign in with Cognito</button>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            onSuccess={onSignIn}
            onFailure={onSignIn}
            responseType='id_token'
            buttonText='Sign in with Google'>
          </GoogleLogin>
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText='Sign out'></GoogleLogout>
        </div>
        <div>
          <button onClick={checkSignIn}>Check Login</button>
        </div>
      </div>
    )
  }
}

export default Login
