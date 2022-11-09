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
    return res.status(200).json(matches);
  };

  postMatch = async (req: Request, res: Response) => {
    const postResponse = await this.service.post(req);
    if (postResponse.message !== undefined) {
      return res.status(postResponse.status).json({ message: postResponse.message });
    }
    return res.status(postResponse.status).json(postResponse.match);
  };

  postPatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const patchResponse = await this.service.patch(Number(id));
    return res.status(patchResponse.status).json({ message: patchResponse.message });
  };

  alterScore = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const patchResponse = await this
      .service.alterScore(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(patchResponse.status).json({ message: patchResponse.message });
  };
}
