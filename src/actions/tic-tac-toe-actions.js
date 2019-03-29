const actions = {
  START_GAME: 'START_GAME',
  GAME_STARTED: 'GAME_STARTED',
  SUBMIT_MOVE: 'SUBMIT_MOVE'
}

const startGame = () => ({
  type: actions.START_GAME
})

const submitMove = (gameId, squareId, mark) => ({
  type: actions.SUBMIT_MOVE,
  gameId,
  squareId,
  mark
})



export { actions, startGame, submitMove }
