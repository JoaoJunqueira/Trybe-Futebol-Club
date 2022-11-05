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

  validation = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const role = await this.service.validation(authorization);
    // console.log(role);
    return res.status(200).json({ role });
  };
}
