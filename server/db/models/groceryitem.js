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
      'diary',
      'meat',
      'seafood',
      'spice',
      'sauce',
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
