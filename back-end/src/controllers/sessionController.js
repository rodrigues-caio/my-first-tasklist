import jwt from 'jsonwebtoken';
import { compareSync } from 'bcrypt';

import authConfig from '../config/auth';

import User from '../models/User';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({ error: 'User not found.' });
    }

    const matchPassword = compareSync(password, user.password);

    if (!matchPassword) {
      return response
        .status(401)
        .json({ error: 'Password or email are incorrects.' });
    }

    const token = jwt.sign({ user_id: user.id }, authConfig.verificationKey, {
      expiresIn: authConfig.expireIn,
    });

    return response.status(200).json({ user, token });
  }
}

export default new SessionController();
