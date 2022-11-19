// import ITeam from '../interfaces/ITeam';
// import Model from '../models/index';
import Match from '../models/MatchModel';
import Team from '../models/TeamModel';
import MatchService from './MatchService';

export default class LeaderboardService {
  constructor(
    readonly teamModel = new Team(),
    readonly matchModel = new Match(),
    readonly matchService = new MatchService(),
  ) {}

  sortTeams = (teamA: any, teamB: any) => {
    if (teamA.totalVictories > teamB.totalVictories) {
      return -1;
    }
    if (teamA.totalVictories < teamB.totalVictories) {
      return 1;
    }
    if (teamA.goalsBalance > teamB.goalsBalance) {
      return -1;
    }
    if (teamA.goalsFavor > teamB.goalsFavor) {
      return -1;
    }
    if (teamA.goalsOwn > teamB.goalsOwn) {
      return 1;
    }
    // a must be equal to b
    return 0;
  };

  createHomeBoard = async () => {
    const teams = await Team.findAll();
    const newBoard = Promise.all(teams.map(async (team, i) => {
      const newTeam = {
        name: await this.getTeamName(i + 1),
        totalPoints: await this.countHomeTotalPoints(i + 1),
        totalGames: await this.countHomeGames(i + 1),
        totalVictories: await this.countHomeWins(i + 1),
        totalDraws: await this.countHomeDraws(i + 1),
        totalLosses: await this.countHomeLosses(i + 1),
        goalsFavor: await this.countHomeGoalsFavor(i + 1),
        goalsOwn: await this.countHomeGoalsOwn(i + 1),
        goalsBalance: await this.countHomeGoalsBalance(i + 1),
        efficiency: await this.countHomeEfficiency(i + 1),
      };
      return newTeam;
    }));
    const sortBoard = (await newBoard).sort(this.sortTeams);
    return sortBoard;
  };

  createAwayBoard = async () => {
    const teams = await Team.findAll();
    const newBoard = Promise.all(teams.map(async (team, i) => {
      const newTeam = {
        name: await this.getTeamName(i + 1),
        totalPoints: await this.countAwayTotalPoints(i + 1),
        totalGames: await this.countAwayGames(i + 1),
        totalVictories: await this.countAwayWins(i + 1),
        totalDraws: await this.countAwayDraws(i + 1),
        totalLosses: await this.countAwayLosses(i + 1),
        goalsFavor: await this.countAwayGoalsFavor(i + 1),
        goalsOwn: await this.countAwayGoalsOwn(i + 1),
        goalsBalance: await this.countAwayGoalsBalance(i + 1),
        efficiency: await this.countAwayEfficiency(i + 1),
      };
      return newTeam;
    }));
    const sortBoard = (await newBoard).sort(this.sortTeams);
    return sortBoard;
  };

  getTeamName = async (index: number) => {
    const team = await Team.findOne({ where: { id: index } });
    if (team !== null) return team.teamName;
  };

  countHomeGames = async (index: number) => {
    const matches = await Match.findAll({ where: { inProgress: false, homeTeam: Number(index) } });
    return matches.length;
  };

  countAwayGames = async (index: number) => {
    const matches = await Match.findAll({ where: { inProgress: false, awayTeam: Number(index) } });
    return matches.length;
  };

  countHomeWins = async (index: number) => {
    const matches = await Match.findAll({ where: { inProgress: false, homeTeam: Number(index) } });
    let homeWins = 0;
    matches.forEach((match) => {
      if (Number(match.awayTeamGoals) < Number(match.homeTeamGoals)) {
        homeWins += 1;
      }
    });
    return homeWins;
  };

  countAwayWins = async (index: number) => {
    const matches = await Match.findAll({ where: { inProgress: false, awayTeam: Number(index) } });
    let awayWins = 0;
    matches.forEach((match) => {
      if (Number(match.awayTeamGoals) > Number(match.homeTeamGoals)) {
        awayWins += 1;
      }
    });
    return awayWins;
  };

