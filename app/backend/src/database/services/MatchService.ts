import { Request } from 'express';
import { ParsedQs } from 'qs';
// import IMatch from '../interfaces/IMatch';
import IMessage from '../interfaces/IMessage';
import Match from '../models/MatchModel';
import Team from '../models/TeamModel';
// import IMatches from '../interfaces/IMatches';

export default class MatchService {
  constructor(readonly model = new Match()) {}

  get = async () => Match.findAll(
    { include: [{
      model: Team,
      as: 'teamHome',
      attributes: {
        exclude: ['id'],
      },
    }, {
      model: Team,
      as: 'teamAway',
      attributes: {
        exclude: ['id'],
      },
    }] },
  );

  getInProgress = async (inProgress: string | string[] | ParsedQs | ParsedQs[]) => {
    let boolValue: boolean;
    if (inProgress === 'true') boolValue = true;
    if (inProgress === 'false') boolValue = false;
    const matches = await this.get();
    const filteredMatches = matches.filter((match) => match.inProgress === boolValue);
    return filteredMatches;
  };

  // post = async (homeTeam: number, awayTeam: number): Promise<IMessage> => {
  post = async (req: Request): Promise<IMessage> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    if (homeTeam === awayTeam) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }
    const newMatch = await Match.create(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true },
    );
    return { status: 201, match: newMatch };
  };

  patch = async (id: number): Promise<IMessage> => {
    await Match.update({
      inProgress: false,
    }, {
      where: {
        id,
      },
    });
    return { status: 201, message: 'Finished' };
  };
}
