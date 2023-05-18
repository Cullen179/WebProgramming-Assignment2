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
const { getImgSrc, getPictureObject } = require('../../utils/imgTransformation');

function attachProduct(products) {
  let productsArray = [];

  // Attach imgSrc property to each product
  products.forEach((productData) => {
    let product = {};
    product._id = productData._id;
    product.name = productData.name;
    product.price = productData.price;
    product.quantity = productData.quantity;
    product.description = productData.description;
    product.ownership = productData.ownership;

    if (productData.picture) {
      product.imgSrc = getImgSrc(productData.picture);
    }

    productsArray.push(product);
  });

  return productsArray;
}

module.exports = attachProduct;
