const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateKeyPair } = require('../utils/KeyGen');

module.exports = class ProfileService {
  static async createProfile(user_id) {
    const [publicKey, privateKey] = await generateKeyPair();

    const hashPrivateKey = bcrypt.hashSync(
      privateKey,
      Number(`${process.env.Salt_ROUNDS}`)
    );

    try {
      return User.insertProfile(user_id, publicKey, hashPrivateKey, 100);
    } catch (error) {
      error.status = 500;
      throw error;
    }
  }
};
