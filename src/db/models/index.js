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

const Author = sequelize.define('authors', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  dateofbirth: Sequelize.DATE,
});

const Book = sequelize.define('books', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: Sequelize.STRING,
  cover: Sequelize.STRING,
});

const BookRate = sequelize.define('book_rates', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  rate: Sequelize.INTEGER,
});

const BookComment = sequelize.define('book_comments', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  comment: Sequelize.STRING,
});

Author.hasMany(Book, { foreignKey: 'book_id', sourceKey: 'id' });
Book.belongsTo(Author, { foreignKey: 'author_id', as: 'authors' });
Book.hasMany(BookRate, { foreignKey: 'book_id', sourceKey: 'id' });
Book.hasMany(BookComment, { foreignKey: 'book_id', sourceKey: 'id' });
BookComment.belongsTo(Book, { foreignKey: 'book_id' });
BookComment.belongsTo(User, { foreignKey: 'user_id' });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.Author = Author;
db.Book = Book;
db.BookRate = BookRate;
db.BookComment = BookComment;

module.exports = db;
