const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Profile = require('../models/Profile');

module.exports = Router()
  .get('/profiles', authenticate, async (req, res) => {
    const listOfUsers = await Profile.getAllUsers();

    res.send(listOfUsers);
  });
