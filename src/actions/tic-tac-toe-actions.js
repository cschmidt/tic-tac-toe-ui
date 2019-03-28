const actions = {
  START_GAME: 'START_GAME',
  GAME_STARTED: 'GAME_STARTED',
  SUBMIT_MOVE: 'SUBMIT_MOVE'
}

const startGame = () => ({
  type: actions.START_GAME
})

const submitMove = (squareId) => ({
  type: actions.SUBMIT_MOVE,
  squareId
})



export { actions, startGame, submitMove }
