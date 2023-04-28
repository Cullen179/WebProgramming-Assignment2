const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require:true
    }
});

const vendorSchema = new mongoose.Schema({
    account: {
        type: userSchema,
        require: true
    },
    picture: {
        data: Buffer,
        contentType: String
    },
    businessName: {
        type: String,
        require:true,
        unique: true
    },
    businessAddress: {
        type: String,
        require:true,
        unique: true
    }
});

const customerSchema = new mongoose.Schema({
    account: {
        type: userSchema,
        require: true
    },
    picture: {
        data: Buffer,
        contentType: String
    },
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require:true
    }
});

const shipperSchema = new mongoose.Schema({
    account: {
        type: userSchema,
        require: true
    },
    picture: {
        // data: Buffer,
        // contentType: String
        type: String,
    },
    hub: {
        type: String,
    }
});

const User = mongoose.model('User', userSchema);
const Shipper = mongoose.model('Shipper', shipperSchema);
const Vendor = mongoose.model('Vendor', vendorSchema);
const Customer = mongoose.model('Customer', customerSchema);

module.exports = {User, Shipper, Vendor, Customer};