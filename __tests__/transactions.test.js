const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const ProfileService = require('../lib/services/ProfileService');
const Profile = require('../lib/models/Profile');


const signUpAndLogin = async () => {
  const agent = request.agent(app);

  let user = await UserService.createUser({
    email: 'dunderhead@blah.com',
    password: 'yourmomrules',
  });

  let receiver = await UserService.createUser({
    email: 'receiver@blah.com',
    password: 'yourmomrules',
  });

  const { email } = user;

  await agent
    .post('/api/v1/users/sessions')
    .send({ email, password: 'yourmomrules' });

  user = await Profile.getById(user.id);
  receiver = await Profile.getById(receiver.id);
  return [agent, user, receiver];
};

describe('block-majic profile routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should create a new transaction and add to DB', async () => {
    const [agent, user, receiver] = await signUpAndLogin();
    console.log('userrrrrrr', user.id);
    const res = await agent.post('/api/v1/transactions').send({ amount:'100', sender: user.publicKey, receiver: receiver.publicKey });

    expect(res.body).toEqual({
      amount:'100', senderId: user.publicKey, receiverId: receiver.publicKey, timestamp: expect.any(String)
    });
  });

  // it('Should create a new block when 10 transactions have been created', async () => {
  //   const [agent, user] = await signUpAndLogin();

  //   for (let i = 0; i < 10; i++) {
  //     await agent.post('/api/v1/transactions').send({ amount:'1', senderId: user.id, receiverId:'ASDFDF' });
  //   }

  // });
});

