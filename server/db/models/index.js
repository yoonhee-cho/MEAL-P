const User = require('./user')
const Note = require('./note')
const Groceryitem = require('./groceryitem')
const GroceryInOrder = require('./groceryinorder')
const Weeklyprice = require('./weeklyprice')
const Order = require('./order')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// user - note
User.hasMany(Note)
Note.belongsTo(User)

// order - groceryInOrder
Order.hasMany(GroceryInOrder)
GroceryInOrder.belongsTo(Order)

// groceryItem - groceryInOrder
Groceryitem.hasMany(GroceryInOrder)
GroceryInOrder.belongsTo(Groceryitem)

// user - order
User.hasMany(Order)
Order.belongsTo(User)

// user - weeklyprice
User.hasMany(Weeklyprice)
Weeklyprice.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Note,
  Groceryitem,
  GroceryInOrder,
  Weeklyprice,
  Order
}
