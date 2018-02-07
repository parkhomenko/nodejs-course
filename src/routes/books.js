const express = require('express');
const path = require('path');
const {
  Book, Author, BookRate, BookComment, Sequelize,
} = require('../db/models');
const { requireRole } = require('../auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: Operations with books
 */

/**
 * @swagger
 * definitions:
 *   Book:
 *     required:
 *       - title
 *       - author_id
 *     properties:
 *       title:
 *         type: string
 *       author_id:
 *         type: integer
 */

/**
 * @swagger
 * /books:
 *   get:
 *     description: Returns all the books with their rates
 *     tags:
 *       - Books
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A json array with books
 */
router.get('/', requireRole('default'), (req, res) => {
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
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags:
 *       - Books
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: book
 *         description: The book to create
 *         schema:
 *           $ref: '#/definitions/Book'
 *     responses:
 *       201:
 *         description: Book created
 */
router.post('/', requireRole('admin'), (req, res) => {
  const { title, authorId } = req.body;
  Book.create({
    title,
    author_id: authorId,
  }).then((book) => {
    res.status(201).send({ book_id: book.id });
  });
});

/**
 * @swagger
 * /books/cover/{bookId}:
 *   post:
 *     summary: Uploads a cover for a specified book
 *     tags:
 *       - Books
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: cover
 *         type: file
 *         required: true
 *         description: The book cover to upload
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the book
 *     responses:
 *       201:
 *         description: Cover uploaded
 */
router.post('/cover/:bookId', requireRole('admin'), (req, res) => {
  const { bookId } = req.params;

  if (!req.files) {
    return res.status(400).send('No files were uploaded');
  }

  return Book.findById(bookId, { attributes: ['id', 'title', 'cover'] }).then((book) => {
    if (book === null) {
      return res.status(400).send('No book has been found');
    }

    const { cover } = req.files;

    return book.update({ cover: cover.name }, { fields: ['cover'] }).then(() => {
      cover.mv(path.join(__dirname, '../../images/covers', cover.name), (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        return res.status(201).send('File uploaded!');
      });
    }).catch(error => res.status(500).send(error));
  });
});

/**
 * @swagger
 * /books:
 *   put:
 *     summary: Edits a book
 *     tags:
 *       - Books
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: book
 *         description: The book to edit
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             title:
 *               type: string
 *             author_id:
 *               type: integer
 *     responses:
 *       201:
 *         description: Book created
 */
router.put('/', requireRole('admin'), (req, res) => {
  const { id, title, authorId } = req.body;
  Book.update(
    { title, author_id: authorId },
    { where: { id } },
  ).then(() => {
    res.status(201).send('Book updated successfully');
  });
});

/**
 * @swagger
 * /books/{bookId}:
 *   delete:
 *     summary: Deletes a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *      - in: path
 *        name: bookId
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the book to delete
 *     responses:
 *       204:
 *         description: Book deleted
 */
router.delete('/:bookId', requireRole('admin'), (req, res) => {
  const { bookId } = req.params;
  Book.findById(bookId, { attributes: ['id'] }).then(book => book.destroy()).then(() => {
    res.status(204).send('Book deleted successfully');
  });
});

/**
 * @swagger
 * /books/most-commented/{limit}:
 *   get:
 *     description: Gets most commented books
 *     tags:
 *       - Books
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
router.get('/most-commented/:limit', requireRole('default'), (req, res) => {
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
 * /books/{bookId}:
 *   get:
 *     description: Gets a book by ID
 *     tags:
 *       - Books
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
router.get('/:bookId', requireRole('default'), (req, res) => {
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
 *     tags:
 *       - Books
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
router.get('/by-author/:author', requireRole('default'), (req, res) => {
  const { author } = req.params;
  Book.findAll({
    include: [{
      model: Author,
      as: 'authors',
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
 *     tags:
 *       - Books
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
router.get('/sorted/by-rate', requireRole('default'), (req, res) => {
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
