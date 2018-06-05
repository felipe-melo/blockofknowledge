import Block, { isValidBlockStructure, calculateHashForBlock, calculateHash } from './Block';
import { broadcastLatest } from './p2p';
import { hexToBinary } from './util';
import fs from 'fs';

// in seconds
const BLOCK_GENERATION_INTERVAL = 10;

// in blocks
const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;


class Blockchain {
	constructor() {
		// TODO make blockchain private and create a get for it
        this.readBlocks = this.readBlocks.bind(this);
        this.writeBlocks = this.writeBlocks.bind(this);
        this.blockchain = [];
        genesisBlock(this.readBlocks);
	}

	writeBlocks(err, data) {

    }

	readBlocks(err, data) {
        if (err){
            console.log(err);
        } else {
            const blocksJson = JSON.parse(data).knowledge;
            blocksJson.forEach(block => {
                this.blockchain.push(new Block(block.index, block.previousHash, block.timestamp, block.data, block.difficulty, block.nonce,
                    block.hash));
            });
        }
    }

	addBlockToChain(newBlock) {
        if (isValidNewBlock(newBlock, this.getLatestBlock())) {
            this.blockchain.push(newBlock);
            const json = {knowledge: this.blockchain};
            fs.writeFile('database.json', JSON.stringify(json), 'utf8', this.writeBlocks);
            return true;
        }
        return false;
	};

	generateNextBlock(blockData) {
        const previousBlock = this.getLatestBlock();
        const difficulty = 5;
        const nextIndex = previousBlock.index + 1;
        const nextTimestamp = getCurrentTimestamp();
        const newBlock = findBlock(nextIndex, previousBlock.hash, nextTimestamp, blockData.text, difficulty, acceptVotes, denyVotes);
        this.addBlockToChain(newBlock);
        broadcastLatest();
        return newBlock;
	};

    replaceChain(newBlocks) {
        if (isValidChain(newBlocks) && newBlocks.length > this.getBlockchain().length) {
            console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
            this.blockchain = newBlocks;
            broadcastLatest();
        } else {
            console.log('Received blockchain invalid');
        }
	};

	getLatestBlock() {
		return this.blockchain[this.blockchain.length - 1];
	}

	getBlockchain() {
		return this.blockchain;
	}
}

const findBlock = (index, previousHash, timestamp, data, difficulty, acceptVotes, denyVotes) => {
    let nonce = 0;
    while (true) {
        const hash = calculateHash(index, previousHash, timestamp, data, difficulty, nonce, acceptVotes, denyVotes);
        if (hashMatchesDifficulty(hash, difficulty)) {
            return new Block(index, previousHash, timestamp, data, difficulty, nonce, acceptVotes, denyVotes);
        }
        nonce++;
    }
};

const hashMatchesBlockContent = (block) => {
    const blockHash = calculateHashForBlock(block);
    return blockHash === block.hash;
};

const hashMatchesDifficulty = (hash, difficulty) => {
    const hashInBinary = hexToBinary(hash);
    const requiredPrefix = '0'.repeat(difficulty);
    return hashInBinary.startsWith(requiredPrefix);
};

const getCurrentTimestamp = () => Math.round(new Date().getTime() / 1000);

const isValidChain = (blockchainToValidate) => {
    const isValidGenesis = (block) => {
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    };

    if (!isValidGenesis(blockchainToValidate[0])) {
        return false;
    }

    for (let i = 1; i < blockchainToValidate.length; i++) {
        if (!isValidNewBlock(blockchainToValidate[i], blockchainToValidate[i - 1])) {
            return false;
        }
    }
    return true;
};

const genesisBlock = (callBack) => {
    fs.readFile('database.json', 'utf8', callBack);
};

const isValidNewBlock = (newBlock, previousBlock) => {
    if (!isValidBlockStructure(newBlock)) {
        console.log('invalid structure');
        return false;
    }
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index');
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previoushash');
        return false;
    }
    return true;
};

const blockchain = new Blockchain();

export default blockchain;
export { isValidNewBlock };
