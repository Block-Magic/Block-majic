const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const ProfileService = require('../lib/services/ProfileService');
const Profile = require('../lib/models/Profile');

const signUpAndLogin = async () => {
  const agent = request.agent(app);

  const user = await UserService.createUser({
    email: 'dunderhead@blah.com',
    password: 'yourmomrules',
  });

  const receiver = await UserService.createUser({
    email: 'receiver@blah.com',
    password: 'yourmomrules',
  });

  const { email } = user;

  await agent
    .post('/api/v1/users/sessions')
    .send({ email, password: 'yourmomrules' });

  return [agent, user, receiver];
};

describe('block-majic profile routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should create a new transaction and add to DB if more than transaction', async () => {
    const [agent, user, receiver] = await signUpAndLogin();

    const res = await agent
      .post('/api/v1/transactions')
      .send({ amount: '10', sender: user.id, receiver: receiver.id });

    expect(res.body).toEqual({
      current_hash: expect.any(String),
      id: expect.any(String),
      previous_hash: expect.any(String),
      timestamp: expect.any(String),
      transactions: expect.any(Array),
    });
  });

  // it('Should create a new block when 10 transactions have been created', async () => {
  //   const [agent, user] = await signUpAndLogin();

  //   for (let i = 0; i < 10; i++) {
  //     await agent.post('/api/v1/transactions').send({ amount:'1', senderId: user.id, receiverId:'ASDFDF' });
  //   }

  // });
});
