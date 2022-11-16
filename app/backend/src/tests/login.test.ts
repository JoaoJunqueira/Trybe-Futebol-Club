import * as sinon from 'sinon';
import * as chai from 'chai';
// import jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/UserModel';
// import IUser from '../database/interfaces/IUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando as models', () => {
  describe('Quando o usuário não está cadastrado', () => {
    const user = {
      email: 'string',
      password: 'string',
      id: 1,
      username: 'string',
      role: 'string',
    }
    let chaiHttpResponse: Response;
    beforeEach(() => sinon.stub(User, 'findAll').resolves([user] as User[]))
    afterEach(() => sinon.restore())
    it('deve retornar um status 401', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'string',
        password: 'string',
      })
      expect(chaiHttpResponse.status).to.equal(401)
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
    })
  })
});
