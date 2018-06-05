import express from 'express';
import bodyParser from 'body-parser'
import blockchain from './src/Blockchain';
import { connectToPeers, getSockets, initP2PServer, broadcastKnowledge, vote } from './src/p2p';
const  ip = require("ip");

const fetch = require("node-fetch");

const httpPort = 3001;
const p2pPort = 6001;

const initHttpServer = (myHttpPort) => {
    const app = express();
    app.use(bodyParser.json());

    // TODO make blockchain private and create a get for it
    app.get('/blocks', (req, res) => {
        res.send(blockchain.getBlockchain());
    });
    app.post('/newBlock', (req, res) => {
        const newBlock = blockchain.generateNextBlock(req.body.data);
        res.send(newBlock);
    });
    app.post('/addKnowledge', (req, res) => {
        broadcastKnowledge({
            text: req.body.data,
            owner: ip.address(),
        });
        res.send(req.body.data);
    });
    app.get('/peers', (req, res) => {
        res.send(getSockets().map((s) => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });
    app.post('/addPeer', (req, res) => {
        connectToPeers(req.body.peer);
        res.send();
    });
    app.post('/vote', (req, res) => {
        vote(req.body);
        res.send();
    });

    app.listen(myHttpPort, () => {
        console.log('Listening http on port: ' + myHttpPort);
    });
};

initHttpServer(httpPort);
initP2PServer(p2pPort);

const config = {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        peer: `ws://${ip.address()}:6001`,
    }),
};

for(let i = 1; i <= 254; i++) {
    fetch(`http://192.168.242.${i}:3001/addPeer`, config)
        .then(() => {
            console.log('ok');
        })
        .catch(error => {
            console.log('deu ruim', error.message);
        });
}
