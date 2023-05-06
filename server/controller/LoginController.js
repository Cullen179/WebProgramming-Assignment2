const User = require('../model/UserModel');
const Shipper = require('../model/ShipperModel');
const Customer = require('../model/CustomerModel');
const Vendor = require('../model/VendorModel');


exports.login = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const account = User.findOne({ 'username': username, 'password': password});
    const shipper = Shipper.findOne({ 'account': account._id });
    account.then((accountData) => {
        if (accountData) {
            console.log('log in success');
            console.log(getUserPage(accountData));
            // res.redirect(getUserPage(accountData));
        } else {
            console.log('log in fail')
        }
    })
        .catch(err => console.log(err));   
}

function getUserPage(account) {
    if (account.role === 'shipper') {
        Shipper.findOne({ 'account': account._id })
            .then((data) => {
                // console.log('/shipper?id=' + data._id)
                return '/shipper?id=' + data._id;
            })
            .catch(err => console.log(err));
    } else if (account.role === 'customer') {
        Customer.findOne({ 'account': account._id })
            .then((data) => {
                return '/customer?id=' + data._id;
            })
            .catch(err => console.log(err));
    } else if (account.role === 'vendor') {
        Vendor.findOne({ 'account': account._id })
            .then((data) => {
                return '/vendor?id=' + data._id;
            })
            .catch(err => console.log(err));
    } else {
        console.log('role not found');
        return "/"
    }
}