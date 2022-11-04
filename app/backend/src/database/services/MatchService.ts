import { ParsedQs } from 'qs';
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

  getInProgress = async (inProgress: string | ParsedQs | string[] | ParsedQs[]) => {
    let boolValue: boolean;
    if (inProgress === 'true') boolValue = true;
    if (inProgress === 'false') boolValue = false;
    const matches = await this.get();
    const filteredMatches = matches.filter((match) => match.inProgress === boolValue);
    return filteredMatches;
  };
}
