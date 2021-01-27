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
    allowNull: false,
    get: function() {
      let pennies = this.getDataValue('price')
      return pennies / 100
    }
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
  //item supply stock // I guess I don't need this for my app
  // stock: {
  //   type: Sequelize.INTEGER,
  //   defaultValue: 1
  // }
})

module.exports = Groceryitem
