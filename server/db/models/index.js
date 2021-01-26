const User = require('./user')
const Groceryitem = require('./groceryitem')
const Recipe = require('./recipe')
const Menu = require('./menu')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// user - groceryItem
User.hasMany(Groceryitem)
Groceryitem.belongsTo(User)

// user - recipe
User.hasMany(Recipe)
Recipe.belongsTo(User)

// user - menu
User.hasMany(Menu)
Menu.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Groceryitem,
  Recipe,
  Menu
}
