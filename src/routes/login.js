const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const { jwtOptions } = require('../auth');

const router = express.Router();

router.post('/', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(301).json({ message: 'there is no username or password in request' });
  }

  const { email, password } = req.body;

  User.findAll({
    where: {
      email,
      password,
    },
  }).then((users) => {
    if (!users || users.length === 0) {
      res.status(401).json({ message: 'user name or password is not correct' });
    }
    const user = users[0];
    const payload = { id: user.id };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ message: 'ok', token });
  });
});

module.exports = router;
