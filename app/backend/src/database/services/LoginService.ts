import { sign } from 'jsonwebtoken';
import IMessage from '../interfaces/IMessage';
// import IToken from '../interfaces/IToken';
import User from '../models/UserModel';

export default class LoginService {
  constructor(readonly model = new User()) {}

  login = async (email: string, password: string) => {
    if (email === '') return { status: 400, message: 'All fields must be filled' } as IMessage;
    if (password === '') return { status: 400, message: 'All fields must be filled' } as IMessage;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { status: 401, message: 'Incorrect email or password' } as IMessage;
    }
    const token = this.generateToken(email, password);
    return { status: 200, token } as IMessage;
  };

  generateToken = (email: string, password: string) => {
    const payload = { email, password };
    const token = sign(payload, 'senha');
    return token;
  };
}
