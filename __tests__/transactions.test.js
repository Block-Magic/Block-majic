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
    
  const { email } = user;
    
  await agent
    .post('/api/v1/users/sessions')
    .send({ email, password: 'yourmomrules' });

  return [agent, user];
};

describe('block-majic profile routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should create a new transaction and add to DB', async () => {
    const [agent, user] = await signUpAndLogin();

    const res = await agent.post('/api/v1/transactions').send({ amount:'100', senderId: user.id, receiverId:'ASDFDF' });

    expect(res.body).toEqual({
      amount:'100', senderId: user.id, receiverId:'ASDFDF', timestamp: expect.any(String)
    });
  });

  it('Should create a new block when 10 transactions have been created', async () => {
    const [agent, user] = await signUpAndLogin();

    for (let i = 0; i < 10; i++) {
      await agent.post('/api/v1/transactions').send({ amount:'1', senderId: user.id, receiverId:'ASDFDF' });
    }

  });
});

