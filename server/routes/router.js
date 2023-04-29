const route = require('express').Router();
const siteService = require('../service/render');
const controller = require('../controller/controller');
const customerController = require('../controller/CustomerController');

// Customer routes
route.get('/customer', customerController.getCustomer);

// Shipper routes
// route.post('/api/shipper', controller.createShipper)

// General routes
route.get('/', siteService.homeRoute);
route.get('/login', siteService.login);
route.get('/registration', siteService.registration);

module.exports = route;