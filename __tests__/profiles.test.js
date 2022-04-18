const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const ProfileService = require('../lib/services/ProfileService');
const Profile = require('../lib/models/Profile');

describe('block-majic profile routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should create profile when a new user signs up', async () => {
    const user = await UserService.createUser({
      email: 'caddaddy@car.com',
      password: '123456',
    });

    const profile = await Profile.getById(user.id);

    expect(profile).toEqual({
      publicKey: expect.any(String),
      balance: '100',
      id: expect.any(String),
    });
  });

  it('Should fetch a list of all Users and display the public keys for each', async () => {
    const agent = request.agent(app);

    await UserService.createUser({
      email: 'philsIdea@testing.com',
      password: '111111',
    });
    for (let i = 0; i < 2; i++) {
      await UserService.createUser({
        email: `thisIsAUnique@email${i}.com`,
        password: `123456${i}`,
      });
    }

    await agent.post('/api/v1/users/sessions').send({
      email: 'philsIdea@testing.com',
      password: '111111',
    });

    const res = await agent.get('/api/v1/profiles');
    expect(res.body.length).toEqual(3);
  });
});
