const { generateKeyPairSync } = require('crypto');

const generateKeyPairs = () => {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'show me the money',
    },
  });
  return [publicKey, privateKey];
};

module.exports = generateKeyPairs;
