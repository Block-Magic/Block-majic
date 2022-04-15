const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const ProfileService = require('../lib/services/ProfileService');

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

    const profile = await profile.getById(user.id);

    expect(profile).toEqual({
      user_id: expect.any(String),
      public_key: expect.any(String),
      balance: 100,
      id: expect.any(String),
    });
  });
});
