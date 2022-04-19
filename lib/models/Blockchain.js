const pool = require('../utils/pool');
const Transaction = require('./Transaction');

module.exports = class Blockchain {
  constructor() {
    this.chain = [];

  }

  async addNewBlock({ nonce, hash, previousHash }) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      nonce,
      hash,
      previousHash,
    };
    this.chain.push(newBlock);

    return newBlock;
  }

  async getLastBlock() {
    return this.chain.length - 1;
  }

  static async getCurrentTransactions() {
    this.currentTransactions = await Transaction.getCurrentTransactions();
  }

  static async getCurrentChain() {
    const { rows } = await pool.query('SELECT * FROM ledger');
console.log(rows[0]);
    return new Blockchain(rows[0]);
  }
};
