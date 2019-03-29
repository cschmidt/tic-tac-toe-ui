import { actions } from '../actions/tic-tac-toe-actions'

const DEBUG = false

let connected = false

const moveCommand = (gameId, squareId, mark) => {
  // FIXME: don't hard-code move_number
  return {
    'commands': [{
      'make_move': {
        'game_id': gameId,
        'square': squareId,
        'mark': mark,
        'move_number': 1
      }
    }]
  }
}

const startGameCommand = () => {
  return { 'commands': [{ 'start_game': {} }] }
}


// Utility functions
const debug = (...args) => {
  if (DEBUG) console.log(...args)
}

const queue = []

const connect = (store) => {
  if (!connected) {
    debug('Connecting')
    // FIXME: don't hardcode the websockets URL
    let webSocketUrl = 'wss://0b6r3dg6wk.execute-api.us-west-2.amazonaws.com/dev'
    let webSocket = new WebSocket(webSocketUrl)
    setInterval(() => {
      while (webSocket.readyState === WebSocket.OPEN && queue.length > 0) {
        let message = queue.pop()
        debug('sending', message)
        webSocket.send(message)
      }
    }, 20)
    webSocket.onopen = (event) => {
      debug('onopen', event)
    }
    webSocket.onclose = (event) => {
      debug('onclose', event)
    }
    webSocket.onerror = (event) => {
      debug('onerror', event)
    }
    webSocket.onmessage = (event) => {
      debug('onmessage', event.data)
      // pull out and save the session id? do we need that? kinda hoping not?
      let message = JSON.parse(event.data)
      // can contain multiple events
      for (event of message.events) {
        let eventType = Object.keys(event)[0]
        let eventProperties = event[eventType]
        let action = { type: eventType.toUpperCase(), ...eventProperties }
        debug('action', action)
        store.dispatch(action)
      }
    }
    connected = true
    debug('Connected')
  }
}

const send = (object) => {
  let message = JSON.stringify(object)
  queue.push(message)
  debug('queued', message)
}

const sendAction = reducer => store => next => action => {
  connect(store)
  switch (action.type) {
    case actions.START_GAME:
      send(startGameCommand())
      break
    case actions.SUBMIT_MOVE:
      send(moveCommand(action.gameId, action.squareId, action.mark))
      break
    default:
      return next(action)
  }
  return next(action)
}

export { sendAction }
