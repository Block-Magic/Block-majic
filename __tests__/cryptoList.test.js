const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('block-majic profile routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should fetch crypto list from coinmarketcap', async () => {
    const res = await request(app)
      .get('/api/v1/crypto');

    expect(res.body).toEqual(expect.any(Array));
    expect(res.body.length).toEqual(10);
  });
});
