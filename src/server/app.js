const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const winston = require('winston');
const swaggerJSDoc = require('swagger-jsdoc');
const http = require('http');
const fs = require('fs');
const rfs = require('rotating-file-stream');

const auth = require('../auth');

const login = require('../routes/login');
const readme = require('../routes/readme');
const books = require('../routes/books');
const authors = require('../routes/authors');
const comments = require('../routes/comments');
const rates = require('../routes/rates');
const users = require('../routes/users');

const isProduction = process.env.NODE_ENV === 'production';

const port = isProduction ? 3001 : 3000;
const app = express();

let swaggerSpec;
if (!isProduction) {
  const swaggerDefinition = {
    info: {
      title: 'Node Swagger API',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
  };

  const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '../routes/*.js')],
  };

  swaggerSpec = swaggerJSDoc(options);
}

let accessLogStream;
if (isProduction) {
  const logDirectory = path.join(__dirname, '../../logs');
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory,
  });

  winston.configure({
    transports: [
      new (winston.transports.File)({ filename: path.join(__dirname, '../../logs/app.log') }),
    ],
  });
}

app.use(auth.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
if (isProduction) {
  app.use(morgan('combined', { stream: accessLogStream }));
} else {
  app.use(morgan('combined'));
}

app.use(express.static(path.join(__dirname, '../../static')));

app.use('/login', login);
app.use('/api', readme);
app.use('/books', books);
app.use('/authors', authors);
app.use('/comments', comments);
app.use('/rates', rates);
app.use('/users', users);

if (!isProduction) {
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../static/index.html'));
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.code || 500)
    .json({
      status: 'error',
      message: err,
    });
});

/* app.listen(port, (err) => {
  if (err) {
    winston.log('error', err);
  } else {
    open(`http://localhost:${port}`);
  }
}); */

const httpServer = http.createServer(app);
httpServer.listen(port);
if (isProduction) {
  winston.info('Server has been started in production mode...');
} else {
  winston.info('Server has been started in development mode...');
}

module.exports = app;
