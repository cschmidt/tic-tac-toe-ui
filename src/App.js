import './App.css'
import React from 'react'
// import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
// import Menu from '@material-ui/icons/Menu'
// import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography'
// import withStyles from '@material-ui/core/styles/withStyles'
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
// import withRoot from './withRoot'
import AWS from 'aws-sdk'
import Board from './components/board'

AWS.config.region = 'us-west-2'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:4c116aed-72e0-4fb1-86ed-76f9ea375aef'
})


function squareClicked(id) {
  console.log('click!', id)
}

const App = () => (
  <div className='App'>
    <Board onSquareClick={squareClicked}/>
  </div>
)


export default App
