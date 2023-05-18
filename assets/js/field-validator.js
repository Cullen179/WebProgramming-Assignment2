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

username.addEventListener('input', () => getError(username, isValidUserName));
password.addEventListener('input', () => {
  getError(password, isValidPassword);
});

if (name) name.addEventListener('input', () => getError(name, isValidName));
if (address) address.addEventListener('input', () => getError(address, isValidAddress));
if (businessName) businessName.addEventListener('input', () => getError(businessName, isValidBusinessName));
if (businessAddress) businessAddress.addEventListener('input', () => getError(businessAddress, isValidBusinessAddress));

submit.addEventListener('click', (e) => {
  if (!document.querySelector('.invalid-feedback')) {
    updatePopoverContent(''); // Remove popover content
    submit.setAttribute('type', 'submit');
  } else {
    updatePopoverContent('Please fill up the form correctly.')
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
}

function updatePopoverContent(content) {
  submit.setAttribute('data-bs-content', content);
  var popover = new bootstrap.Popover(submit);
  popover._getContent();
  popover.show();
}