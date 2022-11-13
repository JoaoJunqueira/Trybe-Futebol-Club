import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { Model } from 'sequelize/types';
import IUser from '../database/interfaces/IUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota de login', () => {
  describe('Quando o usuário já está cadastrado', () => {
    const user = {
      email: 'string',
      password: 'string',
      id: 1,
      username: 'string',
      role: 'string',
    }
    beforeAll(() => sinon.stub(Model, 'findAll')).resolves([user] as IUser[])
    afterAll(() => sinon.restore())
    it('deve retornar um status 200', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'string',
        password: 'string',
      })
      expect(httpResponse.status).to.equal(200)
    })
  })
});
