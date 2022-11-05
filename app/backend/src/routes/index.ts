import { Application as App } from 'express';
import TeamController from '../database/controllers/TeamController';
import LoginController from '../database/controllers/LoginController';
import MatchController from '../database/controllers/MatchController';

const Routes = (app: App) => {
  const loginController = new LoginController();
  app.post('/login', loginController.login);
  app.get('/login/validate', loginController.validation);

  const teamController = new TeamController();
  app.get('/teams', teamController.get);
  app.get('/teams/:id', teamController.getById);

  const matchController = new MatchController();
  app.get('/matches', matchController.get);
};

export default Routes;
