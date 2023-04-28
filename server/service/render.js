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
}


