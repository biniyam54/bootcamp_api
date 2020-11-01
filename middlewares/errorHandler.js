const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //log for dev
  console.log(err.stack.red);

  //mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //mongoose duplicate error
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  //validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: "false",
    error: error.message || "Server error",
  });
};

module.exports = errorHandler;
