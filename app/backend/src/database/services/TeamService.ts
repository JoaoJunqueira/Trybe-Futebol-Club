import Team from '../models/TeamModel';

export default class TeamService {
  constructor(readonly model = new Team()) {}

  getTeams = async () => Team.findAll();

  getById = async (id: number) => Team.findOne({ where: { id } });
}
