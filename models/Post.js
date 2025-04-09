const { DataTypes, Model } = require('sequelize')
const { post_db } = require('../db')
const User = require('./User');


class Post extends Model {}

// Post.belongsTo(User, 'postingUserId');

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
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postingUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        refrences: {
          model: User,
          key: 'id'
        }
    }
  },
  {
    // Other model options go here
    sequelize: post_db, // We need to pass the connection instance
    modelName: 'Post', // We need to choose the model name
  },
);

module.exports = Post