const route = require('express').Router();
const service = require('../service/render');
const controller = require('../controller/controller');
route.get('/', service.homeRoute);

// route.post('/api/shipper', controller.createShipper)

<<<<<<< Updated upstream
=======
// General routes
route.get('/', siteService.homeRoute);

route.get('/login', siteService.showLogin);
route.post('/login', require('../controller/LoginController').login);
route.get('/shipper', siteService.showShipper)

route.post('/login/loginintosystem', siteService.login);
route.get('/registration', siteService.showRegistration);
route.post('/registration/createaccount', siteService.createAccount);

// API
route.get('/api/shipper', require('../controller/ShipperController').getShipper);

>>>>>>> Stashed changes
module.exports = route;