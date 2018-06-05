import * as CryptoJS from 'crypto-js';


class Block {
    constructor(index, previousHash, timestamp, data, difficulty, nonce, acceptVotes, denyVotes, hash=undefined) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.difficulty = difficulty;
        this.nonce = nonce;
        if (!hash) {
            this.hash = calculateHash(this.index, this.previousHash, this.timestamp, this.data, this.difficulty,
                this.nonce);
        } else {
            this.hash = hash;
        }
        this.acceptVotes = acceptVotes;
        this.denyVotes = denyVotes;
    }
}

export const calculateHash = (index, previousHash, timestamp, data, difficulty, nonce, acceptVotes, denyVotes) =>
    CryptoJS.SHA256(index + previousHash + timestamp + data + difficulty + nonce + acceptVotes + denyVotes).toString();

export const calculateHashForBlock = (block) =>
    calculateHash(block.index, block.previousHash, block.timestamp, block.data + block.difficulty + block.nonce + block.acceptVotes + block.denyVotes);

export const isValidBlockStructure = block => {
    return typeof block.index === 'number'
        && typeof block.hash === 'string'
        && (typeof block.previousHash === 'string' || (block.previousHash === null && block.index === 0))
        && typeof block.timestamp === 'number'
        && typeof block.data === 'string'
        && typeof block.difficulty === 'number'
        && typeof block.nonce === 'number';
        && typeof block.acceptVotes === 'number';
        && typeof block.denyVotes === 'number';
};

export default Block;
