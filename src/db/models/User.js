const sequelize = require('../../data/setup');

const User = sequelize.define('user', {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: sequelize.STRING,
  email: sequelize.STRING,
  password: sequelize.STRING,
  avatar: sequelize.STRING,
  dateofbirth: sequelize.DATE,
});

module.exports = User;
