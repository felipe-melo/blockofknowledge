import blockchain from './Blockchain';
import { isValidBlockStructure } from './Block';

const  ip = require("ip");


const WebSocket = require('ws');
const sockets = [];
let frontSocket = null;

const ips = {};

const MessageType = {
    QUERY_LATEST: 0,
    QUERY_ALL: 1,
    RESPONSE_BLOCKCHAIN: 2,
    READY_FRONT: 3,
    ADD_KNOWLEDGE_TO_VOTE: 4,
    VOTE: 5,
    RECEIVE_KNOWLEDGE_TO_VOTE: 6,
    UPDATE_BLOCK: 7,
};

const initP2PServer = (p2pPort) => {
    const server = new WebSocket.Server({port: p2pPort});
    server.on('connection', (ws) => {
        initConnection(ws);
    });
    console.log('listening websocket p2p port on: ' + p2pPort);
};

const getSockets = () => sockets;

const initConnection = (ws) => {
    sockets.push(ws);
    initMessageHandler(ws);
    initErrorHandler(ws);
    write(ws, queryChainLengthMsg());
};

const newKnowledgeJson = (data) => ({'type': MessageType.RECEIVE_KNOWLEDGE_TO_VOTE, 'data': data});

const voteJson = (data) => ({'type': MessageType.VOTE, 'data': data});

const JSONToObject = (data) => {
    try {
        return JSON.parse(data);
    } catch (e) {
        console.log(e);
        return null;
    }
};

const initMessageHandler = (ws) => {
	ws.on('message', (data) => {
        const message = JSONToObject(data);
        if (message === null) {
            console.log('could not parse received JSON message: ' + data);
            return;
        }
        console.log('Received message' + JSON.stringify(message));
        switch (message.type) {
            case MessageType.QUERY_LATEST:
                write(ws, responseLatestMsg(ws._socket.remoteAddress));
                break;
            case MessageType.QUERY_ALL:
                write(ws, responseChainMsg());
                break;
            case MessageType.RESPONSE_BLOCKCHAIN:
                if (!ips[ip.address()]) {
                    ips[ip.address()] = message.rename;
                }
                const receivedBlocks = JSONToObject(message.data);
                if (receivedBlocks === null) {
                    console.log('invalid blocks received:');
                    break;
                }
                handleBlockchainResponse(receivedBlocks);
                break;
            case MessageType.READY_FRONT:
                frontSocket = ws;
                break;
            case MessageType.ADD_KNOWLEDGE_TO_VOTE:
                write(frontSocket, newKnowledgeJson(message));
                break;
            case MessageType.VOTE:
                write(frontSocket, voteJson(message));
                break;
        }
    });
};

const write = (ws, message) => ws.send(JSON.stringify(message));
const broadcast = (message) => sockets.forEach((socket) => write(socket, message));

const queryChainLengthMsg = () => ({'type': MessageType.QUERY_LATEST, 'data': null});

const queryAllMsg = () => ({'type': MessageType.QUERY_ALL, 'data': null});

const responseChainMsg = () => ({
    'type': MessageType.RESPONSE_BLOCKCHAIN, 'data': JSON.stringify(blockchain.getBlockchain())
});

const blockchainJson = () => ({
    'type': MessageType.UPDATE_BLOCK, 'data': JSON.stringify(blockchain.getBlockchain())
});

const responseLatestMsg = (ip) => ({
    'type': MessageType.RESPONSE_BLOCKCHAIN,
    'data': JSON.stringify([blockchain.getLatestBlock()]),
    'rename': ip
});

const responseAddKnowsledgeMsg = (json) => ({
    'type': MessageType.ADD_KNOWLEDGE_TO_VOTE,
    'data': json.text,
    'owner': ips[json.owner],
});

const initErrorHandler = (ws) => {
    const closeConnection = (myWs) => {
        console.log('connection failed to peer: ' + myWs.url);
        sockets.splice(sockets.indexOf(myWs), 1);
    };
    ws.on('close', () => closeConnection(ws));
    ws.on('error', () => closeConnection(ws));
};

const handleBlockchainResponse = (receivedBlocks) => {
    if (receivedBlocks.length === 0) {
        console.log('received block chain size of 0');
        return;
    }
    const latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
    if (!isValidBlockStructure(latestBlockReceived)) {
        console.log('block structuture not valid');
        return;
    }
    const latestBlockHeld = blockchain.getLatestBlock();
    if (latestBlockReceived.index > latestBlockHeld.index) {
        console.log('blockchain possibly behind. We got: '
            + latestBlockHeld.index + ' Peer got: ' + latestBlockReceived.index);
        if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
            if (blockchain.addBlockToChain(latestBlockReceived)) {
                write(frontSocket, blockchainJson());
                broadcast(responseLatestMsg());
            }
        } else if (receivedBlocks.length === 1) {
            console.log('We have to query the chain from our peer');
            broadcast(queryAllMsg());
        } else {
            console.log('Received blockchain is longer than current blockchain');
            blockchain.replaceChain(receivedBlocks);
            write(frontSocket, blockchainJson());
        }
    } else {
        console.log('received blockchain is not longer than received blockchain. Do nothing');
    }
};

const broadcastLatest = () => {
    broadcast(responseLatestMsg());
};

const broadcastKnowledge = (json) => {
    broadcast(responseAddKnowsledgeMsg(json));
};

const connectToPeers = (newPeer) => {
    const ws = new WebSocket(newPeer);
    ws.on('open', () => {
        console.log('remote', ws._socket.remoteAddress);
        initConnection(ws);
    });
    ws.on('error', () => {
        console.log('connection failed');
    });
};

const vote = (data) => {
    sockets.forEach((socket) => {
        if (socket._socket.remoteAddress === data.owner) {
			write(socket, {type: MessageType.VOTE, vote: data.vote});
			return;
		}
	});
};

export { connectToPeers, broadcastLatest, initP2PServer, getSockets, broadcastKnowledge, vote };
