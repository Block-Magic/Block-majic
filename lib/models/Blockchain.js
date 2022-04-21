const pool = require('../utils/pool');
const Block = require('./Block');

module.exports = class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(Date.now(), [], '');
  }

  static async getLastBlock() {
    const { rows } = await pool.query(
      `
      SELECT * FROM ledger
      `
    );
    return rows[rows.length - 1];
  }

  static async addNewBlock(block) {
    const minedBlock = block.mineBlock(3);
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
};
