const passport = require('passport');
const passportJWT = require('passport-jwt');

const { User } = require('../db/models');

const { ExtractJwt, Strategy } = passportJWT;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'leaveHerJohnnyLeaveHer',
};

const strategy = new Strategy(jwtOptions, (jwtPayload, next) => {
  User.findById(jwtPayload.id).then((user) => {
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

passport.use(strategy);

module.exports = { jwtOptions };
