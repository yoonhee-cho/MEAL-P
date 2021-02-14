const Sequelize = require('sequelize')
const db = require('../db')

const OrderedItem = db.define('orderedItems', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    },
    defaultValue: 1
  },
  subTotal: {
    type: Sequelize.INTEGER
  },
  isSelected: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = OrderedItem
