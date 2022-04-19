const pool = require('../utils/pool');
const Transaction = require('./Transaction');
const Block = require('./Block');

module.exports = class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(Date.now(), [], '');
  }

  getLastBlock() {
    return this.chain.at(-1);
  }

  // async addNewBlock({ nonce, hash, previousHash }) {
  //   const newBlock = {
  //     index: this.chain.length + 1,
  //     timestamp: Date.now(),
  //     nonce,
  //     hash,
  //     previousHash,
  //   };
  //   this.chain.push(newBlock);

  //   return newBlock;
  // }

  // async getLastBlock() {
  //   return this.chain.length - 1;
  // }

  // static async getCurrentTransactions() {
  //   this.currentTransactions = await Transaction.getCurrentTransactions();
  // }

  // static async getCurrentChain() {
  //   const { rows } = await pool.query('SELECT * FROM ledger');

  //   return new Blockchain(rows[0]);
  // }
};
