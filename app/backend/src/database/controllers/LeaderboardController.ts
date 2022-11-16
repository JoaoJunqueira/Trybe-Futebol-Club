import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  getTeams = async (_req: Request, res: Response) => {
    const teams = await this.service.generalBoard();
    return res.status(200).json(teams);
  };
}
