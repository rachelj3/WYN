const { Sequelize } = require('sequelize');


const user_db = new Sequelize({
    dialect: 'sqlite',
    storage: './database/users.sqlite'
})

const post_db = new Sequelize({
    dialect: 'sqlite',
    storage: './database/wyndb.sqlite'
})

module.exports = { user_db, post_db };