const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = class UserService {
  static async createUser({ email, password }) {
    try{
      const hashPassword = bcrypt.hashSync(
        password,
        Number(`${process.env.Salt_ROUNDS}`)
      );
      return User.insert({
        email,
        hashPassword
      });
    } catch(error){
      error.status = 401;
      throw error;
    }
  }

  static async signIn({ email, password }){
    try{
      const user = await User.findByEmail(email);

      if(!user) throw new Error('invalid email/password');
      // check this if password issues
      const matchedPasswords = bcrypt.compareSync(password, user.getPassword);

      if (!matchedPasswords) throw new Error('invalid email/password');
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      return token;
    }catch(error){
      error.status = 401;
      throw error;
    }
  }

};
