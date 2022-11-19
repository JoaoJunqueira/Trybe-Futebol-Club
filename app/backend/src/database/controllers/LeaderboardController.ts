import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  getHomeTeams = async (_req: Request, res: Response) => {
    const teams = await this.service.createHomeBoard();
    return res.status(200).json(teams);
  };

  getAwayTeams = async (_req: Request, res: Response) => {
    const teams = await this.service.createAwayBoard();
    return res.status(200).json(teams);
  };
}
