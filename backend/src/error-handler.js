exports.catchErrors = fn => {
  return function catchErrors(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.notFound = (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
};

exports.developmentErrors = (err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.send({
    fullError: err,
    error: err.message,
  });
};

exports.productionErrors = (err, req, res, next) => {
  console.log("Send to error reporting service");
  res.status(err.status || 500);
  res.send({
    error: "An unexpected error has occured.",
  });
};
