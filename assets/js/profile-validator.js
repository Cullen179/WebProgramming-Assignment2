const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

const submit = document.querySelector('#submit');
const businessName = document.querySelector('#businessname');
const businessAddress = document.querySelector('#businessaddress');

if (businessName) businessName.addEventListener('input', () => getError(businessName, isValid(businessName.value, 'Business Name')));
if (businessAddress) businessAddress.addEventListener('input', () => getError(businessAddress, isValid(businessAddress.value, 'Business Address')));

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