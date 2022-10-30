import { sign } from 'jsonwebtoken';
import IMessage from '../interfaces/IMessage';
// import IToken from '../interfaces/IToken';
import User from '../models/UserModel';

export default class LoginService {
  constructor(readonly model = new User()) {}

  login = async (email: string, password: string) => {
    if (email === '') return { status: 400, message: 'All fields must be filled' } as IMessage;
    if (password === '') return { status: 400, message: 'All fields must be filled' } as IMessage;
    const user = User.findAll({ where: { email } });
    console.log(user);
    const token = this.generateToken(email, password);
    return { status: 200, token } as IMessage;
  };

  generateToken = (email: string, password: string) => {
    const payload = { email, password };
    const token = sign(payload, 'senha');
    return token;
  };
}
