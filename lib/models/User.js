const pool = require('../utils/pool');

module.exports = class User {
  email;
  #password;
  id;

  constructor(row) {
    this.id = row.user_id;
    this.email = row.email;
    this.#password = row.password;
  }

  static async insert ({ email, hashPassword }) {
    const { rows } = await pool.query(
      `INSERT
    INTO users
    (email, password)
    VALUES($1, $2)
    RETURNING *`,
      [email, hashPassword]
    );
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        email=$1
        `,
      [email]
    );
    if (!rows[0]) return null;
    return new User(rows[0]);
  }
  
  get getPassword() {
    return this.#password;
  }

};

