const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const winston = require('winston');
const http = require('http');

const readme = require('../routes/readme');
const books = require('../routes/books');
const authors = require('../routes/authors');
const comments = require('../routes/comments');
const rates = require('../routes/rates');
const users = require('../routes/users');

const port = 5000;
const app = express();

const logDirectory = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory,
});

winston.configure({
  transports: [
    new (winston.transports.File)({ filename: path.join(__dirname, '../../logs/app.log') }),
  ],
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.static(path.join(__dirname, '../../static')));

app.use('/api', readme);
app.use('/books', books);
app.use('/authors', authors);
app.use('/comments', comments);
app.use('/rates', rates);
app.use('/users', users);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../static/index.html'));
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500)
    .json({
      status: 'error',
      message: err.message,
    });
});

const httpServer = http.createServer(app);
httpServer.listen(port);
winston.info('Server has been started in production mode...');
