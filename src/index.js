import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { move } from './reducers/tic-tac-toe-reducers'
import App from './App'


const store = createStore(move)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
