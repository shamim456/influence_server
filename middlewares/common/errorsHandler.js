const createError = require("http-errors");

//404 not found handler
const notFoundHandler = (req, res, next) => {
  next(createError(404, "Your requested content was not found!!"));
};

//default error handler
const mainErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err);
  next();
};

module.exports = {
  notFoundHandler,
  mainErrorHandler,
};
