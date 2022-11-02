import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  get = async (req: Request, res: Response) => {
    const teams = await this.service.getTeams();
    return res.status(200).json(teams);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.service.getById(Number(id));
    return res.status(200).json(team);
  };
}
