const sequelize = require('../../data/setup');

const Author = sequelize.define('author', {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: sequelize.STRING,
  dateofbirth: sequelize.DATE,
});

module.exports = Author;
