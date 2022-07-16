const globalErrorHandler = (err, req, res, next) => {
    //5xx error server fail
    //4xx error user fail
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  };
  
  module.exports = { globalErrorHandler }