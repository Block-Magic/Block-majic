<<<<<<< HEAD
// const bcrypt = require('bcrypt');
=======
>>>>>>> 8cc67a3f65a8ee53260fb7b3a141ccb98970bbdc
const Profile = require('../models/Profile');
const generateKeyPair = require('../utils/KeyGen');

module.exports = class ProfileService {
  static async createProfile(user_id) {
    try {
<<<<<<< HEAD
      const [publicKey, privateKey] = await generateKeyPair();

      return await Profile.insertProfile(user_id, publicKey, privateKey, 100);
=======
      const { keyPair, publicKey, privateKey } = generateKeyPair();

      await Profile.insertProfile(user_id, keyPair, publicKey, privateKey, 100);
      return [keyPair, publicKey, privateKey];
>>>>>>> 8cc67a3f65a8ee53260fb7b3a141ccb98970bbdc
    } catch (error) {
      error.status = 500;
      throw error;
    }
  }
};
