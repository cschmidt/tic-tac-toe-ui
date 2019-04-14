import './App.css'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AWS from 'aws-sdk'
import { connect } from 'react-redux'
import { startGame, submitMove } from './actions/tic-tac-toe-actions'
import Board from './components/board'
import Home from './components/home'
import Login from './components/login'
import TopNav from './components/top-nav'


AWS.config.region = 'us-west-2'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:4c116aed-72e0-4fb1-86ed-76f9ea375aef'
})


const BoardContainer = connect(
  (store, props) => {
    return { gameState: store }
  },
  (dispatch, props) => {
    return {
      onSquareClick: (squareId, game) => {
        dispatch(submitMove(game.id, squareId, game.turn))
      },
      onStartGame: () => {
        dispatch(startGame())
      }
    }
  }
)(Board)



const App = () => (
  <div className='App'>
    <BrowserRouter>
      <TopNav />
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/play' component={BoardContainer}/>
    </BrowserRouter>
  </div>
)


export default App
