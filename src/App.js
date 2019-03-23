import './App.css'
import React from 'react'
import AWS from 'aws-sdk'
import Board from './components/board'
import { connect } from 'react-redux'
import { submitMove } from './actions/tic-tac-toe-actions'

AWS.config.region = 'us-west-2'
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-west-2:4c116aed-72e0-4fb1-86ed-76f9ea375aef'
})


function squareClicked(id) {
  console.log('click!', id)
}



const BoardContainer = connect(
  (store, props) => {
    console.log('mapStateToProps', props)
    return { gameState: store }
  },
  (dispatch, props) => {
    console.log('mapDispatchToProps', props)
    return {
      onSquareClick: (id) => {
        console.log('onSquareClick', id, props)
        dispatch(submitMove(id))
      }
    }
  }
)(Board)



const App = () => (
  <div className='App'>
    <BoardContainer onSquareClick={squareClicked}/>
  </div>
)


export default App
