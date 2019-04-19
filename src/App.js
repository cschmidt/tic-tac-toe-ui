import './App.css'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { startGame, submitMove } from './actions/tic-tac-toe-actions'
import Board from './components/board'
import Home from './components/home'
import Login from './components/login'
import TopNav from './components/top-nav'


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
