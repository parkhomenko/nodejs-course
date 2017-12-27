const sequelize = require('../../data/setup');
const Book = require('./Book');
const User = require('./User');

const BookRate = sequelize.define('book_rates', {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  rate: sequelize.INTEGER,
  book_id: {
    type: sequelize.INTEGER,
    references: {
      model: Book,
      key: 'id',
    },
  },
  user_id: {
    type: sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = BookRate;
