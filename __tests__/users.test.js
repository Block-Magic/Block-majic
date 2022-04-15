const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('block-majic user routes', () => {
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

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'dunderhead@blah.com',
    });
  });

  it('signs in an existing user', async () => {
    const agent = request.agent(app);

    const user = await UserService.createUser({
      email: 'dunderhead@blah.com',
      password: 'yourmomrules',
    });

    const { email } = user;

    const res = await agent
      .post('/api/v1/users/sessions')
      .send({ email, password: 'yourmomrules' })
      .redirects(1);

    expect(res.req.path).toEqual('/api/v1/users/homepage');
  });

  it('Should delete cookie from user object', async () => {
    const user = await UserService.createUser({
      email: 'dunderhead@blah.com',
      password: 'yourmomrules',
    });
    const agent = request.agent(app);

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: user.email, password: 'yourmomrules' })
      .redirects(1);

    const res = await agent.delete('/api/v1/users');

    expect(res.body).toEqual({
      success: true,
      message: 'Successfully signed out!',
    });
    expect(res.status).toEqual(200);
  });
});
