const Sequelize = require('sequelize')
const db = require('../db')

const OrderedItem = db.define('orderedItems', {
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
  subTotal: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderedItem
