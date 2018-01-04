const express = require('express');
const {
  Book, Author, BookRate, BookComment, Sequelize,
} = require('../db/models/Models');

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     description: Returns all the books with their rates
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A json array with books
 */
router.get('/', (req, res) => {
  Book.findAll({
    include: [{
      model: BookRate,
      attributes: [],
    }],
    attributes: ['id', 'title', [Sequelize.fn('avg', Sequelize.col('book_rates.rate')), 'average_rate']],
    group: ['books.id', 'books.title'],
  }).then((books) => {
    res.send(books);
  });
});

/**
 * @swagger
 * /books/most-commented/{limit}:
 *   get:
 *     description: Gets most commented books
 *     parameters:
 *      - in: path
 *        name: limit
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric limit of how many books to fetch
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A json object with information about most commented books
 */
router.get('/most-commented/:limit', (req, res) => {
  const { limit } = req.params;
  Book.findAll({
    include: [{
      model: BookComment,
      attributes: [],
      duplicating: false,
    }],
    attributes: ['id', 'title', [Sequelize.fn('count', Sequelize.col('book_comments.id')), 'comments_cnt']],
    group: ['books.id', 'books.title'],
    order: [
      [Sequelize.fn('count', Sequelize.col('book_comments.id')), 'DESC'],
    ],
    limit: parseInt(limit, 0),
  }).then((books) => {
    res.send(books);
  });
});

/**
 * @swagger
 * /books/by-id/{bookId}:
 *   get:
 *     description: Gets a book by ID
 *     parameters:
 *      - in: path
 *        name: bookId
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the book to get
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A json object with information about a chosen book
 */
router.get('/by-id/:bookId', (req, res) => {
  const { bookId } = req.params;
  Book.findById(bookId, { attributes: ['id', 'title', 'cover'] }).then((book) => {
    res.send(book);
  });
});

/**
 * @swagger
 * /books/by-author/{author}:
 *   get:
 *     description: Gets books by author
 *     parameters:
 *      - in: path
 *        name: author
 *        schema:
 *          type: string
 *        required: true
 *        description: Author name
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A json array with information about books
 */
router.get('/by-author/:author', (req, res) => {
  const { author } = req.params;
  Book.findAll({
    include: [{
      model: Author,
      where: {
        name: author,
      },
      attributes: [],
    }],
    attributes: ['id', 'title'],
  }).then((books) => {
    res.send(books);
  });
});

/**
 * @swagger
 * /books/by-rate:
 *   get:
 *     description: Gets books by rate
 *     parameters:
 *      - in: query
 *        name: from
 *        schema:
 *          type: float
 *        required: true
 *        description: Starting rate
 *      - in: query
 *        name: to
 *        schema:
 *          type: float
 *        required: true
 *        description: Ending rate
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A json array with information about books by rate
 */
router.get('/by-rate', (req, res) => {
  const { from, to } = req.query;
  Book.findAll({
    include: [{
      model: BookRate,
      attributes: [],
    }],
    attributes: ['id', 'title', [Sequelize.fn('avg', Sequelize.col('book_rates.rate')), 'rate_avg']],
    group: ['books.id', 'books.title'],
    having: Sequelize.where(Sequelize.fn('avg', Sequelize.col('book_rates.rate')), {
      $gte: parseFloat(from),
      $lte: parseFloat(to),
    }),
    order: [
      Sequelize.fn('avg', Sequelize.col('book_rates.rate')),
    ],
  }).then((books) => {
    res.send(books);
  });
});

module.exports = router;
