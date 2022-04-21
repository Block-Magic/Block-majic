const { Router } = require('express');
const fetchCryptoList = require('../utils/fetchCryptoList');

module.exports = Router()
  .get('/',  async (req, res) => {
    const cryptoList = await fetchCryptoList();

    res.send(cryptoList);
  });
