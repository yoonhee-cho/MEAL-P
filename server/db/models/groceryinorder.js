const Sequelize = require('sequelize')
const db = require('../db')

const GroceryInOder = db.define('grocery_in_order', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = GroceryInOder
