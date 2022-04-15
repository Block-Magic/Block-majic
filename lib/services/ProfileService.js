const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const { generateKeyPair } = require('../utils/KeyGen');

module.exports = class ProfileService {
  static async createProfile(user_id) {
    try {
      const [publicKey, privateKey] = await generateKeyPair();

      return Profile.insertProfile(user_id, publicKey, privateKey, 100);
    } catch (error) {
      error.status = 500;
      throw error;
    }
  }
};
