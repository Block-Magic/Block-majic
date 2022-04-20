const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

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

    for (let i = 0; i < 10; i++) {
      await agent
        .post('/api/v1/transactions')
        .send({ amount: i + 1, sender: user.id, receiver: receiver.id });
    }

    const res = await agent
      .post('/api/v1/transactions')
      .send({ amount: 10, sender: user.id, receiver: receiver.id });
    

    expect(res.body).toEqual({
      current_hash: expect.any(String),
      id: expect.any(String),
      previous_hash: expect.any(String),
      timestamp: expect.any(String),
      transactions: expect.any(Array),
      
    });
  });


  it('Should create a new transaction and add to DB if less than 10 transactions in block', async () => {
    const [agent, user, receiver] = await signUpAndLogin();

    const res = await agent
      .post('/api/v1/transactions')
      .send({ amount: 10, sender: user.id, receiver: receiver.id });

    expect(res.body).toEqual({
      amount: '10',
      senderId: expect.any(String),
      receiverId: expect.any(String),
      timestamp:expect.any(String),
      signature: expect.any(String)


   
    });


  });
});
