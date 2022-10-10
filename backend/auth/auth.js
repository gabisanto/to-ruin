const passport = require("passport");
const PassportLocal = require("passport-local").Strategy;
const User = require("../models/User");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new PassportLocal(function (username, password, done) {
    User.findOne({ where: { username } })
      .then((user) => {
        if (!user) {
          return done(null, false, {
            message: "User does not exist.",
          });
        }
        user.hash(password, user.salt).then((hash) => {
          if (hash !== user.password) {
            return done(null, false, {
              message: "Incorrect password.",
            });
          }

          return done(null, user);
        });
      })
      .catch(function (err) {
        console.log("Error: ", err);
        return done(null, false, {
          message: "Something went wrong.",
        });
      });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
