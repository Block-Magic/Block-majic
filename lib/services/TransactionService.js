const crypto = require('crypto-js');

module.exports = class TransactionService {
  static async hashData(transactionArray, previousHash) {
    const hasher = crypto.createHmac('sha256', 'secretString');
    const hashData = hasher.update(transactionArray + previousHash);

    const dataAsString = previousHash + nonce.toString() + JSON.stringify(currentHash);

    const hash = sha256(dataAsString);

    return hash;

    return hashData;
  }
};

