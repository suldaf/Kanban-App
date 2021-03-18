const { User } = require("../models");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const accessToken = req.headers.token;
    const currentUser = jwt.verify(accessToken, process.env.SECRET);
    User.findOne({ where: { email: currentUser.email } })
      .then((user) => {
        if (!user) {
          throw { message: "User not found", status: 404, name: "Auth" };
        }
        req.currentUser = currentUser;
        next();
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next({
      message: "Invalid token",
      status: 401,
      name: "Auth",
    });
  }
};

module.exports = { authenticate };
