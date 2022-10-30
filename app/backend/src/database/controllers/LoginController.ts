import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loginResponse = await this.service.login(email, password);
    if (loginResponse.token) {
      return res.status(loginResponse.status).json({ token: loginResponse.token });
    }
    return res.status(loginResponse.status).json({ message: loginResponse.message });
  };
}
