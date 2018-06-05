const socket = new WebSocket('ws://localhost:6001');

const responseDispatch = {};

const addSocketMessage = (type, callback) => {
    responseDispatch[type] = callback;
};

socket.onopen = () => {
    socket.send(JSON.stringify({
        type: 3,
        data: null,
    }));
};

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (responseDispatch[message.type]) {
        responseDispatch[message.type](message);
    }
};

export default addSocketMessage;
