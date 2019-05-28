import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Auth } from './auth'


function HomeButton(props) {
  return <li><Link to='/'>Home</Link></li>
}

function SignInButton(props) {
  return <li><button onClick={props.onClick}>Sign In</button></li>
}

function SignOutButton(props) {
  return <li><button onClick = {props.onClick}>Sign Out</button></li>
}

function SignedInUser(props) {
  return <li>Welcome, {props.given_name || 'human'}</li>
}

function PlayButton(props) {
  return <li><Link to='/play'>Play</Link></li>
}

function CheckSignInButton(props) {
  return <li><button onClick={props.onClick}>Check SignIn</button></li>
}

class TopNav extends Component {

  constructor(props) {
    super(props)
    this.auth = new Auth()
  }

  componentDidMount() {
    this.auth.init()
  }


  render() {
    return (
      <ul>
        <HomeButton />
        <CheckSignInButton onClick={this.auth.checkSignIn}/>
        <SignedInUser given_name={this.auth.userAttributes().given_name} />
        <SignInButton onClick={this.auth.signIn}/>
        <SignOutButton onClick={this.auth.signOut}/>
        <PlayButton />
      </ul>
    )
  }
}

export default TopNav
