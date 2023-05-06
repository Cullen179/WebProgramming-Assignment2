// TODO: import hub model, handle route logic
const Hub = require('../model/HubModel');
const mongoose = require("mongoose");

class HubController {
  // [GET] "/hub/:id"
  getHub(req, res, next) {
    // Handle logic get hub by ID
    Hub.findById({ _id: req.params._id }).then((hub) => {
      res.render('hub/hub', {hub})
    })
  }

  getHubListing(req, res, next) {
    // get the hub list
    Hub.find().then((hubList) => {
      res.render('hub/hub-listing', {hubList})
    })
  }

  // [POST] "/hub"
  creatHub(req, res, next) {
    const name = req.body.name;
    const address = req.body.address;

    const hub = new Hub({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      address: address
    });

    hub.save().then(function(val) {
      console.log('New hub: [' + val.name + ' | ' + val.address + '] added.');
    })
    .catch(function(err) {
      console.log('Error code: ' + err.code + '.');
      next(err);
    });
  }
}

module.exports = new HubController();
