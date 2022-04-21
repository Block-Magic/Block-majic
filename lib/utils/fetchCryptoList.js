const fetch = require('cross-fetch');

const fetchCryptoList = async () => {
  try {
    const res = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CMC_PRO_API_KEY': `${process.env.CRYPTO_LIST}`,
        'Accept-Encoding': 'deflate, gzip'
      }
    });

    if (res.status === 400) {
      throw new Error('Bad response from server');
    }

    const list = await res.json();

    console.log(list);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  fetchCryptoList
};

