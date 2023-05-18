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

const route = require('express').Router();
const customerController = require('../controller/CustomerController');
const { handleFileUploadMiddleware } = require('../middleware/handleFileUpload');

/**
 * Authenticate role
 * Only user.role="customer" can access all the routes in this module
 */
route.use((req, res, next) => {
  if (req.user.role !== 'customer') {
    res.render('resource-access-unauthorized');
    return;
  } else {
    next();
  }
});

// Cutomer routes after authentication
route.get('/order', customerController.showOrder);

module.exports = route;
