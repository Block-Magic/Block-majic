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

  static async getLastBlock() {
    // return this.chain[this.chain.length - 1];
    const { rows } = await pool.query(
      `
      SELECT * FROM ledger
      `
    );
    return rows[rows.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    const latestBlock = this.getLastBlock();
    const block = new Block(
      Date.now(),
      this.pendingTransactions,
      latestBlock.hash
    );

    block.mineBlock(this.difficulty);

    console.log('block successfully mined');

    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  addTransaction(transaction) {
    if (!transaction.senderId || !transaction.receiverId) {
      throw new Error('Transaction must have valid sender and/or receiver ID');
    }
    if (!transaction.isValid()) {
      throw new Error('Cannot add invalid transaction to the chain');
    }

    this.pendingTransactions.push(transaction);
  }

  getBalance(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.senderId === address) {
          balance -= transaction.amount;
        }
        if (transaction.receiverId === address) {
          balance += transaction.amount;
        }
      }
    }
    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];

      const previousBlock = this.chain[i - 1];

      if (!currentBlock.hasValidTransactions()) return false;
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.error('Hashes do not match');
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.calculateHash()) {
        console.error('Hashes do not match');
        return false;
      }
    }
    return true;
  }

  static async addNewBlock(block) {
    const minedBlock = block.mineBlock(3);
    // FIGURE OUT HOW TO GET DIFFICULTY INTO LINE ABOVE IN LIEU OF 3

    const { rows } = await pool.query(
      `
      INSERT INTO ledger (previous_hash, current_hash, transactions)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [minedBlock.previousHash, minedBlock.hash, minedBlock.transactions]
    );
    return rows[0];
  }

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
