import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/UserModel';

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
    })
    it('deve retornar um body { message: "Incorrect email or password" }', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'string',
        password: 'string',
      })
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
    })
  })
});
describe('Testando /login post', () => {
  describe('Quando o usuário está cadastrado', () => {
    const user = {
      email: 'admin@admin.com',
      // password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      password: 'secret_admin'
    }
    beforeEach(() => {
      sinon.stub(User, 'findAll').resolves([user] as User[])
      sinon.stub(bcrypt, 'compare').resolves(true)
    })
    afterEach(() => sinon.restore())
    it('Deve retornar o token', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(user)
      expect(chaiHttpResponse.body).to.have.own.property('token')
    })
  })
});
describe('Testando /login/validate get', () => {
  describe('Quando o usuário está cadastrado', () => {
    const user = {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        // senha: secret_admin
    }
    const payload = {
      email: 'admin@admin.com',
      password: 'secret_admin',
    }
    const header = {
      authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
      .eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ
      .XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc`
    }
    beforeEach(() => {
      sinon.stub(jwt, 'verify').resolves(payload)
      sinon.stub(User, 'findAll').resolves([user] as User[])
    })
    afterEach(() => sinon.restore())
    it('Deve retornar status 200', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .send({ header })
      expect(chaiHttpResponse.status).to.equal(200)
    })
  })
});