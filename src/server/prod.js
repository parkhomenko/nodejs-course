const express = require('express');
const path = require('path');
const open = require('open');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream');

const readme = require('../routes/readme');

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.static(path.join(__dirname, '../../static')));

app.use('/api', readme);

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

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});