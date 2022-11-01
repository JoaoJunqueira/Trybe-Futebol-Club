import { sign } from 'jsonwebtoken';
import bcrypt = require('bcryptjs');
import IMessage from '../interfaces/IMessage';
// import IUser from '../interfaces/IUser';
// import IToken from '../interfaces/IToken';
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

  generateToken = (email: string, password: string) => {
    const payload = { email, password };
    const token = sign(payload, 'jwt_secret');
    return token;
  };
}
