import React from 'react'
import PropTypes from 'prop-types'
import Square from './square'
import Synopsis from './synopsis'


const isMarkable = (game, squareId) => {
  return !game.movePending &&
    game.id &&
    game.outcome === 'UNKNOWN' &&
    game.squares[squareId] &&
    !game.squares[squareId].mark
}

const Board = ({ onSquareClick, onStartGame, gameState }) => {
  return (
    <div>
      <div className={'ticTacToeBoard' + (gameState.movePending ? ' movePending' : '')}>
        {[1, 2, 3].map( (row) =>
          <div key={row}>
            {['a', 'b', 'c'].map((col) => {
              let id = col+row
              return (<Square id={id}
                key={id}
                onClick={() => {if (isMarkable(gameState, id)) onSquareClick(id, gameState)}}
                isMarkable = {isMarkable(gameState, id)}
                isMovePending = {gameState.movePending === id}
                mark={gameState.squares[id].mark}
                gameState = {gameState}/>)
            })}
          </div>
        )}
      </div>
      <div>
        <button
          name='startGame'
          onClick={() => onStartGame()}
          disabled={gameState.id !== null && gameState.winningLine === null}>Start Game!</button>
      </div>
      <Synopsis/>
    </div>
  )
}

Board.propTypes = {
  onStartGame: PropTypes.func.isRequired,
  onSquareClick: PropTypes.func.isRequired,
  gameState: PropTypes.object.isRequired,
  gameId: PropTypes.string
}

export default Board
