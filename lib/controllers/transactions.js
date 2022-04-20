const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Transaction = require('../models/Transaction');

module.exports = Router()
  .post('/', async (req, res) => {
    // console.log('req', req.body);
    const transaction = await Transaction.createNewTransaction(req.body);
    res.send(transaction);

  });


