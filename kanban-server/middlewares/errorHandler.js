module.exports = (err, req, res, next) => {
  let errorsMessage = [];
  let status;
  console.log(err);
  if (err.name === "SequelizeValidationError") {
    err.errors.forEach((el) => {
      errorsMessage.push(el.message);
      status = 400;
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    err.errors.forEach((el) => {
      errorsMessage.push(el.message);
      status = 400;
    });
  } else if (err.name === "Login") {
    errorsMessage.push(err.message);
    status = err.status;
  } else if (err.name === "Auth") {
    errorsMessage.push(err.message);
    status = err.status;
  } else if (err.name === "SequelizeDatabaseError") {
    errorsMessage.push("Internal server error");
    status = 500;
  }
  res.status(status || 500).json({ error: errorsMessage });
};
