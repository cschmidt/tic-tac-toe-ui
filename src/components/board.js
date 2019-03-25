import React from 'react'
import PropTypes from 'prop-types'
import Square from './square'
import Synopsis from './synopsis'


const isMarkable = (game, squareId) => {
  return !game.movePending && !game.squares[squareId].mark
}

const Board = ({ onSquareClick, gameState }) => {
  return (
    <div>
      <div className={'ticTacToeBoard' + (gameState.movePending ? ' movePending' : '')}>
        {[1, 2, 3].map( (row) =>
          <div key={row}>
            {['a', 'b', 'c'].map((col) => {
              let id = col+row
              return (<Square id={id} key={id}
                onClick={() => onSquareClick(id)}
                isMarkable = {isMarkable(gameState, id)}
                isMovePending = {gameState.movePending === id}
                mark={gameState.squares[id].mark}/>)
            })}
          </div>
        )}
      </div>
      <Synopsis/>
    </div>
  )
}

Board.propTypes = {
  onSquareClick: PropTypes.func.isRequired,
  gameState: PropTypes.object.isRequired
}

export default Board
