const pool = require('../utils/pool');
const Blockchain = require('../models/Blockchain');
const SHA256 = require('crypto-js/sha256');
const elliptic = require('elliptic');
const ec = new elliptic.ec('secp256k1');
const Profile = require('../models/Profile');
const Crypto = require('crypto');

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
    return SHA256(this.senderId + this.receiverId + this.amount + this.timestamp).toString();
  }

  signTransaction(sender) {
    const txHash = this.calculateHash();
    const decryptKey = Crypto.privateDecrypt({
      key: sender.privateKey.toString(),
      passphrase: 'show me the money',
      padding:Crypto.constants.RSA_PKCS1_PADDING
    }, Buffer.from(txHash));
  
    const sign = Crypto.createSign('RSA-SHA256');
    sign.update(txHash);
    const signature = sign.sign(decryptKey, 'hex');

    this.signature = signature;
    console.log(this, 'thiiiissss');
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
    // const senderPrivateKey = sender.privateKey();

    const senderProfile = await Profile.getById(sender);
    const receiverProfile = await Profile.getById(receiver);

    const newTransaction = new Transaction({ sender_id: sender, receiver_id: receiver, amount, timestamp: Date.now() });

    newTransaction.signTransaction(senderProfile);
    console.log(newTransaction, 'neeewww transactions');
  
    const transactions = await Transaction.getCurrentTransactions();
    if(transactions.length === 10)
    {
      const currentChain = await Blockchain.getCurrentChain();
      const previousHash = currentChain.getLastBlock().currentHash;

      const currentHash = TransactionService.hashData(transactions, previousHash);



    }
    const { rows } = await pool.query(
      `
        INSERT INTO transactions (amount, sender_id, receiver_id)
        VALUES ($1, $2, $3)
        RETURNING *
         `,
      [amount, sender, receiver]
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
