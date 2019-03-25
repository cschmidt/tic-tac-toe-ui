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
    a1: { mark: '' },
    a2: { mark: '' },
    a3: { mark: '' },
    b1: { mark: '' },
    b2: { mark: '' },
    b3: { mark: '' },
    c1: { mark: '' },
    c2: { mark: '' },
    c3: { mark: '' }
  },
  movePending: null,
  turn: players.X,
  outcome: outcomes.UNKNOWN,
  winningLine: null,
  synopsis: ''
}

// Reducers


const move = (game = initialGameState, action) => {
  debug('move', action, game)
  let squareId = action.squareId

  switch (action.type) {
    case actions.SUBMIT_MOVE:
      debug('submitMove', squareId, game)
      if (!game.movePending) {
        return { ...game, movePending: squareId }
      }
      else {
        return game
      }
    case 'SERVER_DATA':
      debug('SERVER_DATA', action.state)
      return { ...game, ...action.state }
    default:
      return game
  }
}

export { move }
