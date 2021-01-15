import db from '../database';

class User {
  async listAll() {
    const users = await db.query('SELECT * FROM users');

    return users[0];
  }

  async show({ id }) {
    try {
      const [rows] = await db.execute(`SELECT * FROM users WHERE id = '${id}'`);

      const user = rows[0];

      return user;
    } catch (err) {
      return new Error('Error on the search user');
    }
  }

  async findOne({ email }) {
    try {
      const [rows] = await db.execute(
        `SELECT * FROM users WHERE email='${email}'`
      );

      const user = rows[0];

      return user;
    } catch (err) {
      return new Error(`Error to search an user: ${err}`);
    }
  }

  async createUser({ id, name, email, password, image }) {
    try {
      await db.execute(
        `INSERT INTO 
          users (id, name, email, password, image) 
        VALUES ('${id}', '${name}', '${email}', '${password}', '${image}')`
      );

      const [rows] = await db.execute(`SELECT * FROM users WHERE id = '${id}'`);

      const user = rows[0];

      return user;
    } catch (err) {
      return new Error(`Error at create user: ${err}`);
    }
  }

  async findByEmail({ email }) {
    const [rows] = await db.execute(
      `SELECT email FROM users WHERE email = '${email}'`
    );

    const user = rows[0];

    return user;
  }

  async updateUser({ id, name, email, password, image }) {
    await db.execute(
      `UPDATE users 
       SET name = '${name}', email = '${email}', password = '${password}', image = '${image}' WHERE id = '${id}'`
    );

    const [rows] = await db.execute(`SELECT * FROM users WHERE id = '${id}'`);

    const user = rows[0];

    return user;
  }

  async deleteUser(id) {
    try {
      db.query(`DELETE FROM users WHERE id = '${id}'`);

      return;
    } catch (err) {
      return new Error('Error on delete user.');
    }
  }
}

module.exports = new User();
