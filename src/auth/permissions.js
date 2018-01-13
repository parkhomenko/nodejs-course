const passport = require('passport');

const requireRole = () => {
  passport.authenticate('jwt', { session: false }, (req, res) => {
    res.send({ message: 'an error' });
  });
};

module.exports = requireRole;
