// const { generateKeyPairSync } = require('crypto');
const { ec } = require('elliptic');
const keyGen = new ec('secp256k1');

const generateKeyPairs = () => {
  // const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  //   modulusLength: 4096,
  //   publicKeyEncoding: {
  //     type: 'spki',
  //     format: 'pem',
  //   },
  //   privateKeyEncoding: {
  //     type: 'pkcs8',
  //     format: 'pem',
  //     cipher: 'aes-256-cbc',
  //     passphrase: 'show me the money',
  //   },
  // });
  // return [publicKey, privateKey];

  const keyPair = keyGen.genKeyPair();
  const publicKey = keyPair.getPublic('hex');
  const privateKey = keyPair.getPrivate('hex');

  return { keyPair, publicKey, privateKey };
};

module.exports = generateKeyPairs;
