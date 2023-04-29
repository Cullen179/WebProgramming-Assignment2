const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const model = require('../model/model');

// function createShipper(username1, name1, hub1) {
//     const user = new model.User({
//         _id: new mongoose.Types.ObjectId(),
//         username: username1,
//         password: '123',
//         role: 'shipper'
//     })

//     user.save()
//         .then(() => {
//             const shipper = new model.Shipper({
//                 account: user._id,
//                 name: name1,
//                 picture: 'n',
//                 hub: hub1,
//             });
//             console.log('create account success')
//             shipper.save()
//                 .then(() => console.log('create shipper successfully'))
//                 .catch(err => console.log(err));
//         })
//         .catch(err => console.log(err));

// }

// function createCustomer(username1, name1, hub1) {
//     const user = new model.User({
//         _id: new mongoose.Types.ObjectId(),
//         username: username1,
//         password: '123',
//         role: 'customer'
//     })

//     user.save()
//         .then(() => {
//             const customer = new model.Customer({
//                 account: user._id,
//                 picture: 'n',
//                 name: name1,
//                 address: 'vn',
//             });
//             console.log('create account success')
//             customer.save()
//                 .then(() => console.log('create customer successfully'))
//                 .catch(err => console.log(err));
//         })
//         .catch(err => console.log(err));

// }

// createCustomer('customer_user2', 'Minh')

// createShipper('shipper_user2', 'Linh', 'hub1');

