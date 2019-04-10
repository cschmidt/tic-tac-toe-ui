// FIXME: tic-tac-toe-api exports
import { players, outcomes } from '@schmidtdisturbr/tic-tac-toe-api/src/tic-tac-toe.js'
import { actions } from '../actions/tic-tac-toe-actions'


const DEBUG = false

// Utility functions
const debug = (...args) => {
  if (DEBUG) console.log(...args)
}


const initialGameState = {
  id: null,
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

  switch (action.type) {
    case actions.START_GAME:
      return game
    case actions.SUBMIT_MOVE:
      let squareId = action.squareId
      debug('submitMove', squareId, game)
      if (!game.movePending) {
        return { ...game, movePending: squareId }
      }
      else {
        return game
      }
    case actions.GAME_STARTED:
      return { ...initialGameState, id: action.id }
    case 'MOVE_MADE':
      return { ...game,
        movePending: null,
        squares: {
          ...game.squares,
          [action.square]: { mark: action.mark }
        },
        turn: action.turn
      }
    case 'GAME_OVER':
      return { ...game,
        winningLine: action.winningLine,
        outcome: action.outcome,
        winner: action.winner
      }
    case 'ERROR':
      return { ...game, movePending: null }
    default:
      return game
  }
}

export { move }
