const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  photo: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://tso.tastefullysimple.com/_/media/images/recipe-default-image.png'
  },
  category: {
    type: Sequelize.ENUM(
      'beef',
      'pork',
      'chicken',
      'seafood',
      'vegetable',
      'baking',
      'drink'
    )
  }
})

module.exports = Recipe
