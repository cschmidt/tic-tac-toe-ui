// FIXME: tic-tac-toe-api exports
import { players, outcomes } from '@schmidtdisturbr/tic-tac-toe-api/src/tic-tac-toe.js'
import { actions } from '../actions/tic-tac-toe-actions'

const DEBUG = true

// Utility functions
const debug = (...args) => {
  if (DEBUG) console.log(...args)
}


const initialGameState = {
  squares: {
    a1: { mark: '', moveState: null },
    a2: { mark: '', moveState: null },
    a3: { mark: '', moveState: null },
    b1: { mark: '', moveState: null },
    b2: { mark: '', moveState: null },
    b3: { mark: '', moveState: null },
    c1: { mark: '', moveState: null },
    c2: { mark: '', moveState: null },
    c3: { mark: '', moveState: null }
  },
  turn: players.X,
  outcome: outcomes.UNKNOWN,
  winningLine: null,
  synopsis: ''
}

const moveStates = {
  MOVE_PENDING: 'MOVE_PENDING',
  MOVE_COMPLETE: 'MOVE_COMPLETE',
  MOVE_ERROR: 'MOVE_ERROR'
}

// Reducers


const move = (game = initialGameState, action) => {
  debug('move', action, game)
  var squares = { ...game.squares }
  var squareId = action.squareId
  // var isSquareEmpty = squares[squareId] && squares[squareId].mark === ''

  switch (action.type) {
    case actions.SUBMIT_MOVE:
      debug('submitMove', squareId, game)
      squares[squareId] = { ...squares[squareId], moveState: moveStates.MOVE_PENDING }
      return { ...game, squares }
    case 'SERVER_DATA':
      debug('SERVER_DATA', action.state)
      return { ...game, ...action.state }
    default:
      return game
  }
}

export { move }
