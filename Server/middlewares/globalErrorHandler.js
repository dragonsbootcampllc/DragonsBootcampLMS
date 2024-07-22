const sendErrorForDev = (res, err) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (res, err) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(res, err);
  } else {
    if (err.name === "JsonWebTokenError") {
      err.status = "Invalid token, please login again...";
      err.statusCode = 401;
    }
    if (err.name === "TokenExpiredError") {
      err.status = "Expired token, please login again...";
      err.statusCode = 401;
    }
    sendErrorForProd(res, err);
  }
};

module.exports = globalErrorHandler;
