const passport = require("passport");
const User = require("../models/user");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = () => {
  let opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = "this is dummy secret key";
//   opts.issuer = "backend.loginapp.com";
//   opts.audience = "loginapp.com";

//   console.log("pass");
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
    //   console.log(jwt_payload);
      User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
