const sequelize = require('../../data/setup');

const Sequelize = require('sequelize');

const User = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  avatar: Sequelize.STRING,
  dateofbirth: Sequelize.DATE,
});

module.exports = User;
