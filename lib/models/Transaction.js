const pool = require('../utils/pool');

module.exports = class Transaction {
  constructor(row) {
    this.senderId = row.senderId;
    this.receiverId = row.receiverId;
    this.amount = row.amount;
    this.timestamp = row.timestamp;
  }

  static async createNewTransaction({ receiverId, senderId, amount }) {
    const { rows } = pool.query(
      `
        INSERT INTO transactions (amount, senderId, receiverId)
        VALUES ($1, $2, $3)
        RETURNING *
         `,
      [amount, senderId, receiverId]
    );
    return new Transaction(rows[0]);
  }

  static async getCurrentTransactions() {
    const { rows } = await pool.query(
      `
      SELECT * FROM transactions
      `
    );

    return rows.map((row) => new Transaction(row));
  }

  
};
