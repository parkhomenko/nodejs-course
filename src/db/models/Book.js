const sequelize = require('../../data/setup');
const Author = require('./Author');

const Book = sequelize.define('book', {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: sequelize.STRING,
  cover: sequelize.STRING,
  author_id: {
    type: sequelize.INTEGER,
    references: {
      model: Author,
      key: 'id',
    },
  },
});

module.exports = Book;
