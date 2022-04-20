// const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const generateKeyPair = require('../utils/KeyGen');

module.exports = class ProfileService {
  static async createProfile(user_id) {
    try {
      const { keyPair, publicKey, privateKey } = generateKeyPair();

      await Profile.insertProfile(user_id, keyPair, publicKey, privateKey, 100);
      return [keyPair, publicKey, privateKey];
    } catch (error) {
      error.status = 500;
      throw error;
    }
  }
};
