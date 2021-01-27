const Sequelize = require('sequelize')
const db = require('../db')

const OrderedItems = db.define('orderedItems', {
  price: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    },
    defaultValue: 1
  },
  totalPrice: {
    // total price in pennies
    type: Sequelize.INTEGER,
    get: function() {
      return this.price * this.quantity
    }
  }
})

module.exports = OrderedItems
