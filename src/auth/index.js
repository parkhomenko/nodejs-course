const passport = require('passport');
const passportJWT = require('passport-jwt');
const winston = require('winston');

const { User } = require('../db/models');

const { ExtractJwt, Strategy } = passportJWT;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
  secretOrKey: 'leaveHerJohnnyLeaveHer',
};

const strategy = new Strategy(jwtOptions, (jwtPayload, next) => {
  winston.info(jwtPayload);
  User.findById(jwtPayload.id).then((user) => {
    winston.info('found a user');
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  }).catch((error) => {
    winston.info('just an error');
    next(error, false);
  });
});

const initialize = () => {
  passport.use(strategy);
  return passport.initialize();
};

const authenticate = () => {
  winston.info('in passport authenticate');
  passport.authenticate('jwt', { session: false }, (req, res) => {
    winston.info('here we are');
    /* if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send('You are not authorized');
    } */
    winston.info(req);
    res.status(401).send('You are not authorized');
  });
};

module.exports = { jwtOptions, initialize, authenticate };
