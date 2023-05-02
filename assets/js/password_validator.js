// const validator = require('../../utils/pre-validator');

// const username = document.querySelector('.username');

// error.textContent = validator.isValidateUsername(username.value);

// username.appendChild(error);
// console.log(username.value);
const { isValidUserName } = require('../../utils/pre-validator.js');
// import { isValidUserName } from "../../utils/pre-validator.js";

const usernameContainer = document.querySelector('.username');

const error = document.createElement('div');
error.className = 'form-text';
error.textContent = validateUsername(username.value);

const username = document.getElementById('username');
username.addEventListener('change', () => {
  console.log(username.value);
  usernameContainer.appendChild(error);
});
