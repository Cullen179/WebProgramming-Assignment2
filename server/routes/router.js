const route = require('express').Router();
const customerRoute = require('./customer-router');
const shipperRoute = require('./shipper-router');
const vendorRoute = require('./vendor-router');
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

// Route can access before authentication
route.get('/login', siteService.showLogin);
route.post('/login', siteService.login);

route.get('/customer/register', customerController.showRegistration);
route.post('/customer/register', handleFileUploadMiddleware.single('picture'), customerController.createAccount);

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

// Logout
route.get('/logout', siteService.logout);

// Customer routes
route.use('/customer', customerRoute);

// Shipper routes
route.use('/vendor', vendorRoute);

// Vendor routes
route.use('/shipper', shipperRoute);

// Product routes
route.use('/product', productRoute);

// Handle 404 not found page
route.use((req, res, next) => {
  res.render('resource-not-found');
});

module.exports = route;
