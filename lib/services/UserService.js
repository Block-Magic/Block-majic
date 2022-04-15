const bcrypt = require('bcrypt');
const User = require('../models/User');

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
};
