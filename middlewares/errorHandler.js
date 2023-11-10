const StatusCodes = require('../errors/StatusCodes');

module.exports = (err, req, res, next) => {
  const { statusCode = StatusCodes.SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === StatusCodes.SERVER_ERROR ? 'Internal Error' : message,
  });
  next();
};
