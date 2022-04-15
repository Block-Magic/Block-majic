const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');


module.exports = Router()

  .post('/', async (req, res, next) => {
    try{
      const user = await UserService.createUser(req.body);
      res.send(user);
    }catch(error){
      next(error);
    }
  })


