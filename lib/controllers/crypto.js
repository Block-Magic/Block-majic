const { Router } = require('express');
const { fetchCryptoList } = require('../services/fetchCryptoList');
const { mungeList } = require('../utils/mungeList');

module.exports = Router()
  .get('/',  async (req, res) => {
    const response = await fetchCryptoList();


    const cryptoList = await mungeList(response.data);

    res.send(cryptoList);
  });
