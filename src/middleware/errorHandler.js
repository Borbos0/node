const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Requested resource not found'
  });
};

module.exports = { errorHandler, notFoundHandler };
