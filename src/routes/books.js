const express = require('express');
const Book = require('../db/models/Book');
const BookRate = require('../db/models/BookRate');

const Sequelize = require('sequelize');

const router = express.Router();

/**
 * @swagger
 * /v1/books:
 *   get:
 *     description: Returns all the books with their rates
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A json array with books
 */
router.get('/v1/books', (req, res) => {
  Book.findAll({
    include: [{
      model: BookRate,
      attributes: [],
    }],
    attributes: ['book.id', 'book.title', [Sequelize.fn('avg', Sequelize.col('book_rates.rate')), 'average_rate']],
    group: ['book.id', 'book.title'],
  }).then((books) => {
    res.send(books);
  });
});

module.exports = router;
