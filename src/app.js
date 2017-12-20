const express = require('express');
const path = require('path');
const open = require('open');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const swaggerJSDoc = require('swagger-jsdoc');

const readme = require('./routes/readme');

const port = 3000;
const app = express();

const logDirectory = path.join(__dirname, '../logs');
if (fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory,
});

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
  apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.static(path.join(__dirname, '../static')));

app.use('/api', readme);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log(swaggerSpec);
  res.send(swaggerSpec);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'));
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.code || 500)
      .json({
        status: 'error',
        message: err,
      });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500)
    .json({
      status: 'error',
      message: err.message,
    });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
