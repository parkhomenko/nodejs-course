const sequelize = require('../../data/setup');
const User = require('./User');

const Sequelize = require('sequelize');

const BookComment = sequelize.define('book_comments', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  comment: Sequelize.STRING,
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = BookComment;
