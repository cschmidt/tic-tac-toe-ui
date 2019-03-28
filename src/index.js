import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import { move } from './reducers/tic-tac-toe-reducers'
import App from './App'
import thunkMiddleware from 'redux-thunk'
import { sendAction } from './reducers/websockets-middleware'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store =
  createStore(
    move,
    undefined,
    composeEnhancers(applyMiddleware(thunkMiddleware, sendAction(move))))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
