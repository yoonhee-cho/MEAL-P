'use strict'

const db = require('../server/db')
const {
  User,
  Groceryitem,
  Order,
  OrderedItem,
  Recipe,
  Menu
} = require('../server/db/models')
const {itemsJson} = require('./data')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Yoon',
      lastName: 'Cho',
      email: 'yooncho@gmail.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Cody',
      lastName: 'Pug',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Sichu',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const orderedItems = await Promise.all([
    OrderedItem.create({
      quantity: 2,
      subTotal: 10,
      isSelected: false
    }),
    OrderedItem.create({
      quantity: 4,
      subTotal: 728,
      isSelected: false
    })
  ])

  const orders = await Promise.all([
    Order.create({
      isActive: true
    }),
    Order.create({
      isActive: true
    })
  ])

  const items = await Promise.all(
    itemsJson.map(item => Groceryitem.create(item))
  )

  const [user1, user2] = users
  const [order1, order2] = orders
  const [item1, item2] = items
  const [orderedItems1, orderedItems2] = orderedItems

  await user1.addOrders(order1)
  await user2.addOrders(order2)

  await orderedItems1.setGroceryitem(item1)
  await orderedItems2.setGroceryitem(item2)

  await orderedItems1.setOrder(order1)
  await orderedItems2.setOrder(order2)

  await Promise.all([
    Recipe.create({
      name: 'banana yogurt cake',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      category: 'baking'
    }),
    Recipe.create({
      name: 'double chocolate chip cookie',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      category: 'baking'
    })
  ])

  await Promise.all([
    Menu.create({
      name: 'avocado toast',
      category: 'breakfast'
    }),
    Menu.create({
      name: 'pork kimchi stew',
      category: 'lunch'
    })
  ])

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
