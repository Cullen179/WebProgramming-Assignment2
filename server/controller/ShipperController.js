// TODO: import shipper model, handle route logic
const Shipper = require('../model/ShipperModel');

class ShipperController {
  // [GET] "/shipper/:id"
  getShipper(req, res, next) {
    // Handle logic get shipper by ID
    if(req?.query?.id) {
      Shipper.findByID(req.query.id)
        .then(data => {
          if (data) {
            res.send(data)
          } else {
            console.log("Can't not find user with id: "+ req.query.id)
          }
        })
        .catch(
          err => console.log(err)
        )
    } else {
      Shipper.find()
        .then(data => {
          if (data) res.send(data)
          else console.log("Can't not retrieve shipper information")
        })
    }
    
  }

  // [POST] "/shipper"
  createShipper(req, res, next) {
    // Handle logic create shipper
  }
}

module.exports = new ShipperController();
