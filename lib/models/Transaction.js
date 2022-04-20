const pool = require('../utils/pool');
const Blockchain = require('../models/Blockchain');
const SHA256 = require('crypto-js/sha256');

const elliptic = require('elliptic');
const ec = new elliptic.ec('secp256k1');

const Profile = require('../models/Profile');
const Block = require('./Block');
// const Crypto = require('crypto');

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

  calculateHash() {
    return SHA256(
      this.senderId + this.receiverId + this.amount + this.timestamp
    ).toString();
  }

  signTransaction(signingKey) {
    const txHash = this.calculateHash();
    const sign = ec.sign(txHash, signingKey.priv, { canonical: true });
    this.signature = sign.toDER('hex');
  }

  isValid() {
    if (this.senderId === null) return true;
    if (!this.signature || this.signature.length === 0) {
      throw new Error('This transaction is not signed');
    }
    const publicKey = ec.keyFromPublic(this.senderId, 'hex');

    return publicKey.verify(this.calculateHash(), this.signature);
  }

  static async createNewTransaction({ receiver, sender, amount }) {
    const senderProfile = await Profile.getById(sender);

    const newTransaction = new Transaction({
      sender_id: sender,
      receiver_id: receiver,
      amount,
      timestamp: Date.now(),
    });

    newTransaction.signTransaction(JSON.parse(senderProfile.keyPair));
    const transactions = await Transaction.getCurrentTransactions();
   

    if (transactions.length < 10) {
      const { rows } = await pool.query(
        `
        INSERT INTO transactions (amount, sender_id, receiver_id, signature)
        VALUES ($1, $2, $3, $4)
        RETURNING *
         `,
        [amount, sender, receiver, newTransaction.signature]
      );
      // console.log(rows, 'rows--------');
      return new Transaction(rows[0]);
    } else {
      for (const TX of transactions) {
        if (!TX.isValid()) {
          return false;
        }
      }
      const lastBlock = await Blockchain.getLastBlock();
      const newBlock = new Block(
        Date.now(),
        [...transactions],
        lastBlock.current_hash
      );
    
      const block = await Blockchain.addNewBlock(newBlock);
      await pool.query(
        `
        TRUNCATE TABLE
        transactions
         `
      );
      console.log(block, ' block-----')
      return block;
    }
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
