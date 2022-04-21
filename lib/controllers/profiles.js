const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Profile = require('../models/Profile');

module.exports = Router()
  .get('/', authenticate, async (req, res) => {
    const listOfUsers = await Profile.getAllUsers();

    res.send(listOfUsers);
  })

  .get('/balance', authenticate, async (req, res) => {
    const balance = await Profile.getBalance(req.body.id);

    res.send(balance);
  })

  .get('/alltransactions', authenticate, async (req, res) => {
    const Tx = await Profile.getMyTransactions(req.body.id);
    res.send(Tx);
  });
