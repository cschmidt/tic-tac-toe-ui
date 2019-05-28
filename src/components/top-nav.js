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

class TopNav extends Component {

  constructor(props) {
    super(props)
    this.auth = new Auth()
    this.state = this.stateFromAuth(this.auth)
  }

  async componentDidMount() {
    await this.auth.init()
    this.setState(this.stateFromAuth(this.auth))
  }

  stateFromAuth(auth) {
    return { user: auth.userAttributes(), signedIn: auth.isSignedIn() }
  }

  render() {
    console.log('state', this.state)
    if (this.state.signedIn) {
      return (
        <ul>
          <HomeButton />
          <PlayButton />
          <SignedInUser given_name={this.state.user.given_name} />
          <SignOutButton onClick={this.auth.signOut}/>
        </ul>
      )
    }
    else {
      return (
        <ul>
          <HomeButton />
          <SignInButton onClick={this.auth.signIn}/>
        </ul>
      )
    }
  }
}

export default TopNav
