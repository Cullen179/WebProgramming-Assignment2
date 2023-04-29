// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     username: {
//         type: String,
//         require: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         require: true
//     },
//     role: {
//         type: String,
//         require: true,
//         enum: ['customer', 'vendor', 'shipper']
//     }
// });

// const vendorSchema = new mongoose.Schema({
//     account: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     },
//     picture: {
//         data: Buffer,
//         contentType: String
//     },
//     businessName: {
//         type: String,
//         require: true,
//         unique: true
//     },
//     businessAddress: {
//         type: String,
//         require: true,
//         unique: true
//     }
// });

// const customerSchema = new mongoose.Schema({
//     account: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     },
//     picture: {
//         // data: Buffer,
//         // contentType: String
//         type: String
//     },
//     name: {
//         type: String,
//         require: true
//     },
//     address: {
//         type: String,
//         require: true
//     }
// });

// const shipperSchema = new mongoose.Schema({
//     account: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     },
//     name: {
//         type: String,
//         require: true,
//     },
//     picture: {
//         // data: Buffer,
//         // contentType: String
//         type: String,
//     },
//     hub: {
//         type: String,
//         require: true,
//         enum: ['hub1', 'hub2', 'hub3'],
//     }
// });

// const hubSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         require: true,
//         unique: true
//     },
//     address: {
//         type: String,
//         require: true,
//         unique: true
//     }
// })

// const User = mongoose.model('User', userSchema);
// const Shipper = mongoose.model('Shipper', shipperSchema);
// const Vendor = mongoose.model('Vendor', vendorSchema);
// const Customer = mongoose.model('Customer', customerSchema);
// const Hub = mongoose.model('Hub', hubSchema);

// module.exports = {User, Shipper, Vendor, Customer, Hub};