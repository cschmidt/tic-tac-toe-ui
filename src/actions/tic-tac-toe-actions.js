const actions = {
  SUBMIT_MOVE: 'SUBMIT_MOVE',
  SERVER_DATA: 'SERVER_DATA'
}

const submitMove = (squareId) => ({
  type: actions.SUBMIT_MOVE,
  squareId
})

export { actions, submitMove }
