const { compare } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User, Task } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  // USER
  static register(req, res, next) {
    const { email, password } = req.body;
    User.create({ email, password })
      .then((user) => {
        res.status(201).json({
          message: "Success create a user",
          id: user.id,
          email: user.email,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          throw {
            message: "Wrong email or password",
            status: 400,
            name: "Login",
          };
        }
        const compared = compare(password, user.password);

        if (!compared) {
          throw {
            message: "Wrong email or password",
            status: 400,
            name: "Login",
          };
        }
        const token = generateToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({
          token,
          email: user.email,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE);
    let email;
    let status;
    client
      .verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE,
      })
      .then((ticket) => {
        const paylod = ticket.getPayload();
        email = paylod.email;
        return User.findOne({ where: { email } });
      })
      .then((user) => {
        if (user) {
          status = 200;
          return user;
        } else {
          status = 201;
          return User.create({
            email,
            password: process.env.PASS,
          });
        }
      })
      .then((registered) => {
        const token = generateToken({
          id: registered.id,
          email: registered.email,
        });
        res.status(status).json({ token, email: registered.email });
      })
      .catch((err) => {
        next(err);
      });
  }

  // TASKS
  static getTasks(req, res, next) {
    const id = req.currentUser.id;
    Task.findAll({ include: [User] })
      .then((tasks) => {
        const output = [];
        tasks.forEach((el) => {
          output.push({
            id: el.id,
            title: el.title,
            description: el.description,
            category: el.category,
            user: el.User.email,
          });
        });
        res.status(200).json(output);
      })
      .catch((err) => {
        next(err);
      });
  }
  static addTask(req, res, next) {
    const id = req.currentUser.id;
    const { title, category, description } = req.body;
    Task.create({ title, category, description, UserId: id })
      .then((task) => {
        res.status(201).json({
          task: {
            id: task.id,
            title: task.title,
            category: task.category,
            description: task.description,
          },
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  // WITH AUTHORIZE
  static getDataById(req, res, next) {
    const taskId = +req.params.id;
    Task.findByPk(taskId)
      .then((task) => {
        res.status(200).json(task);
      })
      .catch((err) => [next(err)]);
  }
  static update(req, res, next) {
    const taskId = +req.params.id;
    const newTitle = req.body.title;
    const newCategory = req.body.category;
    const newDescription = req.body.description;
    Task.update(
      { title: newTitle, category: newCategory, description: newDescription },
      { where: { id: taskId }, returning: true }
    )
      .then((task) => {
        const output = {
          id: task[1][0].id,
          title: task[1][0].title,
          category: task[1][0].category,
          description: task[1][0].description,
        };
        res.status(200).json({ task: output });
      })
      .catch((err) => {
        next(err);
      });
  }
  static updateCategory(req, res, next) {
    const taskId = +req.params.id;
    const newCategory = req.body.category;
    Task.update(
      { category: newCategory },
      { where: { id: taskId }, returning: true }
    )
      .then((task) => {
        res.status(200).json({ task: task[1][0] });
      })
      .catch((err) => {
        next(err);
      });
  }
  static delete(req, res, next) {
    const taskId = +req.params.id;
    Task.destroy({ where: { id: taskId } })
      .then(() => {
        res.status(200).json({
          message: "Success delete a task",
        });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = Controller;
