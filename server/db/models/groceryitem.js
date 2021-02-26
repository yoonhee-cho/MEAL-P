const Sequelize = require('sequelize')
const db = require('../db')

const Groceryitem = db.define('groceryitem', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // price will be pennies and converted on the frontend
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM(
      'fruit',
      'vegetable',
      'grain',
      'diary',
      'seafood',
      'meat',
      'spice/sauce',
      'snack',
      'etc'
    ),
    allowNull: false
  }
})

module.exports = Groceryitem
