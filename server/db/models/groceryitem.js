const Sequelize = require('sequelize')
const db = require('../db')

const Groceryitem = db.define('groceryitem', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
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
      'etc'
    ),
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = Groceryitem
