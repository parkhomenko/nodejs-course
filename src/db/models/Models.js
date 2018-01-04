const Sequelize = require('sequelize');

const sequelize = new Sequelize('library', 'root', 'qwerty', {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql',

  define: {
    timestamps: false,
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const User = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  avatar: Sequelize.STRING,
  dateofbirth: Sequelize.DATE,
});

const Book = sequelize.define('books', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: Sequelize.STRING,
  cover: Sequelize.STRING,
});

const Author = sequelize.define('authors', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  dateofbirth: Sequelize.DATE,
});

const BookRate = sequelize.define('book_rates', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  rate: Sequelize.INTEGER,
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

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

Author.hasMany(Book, { foreignKey: 'book_id', sourceKey: 'id' });
Book.hasOne(Author);
Author.belongsTo(Book, { sourceKey: 'book_id' });
Book.hasMany(BookRate, { foreignKey: 'book_id', sourceKey: 'id' });
Book.hasMany(BookComment, { foreignKey: 'book_id', sourceKey: 'id' });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.Author = Author;
db.Book = Book;
db.BookRate = BookRate;
db.BookComment = BookComment;

module.exports = db;
