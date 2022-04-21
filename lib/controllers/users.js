const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      let user = await User.findByEmail(req.body.email);
      if (!user) {
        user = await UserService.createUser(req.body);
      }
      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  .post('/sessions', async (req, res, next) => {
    try {
      const user = await UserService.signIn(req.body);

      res
        .cookie(process.env.COOKIE_NAME, user, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .send({ message: 'Successfully signed in. You are about to be redirected!' })
        .redirect('/api/v1/profiles');
    } catch (error) {
      next(error);
    }
  })

  .delete('/', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME).json({
      success: true,
      message: 'Successfully signed out!',
    });
  });
