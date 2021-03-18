"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email must be filled",
          },
          isEmail: {
            args: true,
            msg: "Invalid format of email",
          },
        },
        unique: {
          args: true,
          msg: "Email has been used",
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: 6,
            msg: "Password must be more than 6 characters long",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user, opt) {
          user.password = hash(user.password);
        },
      },
    }
  );
  return User;
};
