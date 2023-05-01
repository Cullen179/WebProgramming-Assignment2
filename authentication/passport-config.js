const validatePassword = require('../utils/passwordUtils.js').validatePassword;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../server/model/UserModel.js');

// Passport look into request body and look for 2 fields "uname" and "pw"
// After that passport takes two fields and put it into verifyCallBack
// Passport calls verifyCallBack()
const customFields = {
  usernameField: 'username',
  passwordField: 'password',
};

// Verify callback is called with fields that passport pass into it "username", "password"
// Find user according to username and password
// Then call the doneVerificationCallback with appropriate parameters
const verifyCallback = (username, password, doneVerificationCallback) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) return doneVerificationCallback(null, false);

      const isValid = validatePassword(password, user.hash, user.salt);

      if (isValid) {
        return doneVerificationCallback(null, user);
      } else {
        return doneVerificationCallback(null, false);
      }
    })
    .catch((err) => {
      doneVerificationCallback(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

// When user is authenticated => This function insert "passport" field to session inside the database
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// If passport.user is exist => Grab user from database with userId => Attach it to the request object with req.user
passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

// When user go to a route that need authenticate, the passport first check for the session.passport.user !== null
// - If !== null if mean user is authenticated before => Call deserializeUser() to attach user to req object
// - If null then user need authenticated

// When user is authenticated (pass the validatePassword() function), a new "passport" field will be inserted to the session object
// This passport field will save reference to user id (UserModel)
// The next time user reload page, the cookie from browser send to sever, server look the cookie in the database => It see the passport => User is authenticated

// Once user is authenticated, the request object will have one more field name "user" that have all information of user (UserModel)

// passport.authenticate('local', {
//     failureRedirect: '',
//     successRedirect: '',
// });
// req.logout()
// req.isAuthenticated()
// req.isUnauthenticated()
