const express = require('express');
const {
  Book, Author, BookRate, Sequelize,
} = require('../db/models');
const { requireRole } = require('../auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Authors
 *     description: Operations with authors
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     description: Returns authors by their books' rate
 *     tags:
 *       - Authors
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A json array with authors
 */
router.get('/', requireRole('default'), (req, res) => {
  Book.findAll({
    include: [{
      model: BookRate,
      attributes: [],
    }, {
      model: Author,
      as: 'authors',
      attributes: [],
    }],
    attributes: ['authors.id', 'authors.name', [Sequelize.fn('avg', Sequelize.col('book_rates.rate')), 'average_rate']],
    group: ['authors.id', 'authors.name'],
    order: [
      [Sequelize.fn('avg', Sequelize.col('book_rates.rate')), 'DESC'],
    ],
    raw: true,
  }).then((authors) => {
    res.send(authors);
  });
});

module.exports = router;
