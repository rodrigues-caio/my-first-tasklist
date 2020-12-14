import { v4 as uuidv4 } from 'uuid';
import { hashSync } from 'bcrypt';

import User from '../models/User';

class UsersController {
  async index(request, response) {
    const user = await User.listAll();

    if (!user) {
      return response.status(401).json({ error: 'User not found.' });
    }

    return response.status(200).json(user);
  }

  async create(request, response) {
    let { name, email, password, image } = request.body;

    const id = uuidv4();

    const existsEmail = await User.findByEmail({ email });

    if (existsEmail) {
      return response.status(400).json({ error: 'This email already exists.' });
    }

    const passwordCrypto = hashSync(password, 10);

    const user = await User.createUser({
      id,
      name,
      email,
      password: passwordCrypto,
      image,
    });

    return response.status(201).json(user);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, password, image } = request.body;

    const existsEmail = await User.findByEmail({ email });

    if (existsEmail) {
      return response.status(400).json({ error: 'This email already exists.' });
    }

    const user = await User.updateUser({ id, name, email, password, image });

    return response.status(200).json(user);
  }

  async delete(request, response) {
    const { id } = request.params;

    await User.deleteUser(id);

    return response.status(200).json({ success: 'User deleted.' });
  }
}

export default new UsersController();
