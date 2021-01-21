'use strict'

const db = require('../server/db')
const {
  User,
  Note,
  Groceryitem,
  GroceryInOrder,
  Weeklyprice,
  Order
} = require('../server/db/models')
const GroceryInOder = require('../server/db/models/groceryinorder')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Yoon',
      lastName: 'Cho',
      email: 'yooncho@gmail.com',
      password: '123'
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

  const weeklyprices = await Promise.all([
    Weeklyprice.create({
      category: 'Trader Joes',
      data: 73.62,
      createdAt: '2020-09-07 23:20:30.847-05',
      userId: 1
    }),
    Weeklyprice.create({
      category: 'Trader Joes',
      data: 65.66,
      createdAt: '2020-09-12 23:20:30.847-05',
      userId: 1
    }),
    Weeklyprice.create({
      category: 'H Mart',
      data: 148.29,
      createdAt: '2020-09-14 23:20:30.847-05',
      userId: 1
    }),
    Weeklyprice.create({
      category: 'H Mart',
      data: 159.9,
      createdAt: '2020-09-16 23:20:30.847-05',
      userId: 1
    }),
    Weeklyprice.create({
      category: 'Trader Joes',
      data: 44.8,
      createdAt: '2020-09-17 23:20:30.847-05',
      userId: 1
    }),
    Weeklyprice.create({
      category: 'H Mart',
      data: 32.69,
      createdAt: '2020-09-17 23:20:30.847-05',
      userId: 1
    }),
    Weeklyprice.create({
      category: 'Trader Joes',
      data: 34.84,
      createdAt: '2020-09-22 23:20:30.847-05',
      userId: 1
    }),
    Weeklyprice.create({
      category: 'Trader Joes',
      data: 34.61,
      createdAt: '2020-09-24 23:20:30.847-05',
      userId: 1
    }),
    Weeklyprice.create({
      category: 'H Mart',
      data: 45.4,
      createdAt: '2020-09-24 23:20:30.847-05',
      userId: 1
    }),
    Weeklyprice.create({
      category: 'Trader Joes',
      data: 36.49,
      createdAt: '2020-09-27 23:20:30.847-05',
      userId: 1
    }),
    Weeklyprice.create({
      category: 'Trader Joes',
      data: 66.22,
      createdAt: '2020-09-30 23:20:30.847-05',
      userId: 1
    })
  ])

  const groceryitems = await Promise.all([
    Groceryitem.create({
      name: 'egg',
      price: 399,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'onion',
      price: 79,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'potato',
      price: 69,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'avocado',
      price: 129,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'garlic',
      price: 49,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'arugula',
      price: 249,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'cucumber',
      price: 199,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'mushroom',
      price: 229,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'broccoli',
      price: 349,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'tomato',
      price: 269,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'zucchini',
      price: 79,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'corn',
      price: 39,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'lime',
      price: 29,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'blackberry',
      price: 599,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'apple',
      price: 69,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'salmon',
      price: 969,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'chicken',
      price: 9,
      where: 'Trader Joes'
    }),
    Groceryitem.create({
      name: 'sourdough bread',
      price: 299,
      where: 'Trader Joes'
    })
  ])

  const groceryInOrders = await Promise.all([
    GroceryInOrder.create({
      qty: 3,
      totalPrice: 123
    }),
    GroceryInOrder.create({
      qty: 2,
      totalPrice: 429
    })
  ])

  const orders = await Promise.all([
    Order.create({
      date: '2020-10-04 23:20:30.847-05',
      userId: 1
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${weeklyprices.length} weeklyprices`)
  console.log(`seeded ${groceryitems.length} groceryitems`)
  console.log(`seeded ${groceryInOrders.length} groceryitemsInOrders`)
  console.log(`seeded ${orders.length} orders`)

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
