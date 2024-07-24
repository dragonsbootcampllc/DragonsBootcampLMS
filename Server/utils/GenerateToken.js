const crypto = require('crypto');

function generateRandomToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

module.exports = { generateRandomToken };
