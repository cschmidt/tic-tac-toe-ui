import React from 'react'
import PropTypes from 'prop-types'


const Square = ({ mark = '', onClick, id, isMarkable, isMovePending = false, gameState }) => {
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
  gameState: PropTypes.object.isRequired,
  mark: PropTypes.string,
  isMarkable: PropTypes.bool,
  isMovePending: PropTypes.bool
}

export default Square
