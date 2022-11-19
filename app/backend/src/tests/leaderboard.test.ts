import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/MatchModel';
import IMatch from '../database/interfaces/IMatch';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

const matches = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Grêmio"
      }
    },
    {
      id: 2,
      homeTeam: 9,
      homeTeamGoals: 1,
      awayTeam: 14,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "Internacional"
      },
      teamAway: {
        teamName: "Santos"
      }
    },
    {
      id: 3,
      homeTeam: 4,
      homeTeamGoals: 3,
      awayTeam: 11,
      awayTeamGoals: 0,
      inProgress: false,
      teamHome: {
        teamName: "Corinthians"
      },
      teamAway: {
        teamName: "Napoli-SC"
      }
    },
    {
      id: 4,
      homeTeam: 3,
      homeTeamGoals: 0,
      awayTeam: 2,
      awayTeamGoals: 0,
      inProgress: false,
      teamHome: {
        teamName: "Botafogo"
      },
      teamAway: {
        teamName: "Bahia"
      }
    },
    {
      id: 5,
      homeTeam: 7,
      homeTeamGoals: 1,
      awayTeam: 10,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "Flamengo"
      },
      teamAway: {
        teamName: "Minas Brasília"
      }
    }]

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
  

describe('Testando /leaderboard/home get', () => {
    describe('Caso normal em que', () => {
      beforeEach(() => {
        sinon.stub(Match, 'findAll').resolves(matches as [])
        sinon.stub(Team, 'findAll').resolves(teams as [])
      })
      afterEach(() => sinon.restore())
      it('Deve retornar status 200', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home')
        .send()
        expect(chaiHttpResponse.status).to.deep.equal(200)
      })
    })
  });
describe('Testando /leaderboard/away get', () => {
    describe('Caso normal em que', () => {
      beforeEach(() => {
        sinon.stub(Match, 'findAll').resolves(matches as [])
        sinon.stub(Team, 'findAll').resolves(teams as [])
      })
      afterEach(() => sinon.restore())
      it('Deve retornar status 200', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away')
        .send()
        expect(chaiHttpResponse.status).to.deep.equal(200)
      })
    })
  });