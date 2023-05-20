'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.user_social_accounts, {
        targetKey: "user_id",
        foreignKey: "user_id"
      });
      User.hasOne(models.role, {
        targetKey: "user_id",
        foreignKey: "user_id"
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        const hashedPassword = crypto.createHash("sha256").update(user.password).digest("base64")
        user.setDataValue('password', hashedPassword)
      },
      beforeUpdate: (user) => {
        const hashedPassword = crypto.createHash("sha256").update(user.password).digest("base64")
        user.setDataValue('password', hashedPassword)
      }
    }
  });
  return User;
};


