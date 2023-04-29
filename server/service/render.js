const User = require('../model/UserModel');
const Hub = require("../model/HubModel");
const passport = require('passport');

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
        if (req.user.role === 'shipper') {
            res.render('shipper-home')
        }

        if (req.user.role === 'customer') {
            res.render('customer-home')
        }

        if (req.user.role === 'vendor') {
            res.render('vendor-home')
        }
    }

    // [GET] "/login"
    showLogin(req, res, next) {
        res.render('login');
    }

    // [POST] "/login"
    login(req, res, next) {
        passport.authenticate('local', {
            failureRedirect: '/login?error=1',
            successRedirect: '/',
        })(req, res, next);
    }

    // [GET] "/logout"
    logout(req, res, next) {
        req.logout(function (err) { // Delete session.passport.user
            if (err) {
                return next(err);
            }

            res.redirect('/');
        });
    }
}

module.exports = new SiteService();

