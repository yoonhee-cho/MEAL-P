const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Recipe
