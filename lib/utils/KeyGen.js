<<<<<<< HEAD
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
=======
// const { generateKeyPairSync } = require('crypto');
const { ec } = require('elliptic');
const keyGen = new ec('secp256k1');

const generateKeyPairs = () => {
  const keyPair = keyGen.genKeyPair();
  const publicKey = keyPair.getPublic('hex');
  const privateKey = keyPair.getPrivate('hex');

  return { keyPair, publicKey, privateKey };
>>>>>>> 8cc67a3f65a8ee53260fb7b3a141ccb98970bbdc
};

module.exports = generateKeyPairs;
