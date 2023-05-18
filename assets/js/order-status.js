const orderStatus = document.querySelectorAll('.status');

orderStatus.forEach((item) => {
    let status = item.innerHTML;
    if (status == 'active') {
        item.classList.add('btn-primary');
    } else if (status == 'canceled') {
        item.classList.add('btn-secondary');
    } else if (status == 'delivered') {
        item.classList.add('btn-success');
    } else {
        item.classList.add('btn-warning');
    }
})