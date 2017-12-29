const sequelize = require('../../data/setup');
const Book = require('./Book');
const User = require('./User');

const Sequelize = require('sequelize');

const BookComment = sequelize.define('book_comments', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  comment: Sequelize.STRING,
  book_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Book,
      key: 'id',
    },
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

BookComment.hasOne(Book);

module.exports = BookComment;
