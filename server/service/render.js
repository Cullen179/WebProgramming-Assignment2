<<<<<<< Updated upstream
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

exports.homeRoute = (req, res) => {
    res.render('index');
=======
/**
 * SiteService acts like site controller, includes
 * all function handling general routes
 */

const axios = require('axios');

class SiteService {
    // [GET] "/"
    homeRoute(req, res, next) {
        res.redirect('/login');
    }

    // [GET] "/login"
    showLogin(req, res, next) {
        res.render('login');
    }

    showShipper(req, res) {
        axios.get('http://localhost:3000//api/shipper', { params: { id: req.query.id } })
            .then(data => {
                console.log('axios get information');
                res.render('shipper', { shipper: data })
            })
            .catch(err => {
                console.log(err)
            })
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
>>>>>>> Stashed changes
}


