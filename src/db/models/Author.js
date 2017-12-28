const sequelize = require('../../data/setup');

const Sequelize = require('sequelize');

const Author = sequelize.define('author', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  dateofbirth: Sequelize.DATE,
});

module.exports = Author;
