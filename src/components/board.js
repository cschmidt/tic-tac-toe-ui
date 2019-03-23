import React from 'react'
import PropTypes from 'prop-types'
import Square from './square'
import Synopsis from './synopsis'

const Board = ({ onSquareClick }) => {
  return (
    <div>
      <div className='ticTacToeBoard'>
        {[1, 2, 3].map( (row) =>
          <div key={row}>
            {['a', 'b', 'c'].map((col) => {
              let id = col+row
              return (<Square id={id} key={id}
                onClick={() => onSquareClick(id)}
                isMarkable = {true}/>)
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
