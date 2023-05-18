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
const customerRoute = require('./customer-router');
const shipperRoute = require('./shipper-router');
const productRoute = require('./product-router');

const siteService = require('../service/render');
const shipperController = require('../controller/ShipperController');
const customerController = require('../controller/CustomerController');
const vendorController = require('../controller/VendorController');
const HubController = require('../controller/HubController');

const attachAttributesToCurrentUserMiddleWare = require('../middleware/attachAttributesToCurrentUser');
const {
  handleFileUploadMiddleware,
} = require('../middleware/handleFileUpload');
const ShipperController = require('../controller/ShipperController');

// Route can access before authentication
route.get('/login', siteService.showLogin);
route.post('/login', siteService.login);

route.get('/customer/register', customerController.showRegistration);
route.post('/customer/register', handleFileUploadMiddleware.single('picture'), customerController.createAccount);
route.post('/', customerController.createOrder);

route.get('/vendor/register', vendorController.showRegistration);
route.post('/vendor/register', handleFileUploadMiddleware.single('picture'), vendorController.createAccount);

route.get('/shipper/register', shipperController.showRegistration);
route.post('/shipper/register', handleFileUploadMiddleware.single('picture'), shipperController.createAccount);

route.get('/hub/:_id', HubController.getHub);
route.get('/hub/hub-listing', HubController.getHubListing);
route.post('/hub/hub-listing', HubController.creatHub);

/**
 * ---------------- Authentication before access all other routes ----------------
 * */
route.use((req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }

  next();
});

// Home route
route.use(attachAttributesToCurrentUserMiddleWare);
route.get('/', siteService.homeRoute);
route.get('/search', siteService.searchResult);
route.put('/', shipperController.updateOrderStatus);
route.get('/profile', siteService.showProfile);
route.get('/profile/edit', siteService.showEditProfile);
route.put('/profile/edit', handleFileUploadMiddleware.single('picture'), siteService.editProfile);

// Logout
route.get('/logout', siteService.logout);

// Customer routes
route.use('/customer', customerRoute);

// Vendor routes
route.use('/shipper', shipperRoute);

// Product routes
route.use('/product', productRoute);

// About us routes 
route.get('/about-us', siteService.showAboutUs)

// Privacy routes
route.get('/privacy', siteService.showPrivacy)

// Handle 404 not found page
route.use((req, res, next) => {
  res.render('resource-not-found');
  return;
});


module.exports = route;
