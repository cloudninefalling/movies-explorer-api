const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookies = require('cookie-parser');
const { errors } = require('celebrate');
// eslint-disable-next-line no-unused-expressions
require('dotenv').config;

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const indexRouter = require('./routes/index');
const limiter = require('./middlewares/rateLimiter');

// prettier-ignore
const {
  PORT = 3001,
  DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const app = express();
app.use(helmet());
app.use(limiter);
app.use(cookies());
mongoose.connect(DB);
app.use(express.json());
app.use(requestLogger);

app.use(indexRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`server is live on port ${PORT}`));
