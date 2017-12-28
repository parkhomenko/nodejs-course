const sequelize = require('../../data/setup');
const Book = require('./Book');
const User = require('./User');

const Sequelize = require('sequelize');

const BookRate = sequelize.define('book_rates', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  rate: Sequelize.INTEGER,
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

module.exports = BookRate;
