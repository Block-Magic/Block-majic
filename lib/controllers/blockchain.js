const { Router } = require('express');
const Blockchain = require('../models/Blockchain');

module.exports = Router()
  .post('/', async (req, res) => {
  // const blocksList = await Blockchain.addNewBlock();
    console.log(req.body);
    const block = await Blockchain.addNewBlock(req.body);
    console.log('what', block);
    res.send(block);
  });
