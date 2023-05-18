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

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

const submit = document.querySelector('#submit');
const businessName = document.querySelector('#businessname');
const businessAddress = document.querySelector('#businessaddress');
const customerName = document.querySelector('#customerName');
const customerAddress = document.querySelector('#customerAddress');

if (businessName) businessName.addEventListener('input', () => getError(businessName, isValid(businessName.value, 'Business Name')));
if (businessAddress) businessAddress.addEventListener('input', () => getError(businessAddress, isValid(businessAddress.value, 'Business Address')));
if (customerName) customerName.addEventListener('input', () => getError(customerName, isValid(customerName.value, 'Name')));
if (customerAddress) customerAddress.addEventListener('input', () => getError(customerAddress, isValid(customerAddress.value, 'Address')));


submit.addEventListener('click', (e) => {
  if (!document.querySelector('.invalid-feedback')) {
    updatePopoverContent(''); // Remove popover content
    submit.setAttribute('type', 'submit');
  } else {
    updatePopoverContent('Please update the field correctly.')
  }
});

function isValid(value, field) {
  // At least 5 characters
  if (!(value.length >= 5)) {
    return field + ' must be at least 5 characters';
  }
  return;
}

function getError(input, error) {
  resetError(input);
  if (!error) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  } else {
    const errorElement = document.createElement('div');
    errorElement.setAttribute('error-data', 'true');
    errorElement.classList.add('invalid-feedback');
    errorElement.innerHTML = error;
    input.classList.add('is-invalid');
    input.parentElement.appendChild(errorElement);
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