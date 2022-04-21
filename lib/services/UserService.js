const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ProfileService = require('./ProfileService');

module.exports = class UserService {
  static async createUser({ email, password }) {
    try {
      const hashPassword = bcrypt.hashSync(
        password,
        Number(`${process.env.Salt_ROUNDS}`)
      );

      const user = await User.insert({
        email,
        hashPassword,
      });

      await ProfileService.createProfile(user.id);
      return user;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }

  static async signIn({ email, password }) {
    try {
      const user = await User.findByEmail(email);

      if (!user) throw new Error('invalid email/password');
<<<<<<< HEAD
      // check this if password issues
=======
>>>>>>> 8cc67a3f65a8ee53260fb7b3a141ccb98970bbdc
      const matchedPasswords = bcrypt.compareSync(password, user.getPassword);

      if (!matchedPasswords) throw new Error('invalid email/password');
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
