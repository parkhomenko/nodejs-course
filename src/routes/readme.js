const express = require('express');
const path = require('path');

const router = express.Router();

/**
 * @swagger
 * /v1/readme:
 *   get:
 *     description: Returns the text of the README.md file
 *     produces:
 *       - text/plain
 *     responses:
 *       200:
 *         description: A text of the README.md file
 */
router.get('/v1/readme', (req, res) => {
  res.sendFile(path.join(__dirname, '../../README.md'));
});

module.exports = router;
