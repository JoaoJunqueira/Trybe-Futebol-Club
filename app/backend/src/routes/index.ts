import { Application as App } from 'express';
import Token from '../database/auth/Token';
import TeamController from '../database/controllers/TeamController';
import LoginController from '../database/controllers/LoginController';
import MatchController from '../database/controllers/MatchController';
import LeaderboardController from '../database/controllers/LeaderboardController';

const Routes = (app: App) => {
  const loginController = new LoginController();
  app.post('/login', loginController.login);
  app.get('/login/validate', loginController.validation);

  const teamController = new TeamController();
  app.get('/teams', teamController.get);
  app.get('/teams/:id', teamController.getById);

  const matchController = new MatchController();
  const token = new Token();
  app.get('/matches', matchController.get);
  app.post('/matches', token.validation, matchController.postMatch);
  app.patch('/matches/:id', token.validation, matchController.alterScore);
  app.patch('/matches/:id/finish', token.validation, matchController.postPatch);

  const leaderboardController = new LeaderboardController();
  app.get('/leaderboard/home', leaderboardController.getHomeTeams);
  app.get('/leaderboard/away', leaderboardController.getAwayTeams);
};

export default Routes;
