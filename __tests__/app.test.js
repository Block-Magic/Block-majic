const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('block-majic routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should sign up a user with email and password via post route', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ email: 'dunderhead@blah.com', password: 'yourmomrules' });

    expect(res.body).toEqual({ id: expect.any(String), email: 'dunderhead@blah.com' });
  });

  
});
