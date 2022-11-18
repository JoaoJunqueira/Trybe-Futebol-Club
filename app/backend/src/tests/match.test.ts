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

    const matchesFinished = matches.filter((match) => match.inProgress === false)

describe('Testando /match get', () => {
    describe('Caso normal em que', () => {
      beforeEach(() => {
        sinon.stub(Match, 'findAll').resolves(matches as [])
      })
      afterEach(() => sinon.restore())
      it('Deve retornar os matches', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .get('/matches')
        .send()
        expect(chaiHttpResponse.body).to.deep.equal(matches)
      })
    })
  });
  describe('Testando /matches?inProgress=false get', () => {
    describe('Caso normal em que', () => {
      beforeEach(() => {
        sinon.stub(Match, 'findAll').resolves(matchesFinished as [])
      })
      afterEach(() => sinon.restore())
      it('Deve retornar os matches', async () => {
        const chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false')
        .send()
        expect(chaiHttpResponse.body).to.deep.equal(matchesFinished)
      })
    })
  });