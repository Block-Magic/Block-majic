const pool = require('../utils/pool');

module.exports = class Profile {
  id;
  publicKey;
  balance;
  #privateKey;
  #keyPair;

  constructor(row) {
    this.id = row.user_id;
    this.publicKey = row.public_key;
    this.balance = row.balance;
    this.#privateKey = row.private_key;
    this.#keyPair = row.key_pair;
  }

  static async insertProfile(user_id, keyPair, publicKey, privateKey, balance) {
    const { rows } = await pool.query(
      `
          INSERT INTO profiles (user_id, key_pair, public_key, private_key, balance)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *
          `,
      [user_id, JSON.stringify(keyPair), publicKey, privateKey, balance]
    );
    return new Profile(rows[0]);
  }

  get privateKey() {
    return this.#privateKey;
  }

  get keyPair() {
    return this.#keyPair;
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

  async updateBalance(amount, id) {
    const { rows } = await pool.query(
      `UPDATE profiles
    SET balance = $1
    WHERE
    user_id = $2
    RETURNING *
    `,
      [amount, id]
    );
    return new Profile(rows[0]);
  }

  static async getBalance(id) {
    const { rows } = await pool.query(
      `SELECT balance
      FROM
      profiles
      WHERE
      profiles.user_id = $1
`,
      [id]
    );
    return rows[0];
  }

  static async getMyTransactions(id) {
    const { rows } = await pool.query(
      `
      SELECT receiver_id, sender_id, amount FROM transactions
      WHERE sender_id = $1 OR receiver_id = $1
      `,
      [id]
    );
    return { transactions: [...rows] };
  }

  static async sumSentTransactions(id) {
    const { rows } = await pool.query(
      `
      SELECT SUM(amount) As sum
      FROM transactions
      WHERE sender_id = $1
      `,
      [id]
    );
    return { sumOfSentTransactions: rows[0].sum };
  }
};
