import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  inProgressMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    return res.status(200).json({ inProgress });
    console.log(inProgress);
  };

  get = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress !== undefined) {
      console.log((inProgress));
      const filteredMatches = await this.service.getInProgress(inProgress);
      return res.status(200).json(filteredMatches);
    }
    const matches = await this.service.get();
    console.log('Nao foi');
    return res.status(200).json(matches);
  };
}
