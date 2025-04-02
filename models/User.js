const { DataTypes, Model } = require('sequelize')
const { user_db } = require('../db')

class User extends Model {

    static async findUser(username){
        try{ 
            const user = await User.findOne({where: {username: username}})
            return user ? user : null
        }catch(error){
            console.error("Error finding user:", error)
            return null
        }
    }
}

User.init(
{

    // Model attributes are defined here
    //required values
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        isEmail: true,
      },
      unique:{
        args: true,
        msg: 'Email address is already in use'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
            len: {
            min: 8,
            msg: 'Password must be greater than 8 characters'
            }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ccNum: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ccExDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ccCVV: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //optional values
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: true,
    }
  }, {
    // Other model options go here
    sequelize: user_db, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  });

module.exports = User