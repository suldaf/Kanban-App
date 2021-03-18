const { Task } = require("../models");
const authorize = (req, res, next) => {
  const taskId = +req.params.id;
  const userId = req.currentUser.id;
  Task.findByPk(taskId)
    .then((task) => {
      if (!task) {
        throw { message: "Task not found", status: 404, name: "Auth" };
      }
      if (task.UserId === userId) {
        next();
      } else {
        throw { message: "Not authorized", status: 401, name: "Auth" };
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { authorize };
