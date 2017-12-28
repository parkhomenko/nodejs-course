const express = require('express');
const Book = require('../db/models/Book');
const BookRate = require('../db/models/BookRate');

const Sequelize = require('sequelize');

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
 * /books/{bookId}:
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
router.get('/:bookId', (req, res) => {
  const { bookId } = req.params;
  Book.findById(bookId).then((book) => {
    res.send(book);
  });
});

module.exports = router;
