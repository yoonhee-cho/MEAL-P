const Sequelize = require('sequelize')
const db = require('../db')

const Menu = db.define('menu', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM('breakfast', 'lunch', 'dinner', 'snack')
  }
})

module.exports = Menu
