// const { generateKeyPairSync } = require('crypto');
const { ec } = require('elliptic');
const keyGen = new ec('secp256k1');

const generateKeyPairs = () => {
  const keyPair = keyGen.genKeyPair();
  const publicKey = keyPair.getPublic('hex');
  const privateKey = keyPair.getPrivate('hex');

  return { keyPair, publicKey, privateKey };
};

module.exports = generateKeyPairs;
