import { CognitoAuth } from 'amazon-cognito-auth-js'
import { CognitoIdentityServiceProvider } from 'aws-sdk'

// FIXME: don't hard-code configuration
const COGNITO_USER_POOL_ID = 'us-west-2_QbYc7mC5Y'
const COGNITO_CLIENT_ID = '3dj46869mjf0h1bfbga4u0q57g'

const USER_POOL_CONFIG = {
  UserPoolId: COGNITO_USER_POOL_ID,
  ClientId: COGNITO_CLIENT_ID,
  AppWebDomain: 'schmidt-disturber.auth.us-west-2.amazoncognito.com',
  TokenScopesArray: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
  RedirectUriSignIn: 'https://158c49d1a7ef4787a756dd146669efa7.vfs.cloud9.us-west-2.amazonaws.com/',
  RedirectUriSignOut: 'https://158c49d1a7ef4787a756dd146669efa7.vfs.cloud9.us-west-2.amazonaws.com/',
  IdentityProvider: 'Google'
}


export class Auth {

  constructor() {
    this.signedIn = false
    this.userPool = new CognitoAuth(USER_POOL_CONFIG)
    this.userPool.userhandler = {
      onSuccess: data => console.log('success', data),
      onFailure: data => console.log('failure', data)
    }
    this.checkSignIn = this.checkSignIn.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.isSignedIn = this.isSignedIn.bind(this)
    this._userAttributes = {}
  }

  async init() {
    this.userPool.parseCognitoWebResponse(window.location.href)
    let accessToken = this.userPool.getSignInUserSession().accessToken.jwtToken
    let cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
      region: 'us-west-2'
    })
    if (accessToken) {
      let user = await cognitoIdentityServiceProvider.getUser({ 'AccessToken': accessToken }).promise()
      for (let attribute of user.UserAttributes) {
        this._userAttributes[attribute.Name] = attribute.Value
      }
    }
  }

  signIn() {
    this.userPool.getSession()
  }

  signOut() {
    this.userPool.signOut()
  }

  async checkSignIn() {
    let accessToken = this.userPool.getSignInUserSession().accessToken.jwtToken
    let cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
      region: 'us-west-2'
    })
    let user = await cognitoIdentityServiceProvider.getUser({ 'AccessToken': accessToken }).promise()
    for (let attribute of user.UserAttributes) {
      this._userAttributes[attribute.Name] = attribute.Value
    }
  }

  isSignedIn() {
    return this.userPool.getCurrentUser() ? true : false
  }

  currentUser() {
    return this.userPool.getCurrentUser()
  }

  userAttributes() {
    return this._userAttributes
  }

}
