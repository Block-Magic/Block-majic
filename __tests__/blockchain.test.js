const pool = require('../lib/utils/pool');
const setup = require('../data/setup');


const Blockchain = require('../lib/models/Blockchain');


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
});
