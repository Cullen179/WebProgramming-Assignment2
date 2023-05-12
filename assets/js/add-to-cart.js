// const btn = document.querySelector('button');
let localStorage = window.localStorage;
let cartElement = document.querySelector('.cart-items');
let cartPrice = document.querySelector('.cart-total-price');
let customerData = JSON.parse(customer);
let imgData = JSON.parse(img);
let productData = JSON.parse(products);

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
    console.log(cart.includes(productID));

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
            let {product, productIndex} = getProduct(productID);
            console.log(productIndex);
            cartPrice.innerHTML = Number(cartPrice.innerHTML) + product.price;
            return `
                <div class="cart-item">
                    <img class="cart-item-img" src="${imgData[productIndex]}" alt="product image" />
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
};

function getProduct(id) {
    let product, productIndex;
    productData.forEach((ele, index) => {
        if (ele._id == id) {
            product = ele;
            productIndex = index;
        }
    })
    return {product: product, productIndex: productIndex};
}




