// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Do Tung Lam 
//         Hoang Nguyen Nhat Minh
//         Loi Gia Long 
//         Ngo Ngoc Thinh
//         Vu Tuan Linh
// ID:     Do Tung Lam (s3963286)
//         Hoang Nguyen Nhat Minh (s3977856)
//         Loi Gia Long (s3758273)
//         Ngo Ngoc Thinh (s3879364)
//         Vu Tuan Linh (s3927502)
// Acknowledgement: 
// Bootstrap documentation: https://getbootstrap.com/ 
// Bootstrap icon: https://icons.getbootstrap.com/
// Google icon: https://fonts.google.com/icons
// Pexels: https://www.pexels.com/
// Canva: https://www.canva.com/

const crypto = require('crypto');
const ITERATIONS = 10000; // 10 milions for super secure

function generatePassword(password) {
  let salt = crypto.randomBytes(32).toString('hex');
  let generatedHash = crypto.pbkdf2Sync(password, salt, ITERATIONS, 64, 'sha512').toString('hex');

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
