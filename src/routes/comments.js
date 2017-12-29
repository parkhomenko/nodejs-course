const express = require('express');
const BookComment = require('../db/models/BookComment');

const router = express.Router();

/**
 * @swagger
 * /comments/{bookId}:
 *   get:
 *     description: Gets a comment for a book by ID
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
 *         description: A json object with comment for a particular book
 */
router.get('/:bookId', (req, res) => {
  const { bookId } = req.params;
  BookComment.findAll({
    where: {
      book_id: bookId,
    },
  }).then((book) => {
    res.send(book);
  });
});

module.exports = router;
