const express = require('express');
const { BookRate } = require('../db/models');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Book Rates
 *     description: Operations with book rates
 */

/**
 * @swagger
 * definitions:
 *   Rate:
 *     required:
 *       - rate
 *       - bookId
 *       - userId
 *     properties:
 *       rate:
 *         type: integer
 *       bookId:
 *         type: integer
 *       userId:
 *         type: integer
 */

/**
 * @swagger
 * /rates:
 *   post:
 *     summary: Add a new rate for the chosen book
 *     tags:
 *       - Book Rates
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: rate
 *         description: The rate to create
 *         schema:
 *           $ref: '#/definitions/Rate'
 *     responses:
 *       201:
 *         description: Rate created
 */
router.post('/', (req, res) => {
  const { rate, bookId, userId } = req.body;
  BookRate.create({
    rate,
    book_id: bookId,
    user_id: userId,
  }).then(() => {
    res.status(201).send('Rate created successfully');
  });
});

/**
 * @swagger
 * /rates:
 *   put:
 *     summary: Edits a rate
 *     tags:
 *       - Book Rates
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: rate
 *         description: The rate to edit
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             rate:
 *               type: integer
 *     responses:
 *       201:
 *         description: Rate created
 */
router.put('/', (req, res) => {
  const { id, rate } = req.body;
  BookRate.update(
    { rate },
    { where: { id } },
  ).then(() => {
    res.status(201).send('Rate updated successfully');
  });
});

module.exports = router;
