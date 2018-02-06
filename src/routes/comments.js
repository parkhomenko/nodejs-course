const express = require('express');
const { BookComment } = require('../db/models');
const { requireRole } = require('../auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Book Comments
 *     description: Operations with book comments
 */

/**
 * @swagger
 * definitions:
 *   Comment:
 *     required:
 *       - comment
 *       - bookId
 *       - userId
 *     properties:
 *       comment:
 *         type: string
 *       bookId:
 *         type: integer
 *       userId:
 *         type: integer
 */

/**
 * @swagger
 * /comments/{bookId}:
 *   get:
 *     description: Gets a comment for a book by ID
 *     tags:
 *       - Book Comments
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
router.get('/:bookId', requireRole('default'), (req, res) => {
  const { bookId } = req.params;
  BookComment.findAll({
    where: {
      book_id: bookId,
    },
  }).then((comment) => {
    res.send(comment);
  });
});

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Add a new comment for the chosen book
 *     tags:
 *       - Book Comments
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: comment
 *         description: The comment to create
 *         schema:
 *           $ref: '#/definitions/Comment'
 *     responses:
 *       201:
 *         description: Comment created
 */
router.post('/', requireRole('default'), (req, res) => {
  const { comment, bookId, userId } = req.body;
  BookComment.create({
    comment,
    book_id: bookId,
    user_id: userId,
  }).then(() => {
    res.status(201).send('Comment created successfully');
  });
});

/**
 * @swagger
 * /comments:
 *   put:
 *     summary: Edits a comment
 *     tags:
 *       - Book Comments
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: comment
 *         description: The comment to edit
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             comment:
 *               type: string
 *     responses:
 *       201:
 *         description: Comment created
 */
router.put('/', requireRole('default'), (req, res) => {
  const { id, comment } = req.body;
  BookComment.update(
    { comment },
    { where: { id } },
  ).then(() => {
    res.status(201).send('Comment updated successfully');
  });
});

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Deletes a comment by ID
 *     tags:
 *       - Book Comments
 *     parameters:
 *      - in: path
 *        name: commentId
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the comment to delete
 *     responses:
 *       204:
 *         description: Comment deleted
 */
router.delete('/:commentId', requireRole('default'), (req, res) => {
  const { commentId } = req.params;
  BookComment.findById(commentId).then(comment => comment.destroy()).then(() => {
    res.status(204).send('Comment deleted successfully');
  });
});

module.exports = router;
