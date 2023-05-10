import { isValidUserName, isValidPassword, isValidBusinessName, isValidBusinessAddress, isValidName, isValidAddress } from '/js/pre-validator.js';

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

const username = document.querySelector('#username');
const password = document.querySelector('#password');
const businessName = document.querySelector('#businessName');
const businessAddress = document.querySelector('#businessAddress');
const name = document.querySelector('#name');
const address = document.querySelector('#address');
const submit = document.querySelector('#submit');
const back = document.querySelector('#back-to-login');

username.addEventListener('change', () => getError(username, isValidUserName));
password.addEventListener('change', () => {
  getError(password, isValidPassword);
});

if (name) name.addEventListener('change', () => getError(name, isValidName));
if (address) address.addEventListener('change', () => getError(address, isValidAddress));
if (businessName) businessName.addEventListener('change', () => getError(businessName, isValidBusinessName));
if (businessAddress) businessAddress.addEventListener('change', () => getError(businessAddress, isValidBusinessAddress));

submit.addEventListener('click', (e) => {
  if (!document.querySelector('.invalid-feedback')) {
    console.log('true');
    console.log(document.querySelector('.invalid-feedback'));
    submit.setAttribute('type', 'submit');
  } else {
    console.log('false');
    console.log(document.querySelector('.invalid-feedback'));
    submit.setAttribute('type', 'button');
  }
});

back.addEventListener('click', () => {
  window.location.href = '/login';
});


function getError(input, validator) {
  resetError(input);
  if (!validator(input.value)) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  } else {
    const error = document.createElement('div');
    error.setAttribute('error-data', 'true');
    error.classList.add('invalid-feedback');
    error.innerHTML = validator(input.value);
    input.classList.add('is-invalid');
    input.parentElement.appendChild(error);
  }
}

function resetError(input) {
  const errors = input.parentElement.querySelectorAll('[error-data="true"]');
  errors.forEach((error) => input.parentElement.removeChild(error));
  console.log(errors);
}

function checkFormValid() {
  const invalidFeedback = document.querySelector('.invalid-feedback');
  if (!invalidFeedback) return true;
}
