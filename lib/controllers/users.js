const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

<<<<<<< HEAD

module.exports = Router()

  .post('/', async (req, res, next) => {
    try{
      const user = await UserService.createUser(req.body);
      res.send(user);
    }catch(error){
=======
module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      let user = await User.findByEmail(req.body.email);
      if (!user) {
        user = await UserService.createUser(req.body);
      }
      res.send(user);
    } catch (error) {
>>>>>>> 8cc67a3f65a8ee53260fb7b3a141ccb98970bbdc
      next(error);
    }
  })

  .post('/sessions', async (req, res, next) => {
<<<<<<< HEAD
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
  .get('/homepage', async (req, res) => {
    const listOfUsers = await User.getAllUsers();

    res.send(listOfUsers);
  })
=======
    try {
      const user = await UserService.signIn(req.body);

      res
        .cookie(process.env.COOKIE_NAME, user, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .redirect('/api/v1/profiles');
    } catch (error) {
      next(error);
    }
  })
>>>>>>> 8cc67a3f65a8ee53260fb7b3a141ccb98970bbdc

  .delete('/', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME).json({
      success: true,
<<<<<<< HEAD
      message: 'Successfully signed out!'
    })
  })
=======
      message: 'Successfully signed out!',
    });
  });
>>>>>>> 8cc67a3f65a8ee53260fb7b3a141ccb98970bbdc
