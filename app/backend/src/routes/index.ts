import { Application as App } from 'express';
import LoginController from '../database/controllers/LoginController';

const Routes = (app: App) => {
  const loginController = new LoginController();
  app.post('/login', loginController.login);
};

export default Routes;
