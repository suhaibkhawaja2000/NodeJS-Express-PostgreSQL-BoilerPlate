'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_social_accounts extends Model {
    static associate(models) {
      user_social_accounts.belongsTo(models.User,{
        targetKey:"id",
        foreignKey:"role_id"
      })
    }
  }
  user_social_accounts.init({
    user_id: DataTypes.INTEGER,
    link: DataTypes.STRING,
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'user_social_accounts',
  });
  return user_social_accounts;
};