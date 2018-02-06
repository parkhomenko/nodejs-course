const passport = require('passport');
const passportJWT = require('passport-jwt');
const winston = require('winston');

const { User, Role } = require('../db/models');

const { ExtractJwt, Strategy } = passportJWT;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'leaveHerJohnnyLeaveHer',
};

const strategy = new Strategy(jwtOptions, (jwtPayload, next) => {
  winston.info('in auth');
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

const requireRole = role => (req, resp, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    User.findAll({
      include: [{
        model: Role,
        through: {
          attributes: ['user_id', 'role_id'],
        },
        where: { name: role },
      }],
      where: { id: user.id },
    }).then((users) => {
      if (users.length === 0) {
        resp.status(403).json({ message: 'You are not allowed to use this resource' });
      }
      next();
    });
  })(req, resp, next);
};

module.exports = { jwtOptions, initialize, requireRole };
