import ITeam from '../interfaces/ITeam';
import Match from '../models/MatchModel';
import Team from '../models/TeamModel';
import MatchService from './MatchService';

export default class LeaderboardService {
  constructor(
    readonly teamModel = new Team(),
    readonly matchModel = new Match(),
    readonly matchService = new MatchService(),
  ) {}

  createBoard = async () => {
    const teams = await Team.findAll();
    const board = [];
    for (let i = 0; i < teams.length; i += 1) {
      const team = {
        name: teams[i].teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: '0',
      };
      board.push(team);
    }
    return board;
  };

  createTeam = () => {
    const team = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '0',
    };
    return team;
  };

  generalBoardCalculator = async (team: ITeam) => {
    // const matches = await Match.findAll();
    const newTeam = this.createTeam();
    newTeam.name = team.name;
    // matches.forEach((match) => {
    //   if (index === Number(match.awayTeam) || index === Number(match.homeTeam)) {
    //     newTeam.
    //   }
    // });
    return newTeam;
  };

  generalBoard = async () => {
    const board = await this.createBoard();
    const newBoard = await Promise.all(board.map(async (team) => {
      const newTeam = await this.generalBoardCalculator(team);
      return newTeam;
    }));
    console.log(newBoard);
    return newBoard;
  };

  // homeBoardCalculator = async () => {
  //   const matchs = await Match.findAll();
  // };

  // awayBoardCalculator = async () => {
  //   const matchs = await Match.findAll();
  // };
}
