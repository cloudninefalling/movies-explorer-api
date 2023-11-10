const StatusCodes = require('./StatusCodes');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

module.exports = ConflictError;
