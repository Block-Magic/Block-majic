const pool = require('../utils/pool');

module.exports = class Profile {
  id;
  publicKey;
  balance;
  #privateKey;

  constructor(row) {
    this.id = row.user_id;
    this.publicKey = row.public_key;
    this.balance = row.balance;
    this.#privateKey = row.private_key;
  }

  static async insertProfile(user_id, publicKey, privateKey, balance) {
    const { rows } = await pool.query(
      `
          INSERT INTO profiles (user_id, public_key, private_key, balance)
          VALUES ($1, $2, $3, $4)
          RETURNING *
          `,
      [user_id, publicKey, privateKey, balance]
    );
    return new Profile(rows[0]);
  }

  get privateKey() {
    return this.#privateKey;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
          SELECT * FROM profiles
          WHERE user_id = $1
          `,
      [id]
    );
    return new Profile(rows[0]);
  }

  static async getAllUsers() {
    const { rows } = await pool.query(
      `
          SELECT * FROM profiles
          `
    );
    
    return rows.map((row) => new Profile(row));
  }
};
