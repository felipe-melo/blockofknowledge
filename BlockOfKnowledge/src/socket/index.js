import { receivedNewKnowledge } from '../actions/search'

const setupSocket = (dispatch, username) => {
  const socket = new WebSocket('ws://localhost:6001')

  socket.onopen = () => {
    socket.send(JSON.stringify({
      type: 0,
      name: "username",
    }))
  }
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case types.ADD_MESSAGE:
        dispatch(receivedNewKnowledge(message.data));
        break;
      default:
        break;
    }
  }

  return socket
}

export default setupSocket
