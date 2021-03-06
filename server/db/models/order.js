const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Order
