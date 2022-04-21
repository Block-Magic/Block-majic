const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Transaction = require('../models/Transaction');

module.exports = Router().post('/', authenticate, async (req, res) => {
  const transaction = await Transaction.createNewTransaction(req.body);
  res.send(transaction);
});
