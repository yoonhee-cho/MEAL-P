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
  where: {
    type: Sequelize.ENUM('Trader Joes', 'H Mart', 'Whole Foods Market'),
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = Groceryitem
