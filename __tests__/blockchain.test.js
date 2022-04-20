const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Blockchain = require('../lib/models/Blockchain');
// const ProfileService = require('../lib/services/ProfileService');
// const Profile = require('../lib/models/Profile');

// // const signUpAndLoginAndCreateBlockchain = async () => {
// //   const agent = request.agent(app);

// //   const user = await UserService.createUser({
// //     email: 'dunderhead@blah.com',
// //     password: 'yourmomrules',
// //   });

// //   const { email } = user;

// //   await agent
// //     .post('/api/v1/users/sessions')
// //     .send({ email, password: 'yourmomrules' });

// //   const blockChain = await Blockchain.getCurrentChain();

// //   return [blockChain, agent];
// // };
describe('block-majic Blockchain routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Blockchain initialize with genesis block', async () => {
    const blockChain = new Blockchain();

    expect(blockChain.chain.length).toBe(1);
    expect(blockChain.chain).toEqual([
      {
        timestamp: expect.any(Number),
        transactions: [],
        hash: expect.any(String),
        nonce: 0,
        previousHash: '',
      },
    ]);
  });

  it('should get the last block on the chain', async () => {
    expect(await Blockchain.getLastBlock()).toEqual({
      timestamp: expect.any(Date),
      transactions: null,
      current_hash: expect.any(String),
      previous_hash: '0',
      id: expect.any(String),
    });
  });

  //   it('should return a new block from function create new block', async () => {
  //     const [blockChain] = await
  //     signUpAndLoginAndCreateBlockchain();
  //     const res = await blockChain.addNewBlock({ hash: 'ASHD7368276E', previousHash: 'KAENDF72R87Y37', nonce: 2345 });

  //     expect(res).toEqual({
  //       index: 1,
  //       timestamp: expect.any(Number),
  //       transactions: expect.any(Array),
  //       nonce: 2345,
  //       hash: 'ASHD7368276E',
  //       previousHash: 'KAENDF72R87Y37',
  //     });
  //     expect(blockChain.chain.length).toEqual(1);
  //   });

  //   it('should return the last block in the chain', async () => {
  //     const [blockChain, agent] =  await
  //     signUpAndLoginAndCreateBlockchain();
  //     await blockChain.addNewBlock({ hash: 'ASHD7368276E', previousHash: 'KAENDF72R87Y37', nonce: 2346 });
  //     await blockChain.addNewBlock({ hash: 'ASHD7368276O', previousHash: 'KAENDF72R87Y38', nonce: 2347 });

  //     const res = await agent.get(`/api/v1/blockchain/lastblock/${blockChain}`);

  //     expect(res.body).toEqual({
  //       index: 2,
  //       timestamp: expect.any(Number),
  //       transactions: expect.any(Array),
  //       hash: 'ASHD7368276O',
  //       previousHash: 'KAENDF72R87Y38',
  //       nonce: 2347 });
  //   });
});
