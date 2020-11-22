import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({ error: 'User not found.' });
    }

    if (user.password !== password) {
      return response
        .status(401)
        .json({ error: 'Password or email are incorrects.' });
    }

    console.log('autenticado');
    const token = jwt.sign({ user_id: user.id }, 'siuhaushajsnaisn', {
      expiresIn: '2 days',
    });

    return response.status(200).json({ user, token });
  }
}

export default new SessionController();
