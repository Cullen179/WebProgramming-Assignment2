const route = require('express').Router();
const customerRoute = require('./customer-router');
const shipperRoute = require('./shipper-router');
const vendorRoute = require('./vendor-router');

const siteService = require('../service/render');
const shipperController = require('../controller/ShipperController');
const customerController = require('../controller/CustomerController');
const vendorController = require('../controller/VendorController');

const attachAttributesToCurrentUserMiddelWare = require('../middleware/attachAttributesToCurrentUser');

// Route can access before authentication
route.get('/login', siteService.showLogin);
route.post('/login', siteService.login);
route.get('/customer/register', customerController.showRegistration);
route.post('/customer/register', customerController.createAccount);
route.get('/vendor/register', vendorController.showRegistration);
route.post('/vendor/register', vendorController.createAccount);
route.get('/shipper/register', shipperController.showRegistration);
route.post('/shipper/register', shipperController.createAccount);

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
route.use(attachAttributesToCurrentUserMiddelWare);
route.get('/', siteService.homeRoute);

// Logout
route.get('/logout', siteService.logout);

// Customer routes
route.use('/customer', customerRoute);

// Shipper routes
route.use('/vendor', vendorRoute);

// Vendor routes
route.use('/shipper', shipperRoute);

// Handle 404 not found page
route.use((req, res, next) => {
  res.render('resource-not-found');
});

module.exports = route;
