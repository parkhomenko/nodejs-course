const express = require('express');
const path = require('path');
const { User, BookComment, Sequelize } = require('../db/models');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations with users
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     required:
 *       - name
 *       - email
 *       - password
 *       - dateofbirth
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       avatar:
 *         type: string
 *       dateofbirth:
 *         type: date
 */

/**
 * @swagger
 * /users/highest-comments/{limit}:
 *   get:
 *     description: Gets users with highest amount of comments
 *     tags:
 *       - Users
 *     parameters:
 *      - in: path
 *        name: limit
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric limit of how many users to fetch
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A json object with information about users
 */
router.get('/highest-comments/:limit', (req, res) => {
  const { limit } = req.params;

  User.findAll({
    include: [{
      model: BookComment,
      attributes: [],
      duplicating: false,
    }],
    attributes: ['id', 'name', [Sequelize.fn('count', Sequelize.col('book_comments.id')), 'comments_cnt']],
    group: ['users.id', 'users.name'],
    order: [
      [Sequelize.fn('count', Sequelize.col('book_comments.id')), 'DESC'],
    ],
    limit: parseInt(limit, 0),
  }).then((users) => {
    res.send(users);
  });
});

/**
 * @swagger
 * /users/avatar/{userId}:
 *   post:
 *     summary: Uploads an avatar for a specified user
 *     tags:
 *       - Users
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: avatar
 *         type: file
 *         required: true
 *         description: The user avatar to upload
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *     responses:
 *       201:
 *         description: Avatar uploaded
 */
router.post('/avatar/:userId', (req, res) => {
  const { userId } = req.params;

  if (!req.files) {
    return res.status(400).send('No files were uploaded');
  }

  return User.findById(userId, { attributes: ['id', 'name', 'avatar'] }).then((user) => {
    if (user === null) {
      return res.status(400).send('No book has been found');
    }

    const { avatar } = req.files;

    return user.update({ avatar: avatar.name }, { fields: ['avatar'] }).then(() => {
      avatar.mv(path.join(__dirname, '../../images/avatars', avatar.name), (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        return res.status(201).send('File uploaded!');
      });
    }).catch(error => res.status(500).send(error));
  });
});

module.exports = router;
