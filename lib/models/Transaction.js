const pool = require('../utils/pool');
const Blockchain = require('../models/Blockchain');

module.exports = class Transaction {
  senderId;
  receiverId;
  amount;
  timestamp;


  constructor(row) {
    this.senderId = row.sender_id;
    this.receiverId = row.receiver_id;
    this.amount = row.amount;
    this.timestamp = row.timestamp;
  }

  static async createNewTransaction({ receiverId, senderId, amount }) {
    console.log(this, 'thhiiiiiisssss');
    const transactions = await Transaction.getCurrentTransactions();
    if(transactions.length === 10)
    {
   

    }
    const { rows } = await pool.query(
      `
        INSERT INTO transactions (amount, sender_id, receiver_id)
        VALUES ($1, $2, $3)
        RETURNING *
         `,
      [amount, senderId, receiverId]
    );
    console.log(rows);
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
