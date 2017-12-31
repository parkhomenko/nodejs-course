const sequelize = require('../../data/setup');
const Author = require('./Author');
const BookRate = require('./BookRate');
const BookComment = require('./BookComment');

const Sequelize = require('sequelize');

const Book = sequelize.define('books', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: Sequelize.STRING,
  cover: Sequelize.STRING,
  author_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Author,
      key: 'id',
    },
  },
});

Book.hasMany(BookRate, { foreignKey: 'book_id', sourceKey: 'id' });
Book.hasMany(BookComment, { foreignKey: 'book_id', sourceKey: 'id' });

Author.belongsTo(Book, { foreignKey: 'author_id' });

module.exports = Book;
