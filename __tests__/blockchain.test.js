const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Blockchain = require('../lib/models/Blockchain');
// const ProfileService = require('../lib/services/ProfileService');
// const Profile = require('../lib/models/Profile');



const signUpAndLoginAndCreateBlockchain = async () => {
  const agent = request.agent(app);
  
  const user = await UserService.createUser({
    email: 'dunderhead@blah.com',
    password: 'yourmomrules',
  });
  
  const { email } = user;
  
  await agent
    .post('/api/v1/users/sessions')
    .send({ email, password: 'yourmomrules' });
  
  const blockChain = new Blockchain;

  return [blockChain, agent];
};
describe('block-majic Blockchain routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should return a new block from function create new block', async () => {
    const [blockChain] = await 
    signUpAndLoginAndCreateBlockchain();
    const res = await blockChain.addNewBlock({ hash: 'ASHD7368276E', previousHash: 'KAENDF72R87Y37', nonce: 2345 });

    expect(res).toEqual({
      index: 1,
      timestamp: expect.any(Number),
      transactions: expect.any(Array),
      nonce: 2345,
      hash: 'ASHD7368276E',
      previousHash: 'KAENDF72R87Y37',
    });

  });
});
