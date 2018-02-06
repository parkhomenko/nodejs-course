const express = require('express');
const path = require('path');
const open = require('open');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const winston = require('winston');
const swaggerJSDoc = require('swagger-jsdoc');

const auth = require('../auth');

const login = require('../routes/login');
const readme = require('../routes/readme');
const books = require('../routes/books');
const authors = require('../routes/authors');
const comments = require('../routes/comments');
const rates = require('../routes/rates');
const users = require('../routes/users');

const port = 3001;
const app = express();

const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3001',
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(auth.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, '../../static')));

app.use('/login', login);
app.use('/api', readme);
app.use('/books', books);
app.use('/authors', authors);
app.use('/comments', comments);
app.use('/rates', rates);
app.use('/users', users);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

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

app.listen(port, (err) => {
  if (err) {
    winston.log('error', err);
  } else {
    open(`http://localhost:${port}`);
  }
});
