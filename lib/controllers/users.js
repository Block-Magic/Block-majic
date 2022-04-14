const { Router } = require('express');
const User = require('../models/User');


module.exports = Router()

  .post('/', async (req, res, next) => {
    try{
      const user = await User.insert(req.body);
      res.send(user);
    }catch(error){
      next(error);
    }
  });
