const Sequelize = require('sequelize')
const db = require('../db')

const Weeklyprice = db.define('weeklyprice', {
  category: {
    type: Sequelize.ENUM(
      'Trader Joes',
      'H Mart',
      'Whole Foods Market',
      'Total'
    ),
    allowNull: false
  },
  data: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Weeklyprice
