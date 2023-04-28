const route = require('express').Router();
const service = require('../service/render');
const controller = require('../controller/controller');
route.get('/', service.homeRoute);

// route.post('/api/shipper', controller.createShipper)

module.exports = route;