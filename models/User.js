const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    //required values
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ccNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ccExDate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ccCVV: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    //optional values
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    addressl1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    addressl2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    zipCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  },
);

module.exports = User