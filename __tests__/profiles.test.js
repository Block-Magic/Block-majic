const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
<<<<<<< HEAD
const ProfileService = require('../lib/services/ProfileService');
const Profile = require('../lib/models/Profile');

=======

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

>>>>>>> 8cc67a3f65a8ee53260fb7b3a141ccb98970bbdc
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
<<<<<<< HEAD
=======

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

  it('should update the users balance', async () => {
    const [agent, user, receiver] = await signUpAndLogin();

    await agent
      .post('/api/v1/transactions')
      .send({ amount: 10, sender: user.id, receiver: receiver.id });
    const senderProfile = await Profile.getById(user.id);
    const receiverProfile = await Profile.getById(receiver.id);

    expect(senderProfile.balance).toBe('90');
    expect(receiverProfile.balance).toBe('110');
  });

  it('should get a users balance information', async () => {
    const [agent, user, receiver] = await signUpAndLogin();

    await agent
      .post('/api/v1/transactions')
      .send({ amount: 10, sender: user.id, receiver: receiver.id });

    const res = await agent
      .get('/api/v1/profiles/balance')
      .send({ id: user.id });

    expect(res.body).toEqual({ balance: '90' });
  });

  it('Should return a list of all transactions for given user', async () => {
    const [agent, user, receiver] = await signUpAndLogin();

    await agent
      .post('/api/v1/transactions')
      .send({ amount: 10, sender: user.id, receiver: receiver.id });
    await agent
      .post('/api/v1/transactions')
      .send({ amount: 25, sender: user.id, receiver: receiver.id });

    const res = await agent
      .get('/api/v1/profiles/alltransactions')
      .send({ id: user.id });

    expect(res.body).toEqual({
      transactions: expect.any(Array),
    });
  });
>>>>>>> 8cc67a3f65a8ee53260fb7b3a141ccb98970bbdc
});
