const crypto = require('crypto');
const ITERATIONS = 10000; // 10 milions for super secure

function generatePassword(password) {
  let salt = crypto.randomBytes(32).toString('hex');
  let generatedHash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, 64, 'sha512')
    .toString('hex');

  return {
    salt: salt,
    hash: generatedHash,
  };
}

function validatePassword(password, hashInDatabase, salt) {
  let hashFromUserInput = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, 64, 'sha512')
    .toString('hex');

  return hashInDatabase === hashFromUserInput;
}

module.exports.validatePassword = validatePassword;
module.exports.generatePassword = generatePassword;
