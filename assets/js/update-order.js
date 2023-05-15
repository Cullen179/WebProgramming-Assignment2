// Query Element
const submit = document.querySelectorAll('[type="submit"]');
const orderAction = document.querySelector('#orderAction');

// Add event listener to each submit button
submit.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.value = 'delivered') {
        orderAction.value = 'delivered';
      }  else if (btn.value = 'canceled') {
        orderAction.value = 'canceled';
      }
    })
})
