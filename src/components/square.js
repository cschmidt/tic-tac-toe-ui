import * as _ from 'underscore'
import React from 'react'
import PropTypes from 'prop-types'
import { outcomes, moveStates } from '@schmidtdisturbr/tic-tac-toe-api/src/tic-tac-toe'

// Predicates (?)

const inProgress = (game) => {
  return game.outcome === outcomes.UNKNOWN
}

const movePending = (game) => {
  return _.some(game.squares,
    (square) => { return square.moveState === moveStates.MOVE_PENDING })
}

const Square = ({ mark = '', onClick, id, isMarkable, isMovePending = false }) => {
  return (
    <span
      id={id}
      className={'ticTacToeSquare' + (isMarkable ? ' markable' : '') + (isMovePending ? ' movePending' : '')}
      onClick={onClick}>{mark}</span>
  )
}

Square.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  mark: PropTypes.string,
  isMarkable: PropTypes.bool,
  isMovePending: PropTypes.bool
}

export default Square