  countHomeDraws = async (index: number) => {
    const matches = await Match.findAll({ where: { inProgress: false, homeTeam: Number(index) } });
    let homeWins = 0;
    matches.forEach((match) => {
      if (Number(match.awayTeamGoals) === Number(match.homeTeamGoals)) {
        homeWins += 1;
      }
    });
    return homeWins;
  };

  countAwayDraws = async (index: number) => {
    const matches = await Match.findAll({ where: { inProgress: false, awayTeam: Number(index) } });
    let awayWins = 0;
    matches.forEach((match) => {
      if (Number(match.awayTeamGoals) === Number(match.homeTeamGoals)) {
        awayWins += 1;
      }
    });
    return awayWins;
  };

  countHomeLosses = async (index: number) => {
    const matches = await Match.findAll({ where: { inProgress: false, homeTeam: Number(index) } });
    let homeWins = 0;
    matches.forEach((match) => {
      if (Number(match.awayTeamGoals) > Number(match.homeTeamGoals)) {
        homeWins += 1;
      }
    });
    return homeWins;
  };

  countAwayLosses = async (index: number) => {
    const matches = await Match.findAll({ where: { inProgress: false, awayTeam: Number(index) } });
    let awayLosses = 0;
    matches.forEach((match) => {
      if (Number(match.awayTeamGoals) < Number(match.homeTeamGoals)) {
        awayLosses += 1;
      }
    });
    return awayLosses;
  };

  countHomeTotalPoints = async (index: number) => {
    const totalPoints = 3 * (await this.countHomeWins(index)) + (await this.countHomeDraws(index));
    return totalPoints;
  };

  countAwayTotalPoints = async (index: number) => {
    const totalPoints = 3 * (await this.countAwayWins(index)) + (await this.countAwayDraws(index));
    return totalPoints;
  };

  countHomeGoalsFavor = async (index: number) => {
    const matches = await Match.findAll({ where: { inProgress: false, homeTeam: Number(index) } });
    let homeGoals = 0;
    matches.forEach((match) => {
      homeGoals += Number(match.homeTeamGoals);
    });
    return homeGoals;
  };

  countAwayGoalsFavor = async (index: number) => {
    const matches = await Match.findAll({ where: { inProgress: false, awayTeam: Number(index) } });
    let awayGoals = 0;
    matches.forEach((match) => {
      awayGoals += Number(match.awayTeamGoals);
    });
    return awayGoals;
  };

  countHomeGoalsOwn = async (index: number) => {
    const matches = await Match.findAll({ where: { inProgress: false, homeTeam: Number(index) } });
    let awayGoals = 0;
    matches.forEach((match) => {
      awayGoals += Number(match.awayTeamGoals);
    });
    return awayGoals;
  };

  countAwayGoalsOwn = async (index: number) => {
    const matches = await Match.findAll({ where: { inProgress: false, awayTeam: Number(index) } });
    let homeGoals = 0;
    matches.forEach((match) => {
      homeGoals += Number(match.homeTeamGoals);
    });
    return homeGoals;
  };

  countHomeGoalsBalance = async (index: number) => {
    const goalsBalance = (await this
      .countHomeGoalsFavor(index)) - (await this.countHomeGoalsOwn(index));
    return goalsBalance;
  };

  countAwayGoalsBalance = async (index: number) => {
    const goalsBalance = (await this
      .countAwayGoalsFavor(index)) - (await this.countAwayGoalsOwn(index));
    return goalsBalance;
  };

  countHomeEfficiency = async (index: number) => {
    if ((await this.countHomeGames(index)) === 0) return ((0).toFixed(2)).toString();
    const efficiency = 100 * ((await this
      .countHomeTotalPoints(index)) / (3 * (await this.countHomeGames(index))));
    return (efficiency.toFixed(2)).toString();
  };

  countAwayEfficiency = async (index: number) => {
    if ((await this.countAwayGames(index)) === 0) return ((0).toFixed(2)).toString();
    const efficiency = 100 * ((await this
      .countAwayTotalPoints(index)) / (3 * (await this.countAwayGames(index))));
    return (efficiency.toFixed(2)).toString();
  };
}
