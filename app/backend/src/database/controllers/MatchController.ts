import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  get = async (req: Request, res: Response) => {
    const matches = await this.service.get();
    return res.status(200).json(matches);
  };
}
