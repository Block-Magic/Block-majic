const pool = require('../utils/pool');

module.exports = class Blockchain {
  constructor() {
    this.chain = [];
    this.currentTransactions = [];
  }

  static async addNewBlock(nonce, hash, previousHash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.currentTransactions,
      nonce,
      hash,
      previousHash,
    };
    this.chain.push(newBlock);
    this.currentTransactions = [];

    return newBlock;
  }
};
