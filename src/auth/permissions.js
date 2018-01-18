const passport = require('../auth');
const winston = require('winston');

const requireRole = (role) => {
  winston.info('in require role');
  winston.info(role);
  return (req, res, next) => {
    passport.authenticate();
    winston.info('in callback function');
    next();
  };
};

module.exports = requireRole;
