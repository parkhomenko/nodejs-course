const sequelize = require('../../data/setup');

const Book = require('./Book');

const Sequelize = require('sequelize');

const Author = sequelize.define('authors', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  dateofbirth: Sequelize.DATE,
});

Author.hasMany(Book, { foreignKey: 'book_id', sourceKey: 'id' });

module.exports = Author;
