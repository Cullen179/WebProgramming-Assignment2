const route = require('express').Router();
const service = require('../service/render');
route.get('/', service.homeRoute);

module.exports = route;