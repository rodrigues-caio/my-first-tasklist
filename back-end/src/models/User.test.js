import db from '../database';
import User from './User';

describe('CRUD in users', () => {
  it('should be able to list users.', async () => {
    let rows = await db.query(`SELECT * FROM users`);

    const data = rows[0];

    expect(await User.listAll()).toEqual(data);
  });

  it('should be able to show an user', async () => {
    try {
      const id = '22b4489c-d0e7-4761-880e-456eb65c45d4';

      const [rows] = await db.query(`SELECT * FROM users WHERE id = '${id}'`);

      const user = rows[0];

      expect(await User.show({ id })).toEqual(user);
    } catch (err) {
      expect(err).toMatch('error');
    }
  });

  it('should be able to find an user', async () => {
    const email = 'carlitooooo@lllxgmail.com';

    const [rows] = await db.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );

    const user = rows[0];

    expect(await User.findOne({ email })).toEqual(user);
  });

  it('should be able to create a new user.', async () => {
    try {
      const { id, name, email, password, image } = {
        id: '22b4489c-d0e7-4761-880e-456eb65c45d3',
        name: 'Caio',
        email: 'caio@outlook.com',
        password: 'asasasa4sa4s',
        image: 'https://google.com',
      };

      await db.query(
        `INSERT INTO users (id, name, email, password, image) VALUES ('${id}', '${name}', '${email}', '${password}', '${image}')`
      );

      const [rows] = await db.query(`SELECT * FROM users WHERE id = '${id}'`);

      expect(
        await User.createUser({ id, name, email, password, image })
      ).toEqual(rows[0]);
    } catch (err) {}
  });

  it('should be able to find user by email.', async () => {
    const email = '';

    const [rows] = await db.execute(
      `SELECT email FROM users WHERE email = '${email}'`
    );

    const user = rows[0];

    expect(await User.findByEmail({ email })).toEqual(user);
  });
});
