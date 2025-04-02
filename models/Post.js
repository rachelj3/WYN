const { DataTypes, Model } = require('sequelize')
const { post_db } = require('../db')

class Post extends Model {}

Post.init(
  {
    // Model attributes are defined here
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postingUser: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    // Other model options go here
    sequelize: post_db, // We need to pass the connection instance
    modelName: 'Post', // We need to choose the model name
  },
);

module.exports = Post