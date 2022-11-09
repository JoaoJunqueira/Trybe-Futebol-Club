import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import User from '../models/UserModel';

export default class Token {
  constructor(
    readonly model = new User(),
  ) { }

  validation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (authorization === undefined) return res.status(401).json({ message: 'Token not found' });
      const decoded = verify(authorization, 'jwt_secret') as JwtPayload;
      const user = await User.findAll({ where: { email: decoded.email } });
      console.log(user);
      if (user.length === 0) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}
