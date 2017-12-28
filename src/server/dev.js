const express = require('express');
const path = require('path');
const open = require('open');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const winston = require('winston');
const swaggerJSDoc = require('swagger-jsdoc');

const readme = require('../routes/readme');
const books = require('../routes/books');

const port = 3000;
const app = express();

const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/api',
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, '../../static')));

app.use('/api', readme);
app.use('/books', books);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../static/index.html'));
});

/*
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
*/

app.listen(port, (err) => {
  if (err) {
    winston.log('error', err);
  } else {
    open(`http://localhost:${port}`);
  }
});
