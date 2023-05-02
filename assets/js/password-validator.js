import { isValidUserName, isValidPassword, isValidBusinessName, isValidBusinessAddress } from '/js/pre-validator.js';

const username = document.querySelector('#username');
const password = document.querySelector('#password');
const businessName = document.querySelector('#businessName');
const businessAddress = document.querySelector('#businessAddress');


// error.textContent = validateUsername(username.value);

username.addEventListener('change', () => getError(username, isValidUserName));
password.addEventListener('change', () => 
{
  console.log(password.value);
  console.log(isValidPassword(password.value));
  getError(password, isValidPassword);

});
if (businessName) businessName.addEventListener('change', () => getError(businessName, isValidBusinessName));
if (businessAddress) businessAddress.addEventListener('change', () => getError(businessAddress, isValidBusinessAddress));


function getError(input, validator) {
  if (!validator(input.value)) {
    input.classList.add('is-valid');
  } else {
    const error = document.createElement('div');
    error.classList.add('invalid-feedback');
    error.innerHTML = validator(input.value);
    input.classList.add('is-invalid');
    input.parentElement.appendChild(error);
  }
}
