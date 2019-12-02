const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../mongoose");

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        console.log(password);
        return done(null, false, {
          errors: { "email or password": "is invalid" }
        });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    err ? done(err) : done(null, user);
  });
});

module.exports = passport;
