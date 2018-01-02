const sequelize = require('../../data/setup');
const BookRate = require('./BookRate');
const BookComment = require('./BookComment');

const Sequelize = require('sequelize');

const Book = sequelize.define('books', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: Sequelize.STRING,
  cover: Sequelize.STRING,
});

Book.hasMany(BookRate, { foreignKey: 'book_id', sourceKey: 'id' });
Book.hasMany(BookComment, { foreignKey: 'book_id', sourceKey: 'id' });

module.exports = Book;
