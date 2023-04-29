// TODO: import user model, handle route logic

class UserController {
  // [GET] "/user/:id"
  getUser(req, res, next) {
    // Handle logic get user by ID
  }

  // [GET] "/user/register"
  showRegistration(req, res, next) {
    res.render('user-register');
  }

  // [POST] "/user/register"
  creatUser(req, res, next) {
    // Handle logic create user
  }
}

module.exports = new UserController();
