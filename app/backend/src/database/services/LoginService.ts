import { JwtPayload, sign, verify } from 'jsonwebtoken';
import bcrypt = require('bcryptjs');
import IMessage from '../interfaces/IMessage';
import User from '../models/UserModel';

export default class LoginService {
  constructor(readonly model = new User()) {}

  login = async (email: string, password: string): Promise<IMessage> => {
    if (email === '') {
      return { status: 400, message: 'All fields must be filled' };
    }
    if (password === '') {
      return { status: 400, message: 'All fields must be filled' };
    }
    const user = await User.findAll({ where: { email } });
    if (user.length === 0) {
      return { status: 401, message: 'Incorrect email or password' };
    }
    const comparison = await bcrypt.compare(password, user[0].password);
    if (!comparison) {
      return { status: 401, message: 'Incorrect email or password' };
    }
    const token = this.generateToken(email, password);
    return { status: 200, token };
  };

  validation = async (authorization: string | undefined) => {
    if (typeof authorization === 'string') {
      const decoded = verify(authorization, 'jwt_secret') as JwtPayload;
      const user = await User.findAll({ where: { email: decoded.email } });
      // console.log(user);
      return user[0].role;
    }
  };

  generateToken = (email: string, password: string) => {
    const payload = { email, password };
    const token = sign(payload, 'jwt_secret');
    return token;
  };
}
