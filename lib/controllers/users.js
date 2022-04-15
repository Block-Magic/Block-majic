const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;


module.exports = Router()

  .post('/', async (req, res, next) => {
    try{
      const user = await UserService.createUser(req.body);
      res.send(user);
    }catch(error){
      next(error);
    }
  })

  .post('/sessions', async (req, res, next) => {
    try{
      const user = await UserService.signIn(req.body);


      res.cookie(process.env.COOKIE_NAME, user, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS
      })
        .redirect('/api/v1/users/homepage');
    } catch(error) {
      next(error);
    }
  })
  .get('/homepage', async (req, res, next) => {
    const listOfUsers = await User.getAllUsers();

    res.send(listOfUsers);
  }


