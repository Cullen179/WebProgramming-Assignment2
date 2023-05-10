// const btn = document.querySelector('button');
let localStorage = window.localStorage;
let cartElement = document.querySelector('#cart');
let customerData = JSON.parse(customer);

console.log(customerData);


if (typeof(Storage) != 'undefined') {
    if (!localStorage[customerData._id]) {
        localStorage[customerData._id] = JSON.stringify([]);
    }
} else {
    alert('Your browser does not support web storage');
}

let cart = JSON.parse(localStorage[customerData._id]);

function addToCart(user) {
    let productID = JSON.parse(user)._id;
    if (!cart.includes(productID)) cart.push(productID);

    localStorage[customerData._id] = JSON.stringify(cart);
    displayCart();
};

function removeFromCart(user) {
    let productID = user._id;
    console.log(cart.includes(productID));

    cart.includes(productID) && cart.splice(cart.indexOf(productID), cart.indexOf(productID) + 1); // Remove product from cart
    localStorage[customerData._id] = JSON.stringify(cart);
    displayCart();
};

function displayCart() {
    if (cart.length == 0) {
        cartElement.innerHTML = 'Your cart is empty';
    } else {
        console.log('not empty')
        cartElement.innerHTML = cart.map(productID => {
            let product = JSON.parse(products).find(product => product._id == productID);
            return `
                <div class='product'>
                    <h1>${product.username}</h1>
                    <button onclick='removeFromCart(${JSON.stringify(product)})'>Remove</button>
                </div>`
        }).join('');
    }

}





