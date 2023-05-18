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

// const btn = document.querySelector('button');
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

let localStorage = window.localStorage;
let offCanvas = document.querySelector('.offcanvas');
let cartElement = document.querySelector('.cart-items');
let cartPrice = document.querySelector('.cart-total-price');
let order = document.querySelector('#order');
let orderSubmit = document.querySelector('.order-button');
let customerData = JSON.parse(customer);
let productData = JSON.parse(products);

displayMessage();
if (typeof(Storage) != 'undefined') {
    if (!localStorage[customerData._id]) {
        localStorage[customerData._id] = JSON.stringify([]);
    }
} else {
    alert('Your browser does not support web storage');
}

let cart = JSON.parse(localStorage[customerData._id]);
displayCart();

function addToCart(item) {
    let productID = JSON.parse(item)._id;
    if (!cart.includes(productID)) cart.push(productID);

    localStorage[customerData._id] = JSON.stringify(cart);
    displayCart();
};

function removeFromCart(productID) {
    cart.includes(productID) && cart.splice(cart.indexOf(productID), cart.indexOf(productID) + 1); // Remove product from cart
    localStorage[customerData._id] = JSON.stringify(cart);
    console.log(localStorage[customerData._id]);
    displayCart();
};

function displayCart() {
    cartPrice.innerHTML = 0;

    if (cart.length == 0) {
        cartElement.innerHTML = `
        Your cart is empty
        `;
        
    } else {
        cartElement.innerHTML = cart.map(productID => {
            let product = getProduct(productID);
            cartPrice.innerHTML = Number(cartPrice.innerHTML) + product.price;
            return `
            <div class="cart-item">
            <img class="cart-item-img" src="${product.imgSrc}" alt="product image" />
            <div class="cart-item-detail">
            <h6 class="cart-item-name">${product.name}</h6>
            <div class="cart-item-price-and-qty">
            <span class="cart-item-qty">1</span>
            <span>x</span>
            <span class="cart-item-price">${product.price}</span>
            </div>
            </div>
            <div class="cart-delete material-symbols-outlined" onclick="removeFromCart('${product._id}')">delete</div>
            </div>`
        }).join('');
    }
    getOrder(cart, Number(cartPrice.innerHTML));
};

function getProduct(id) {
    return productData.find(product => product._id == id);
}

function getOrder(products, price) {
    if (products.length > 0) {
        order.value = JSON.stringify({
            products: products,
            price: price,
        });
    }
}

orderSubmit.addEventListener('click', (event) => {
    if (isValidOrder()) {
        console.log('true');
        orderSubmit.setAttribute('data-bs-toggle', '');
        orderSubmit.setAttribute('type', 'submit');
    }
});

function isValidOrder() {
    if (cart.length == 0) 
        return false;
    else {
        return true;
    }
}

function displayMessage() {
    if (document.querySelector('.order-success') || document.querySelector('.order-error')) {
        offCanvas.classList.add('show');
        localStorage[customerData._id] = JSON.stringify([]);
    }
}


