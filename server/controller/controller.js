const user = require('../model/model');
const shipper = user.Shipper;

// exports.createShipper = (req, res) => {
//     const addShipper = new user.Shipper({
//         // account: {
//         //     username: req.body.username,
//         //     password: req.body.password,
//         // },
//         // name: req.body.name,
//         // picture: req.body.picture,
//         // hub: req.body.hub,

//         account: {
//             username: a,
//             password: b,
//         },
//         name: c,
//         picture: d,
//         hub: e,
//     });

//     // addShipper.save((err, doc) => {
//     //     (err) ? console.log(err) : console.log(doc);
//     // });

//     addShipper.save()
//         .then(() => console.log("create susccessfully"))
//         .catch((err) => console.log(err));
// }

const addShipper = new user.Shipper({
    // account: {
    //     username: req.body.username,
    //     password: req.body.password,
    // },
    // name: req.body.name,
    // picture: req.body.picture,
    // hub: req.body.hub,

    account: {
        username: '',
        password: 'c',
    },
    name: 'm',
    picture: 'n',
    hub: 'g',
});

let userAcc = new user.User({
    username: 'shipper',
})

// addShipper.save((err, doc) => {
//     (err) ? console.log(err) : console.log(doc);
// });

// addShipper.save()
//     .then(() => console.log("create susccessfully"))
//     .catch((err) => console.log(err));
