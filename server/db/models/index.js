const User = require('./user')
const Groceryitem = require('./groceryitem')
const Order = require('./order')
const OrderedItems = require('./orderedItems')

const Recipe = require('./recipe')
const Menu = require('./menu')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//order - ordered items
OrderedItems.belongsTo(Order)
Order.hasMany(OrderedItems)

//grocery item - ordered items
OrderedItems.belongsTo(Groceryitem)
Groceryitem.hasMany(OrderedItems)

// user - order
Order.belongsTo(User) // UserIdㄱㅏ Order 모델에 생김
User.hasMany(Order) // UserId가 Order에 생김

// user - recipe
Recipe.belongsTo(User)
User.hasMany(Recipe)

// user - menu
Menu.belongsTo(User)
User.hasMany(Menu)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Groceryitem,
  Order,
  OrderedItems,
  Recipe,
  Menu
}
