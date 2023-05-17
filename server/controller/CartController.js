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
      };

      productsArray.push(product);
    });

    return productsArray;
}

module.exports = attachProduct;