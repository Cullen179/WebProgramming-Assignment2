const { Hub } = require("../model/model");

const hubs = [
    new Hub({
        name: 'Hub 1',
        address: '123 street, ward 1, HCM city VN'
    }),
    new Hub({
        name: 'Hub 2',
        address: '234 street, ward 2, HCM city VN'
    }),
    new Hub({
        name: 'Hub 1',
        address: '345 street, ward 3, HCM city VN'
    })
]

/**
 * SiteService acts like site controller, includes
 * all function handling general routes
 */
class SiteService {
    // [GET] "/"
    homeRoute(req, res, next) {
        res.render('index');
    }

    // [GET] "/login"
    showLogin(req, res, next) {
        res.send('login page');
    }

    // [POST] "/login"
    login(req, res, next) {
        res.send('logged in');
    }

    // [GET] "/registration"
    showRegistration(req, res, next) {
        res.send('registration page');
    }

    // [POST] "/registration"
    createAccount(req, res, next) {
        res.send('create accoutn');
    }
}

module.exports = new SiteService();

