import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/TeamModel'

chai.use(chaiHttp);

const { expect } = chai;

const teams = [
    {
        id: 1,
        teamName: 'Avaí/Kindermann',
    },
    {
        id: 2,
        teamName: 'Bahia',
    },
    {
        id: 3,
        teamName: 'Botafogo',
    },
    {
        id: 4,
        teamName: 'Corinthians',
    },
    {
        id: 5,
        teamName: 'Cruzeiro',
    },
    {
        id: 6,
        teamName: 'Ferroviária',
    },
    {
        id: 7,
        teamName: 'Flamengo',
    },
    {
        id: 8,
        teamName: 'Grêmio',
    },
    {
        id: 9,
        teamName: 'Internacional',
    },
    {
        id: 10,
        teamName: 'Minas Brasília',
    },
    {
        id: 11,
        teamName: 'Napoli-SC',
    },
    {
        id: 12,
        teamName: 'Palmeiras',
    },
    {
        id: 13,
        teamName: 'Real Brasília',
    },
    {
        id: 14,
        teamName: 'Santos',
    },
    {
        id: 15,
        teamName: 'São José-SP',
    },
    {
        id: 16,
        teamName: 'São Paulo',
    },
  ]

  const team1 = teams.filter((team) => team.id === 1)

describe('Testando a rota teams', () => {
    describe('Para a url /teams', () => {
      let chaiHttpResponse: Response;
      beforeEach(() => sinon.stub(Team, 'findAll').resolves(teams as []))
      afterEach(() => sinon.restore())
      it('deve retornar a lista de teams', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .get('/teams')
        .send()
        expect(chaiHttpResponse.body).to.deep.equal(teams)
      })
    })
  });
  describe('Testando a rota teams', () => {
    describe('Para a url /teams/:id', () => {
      let chaiHttpResponse: Response;
      beforeEach(() => sinon.stub(Team, 'findAll').resolves(team1 as []))
      afterEach(() => sinon.restore())
      it('deve retornar o time com o id selecionado na url', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1')
        .send()
        expect(chaiHttpResponse.body).to.deep.equal(team1)
      })
    })
  });