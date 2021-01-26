'use strict'

const db = require('../server/db')
const {User, Groceryitem, Recipe, Menu} = require('../server/db/models')

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

  const groceryitems = await Promise.all([
    Groceryitem.create({
      name: 'egg',
      price: 399,
      category: 'diary'
    }),
    Groceryitem.create({
      name: 'onion',
      price: 79,
      category: 'vegetable'
    }),
    Groceryitem.create({
      name: 'potato',
      price: 69,
      category: 'vegetable'
    }),
    Groceryitem.create({
      name: 'avocado',
      price: 129,
      category: 'vegetable'
    }),
    Groceryitem.create({
      name: 'garlic',
      price: 49,
      category: 'vegetable'
    }),
    Groceryitem.create({
      name: 'arugula',
      price: 249,
      category: 'vegetable'
    }),
    Groceryitem.create({
      name: 'cucumber',
      price: 199,
      category: 'vegetable'
    }),
    Groceryitem.create({
      name: 'mushroom',
      price: 229,
      category: 'vegetable'
    }),
    Groceryitem.create({
      name: 'broccoli',
      price: 349,
      category: 'vegetable'
    }),
    Groceryitem.create({
      name: 'tomato',
      price: 269,
      category: 'vegetable'
    }),
    Groceryitem.create({
      name: 'zucchini',
      price: 79,
      category: 'vegetable'
    }),
    Groceryitem.create({
      name: 'corn',
      price: 39,
      category: 'vegetable'
    }),
    Groceryitem.create({
      name: 'lime',
      price: 29,
      category: 'fruit'
    }),
    Groceryitem.create({
      name: 'blackberry',
      price: 599,
      category: 'fruit'
    }),
    Groceryitem.create({
      name: 'apple',
      price: 69,
      category: 'fruit'
    }),
    Groceryitem.create({
      name: 'salmon',
      price: 969,
      category: 'seafood'
    }),
    Groceryitem.create({
      name: 'chicken',
      price: 9,
      category: 'meat'
    }),
    Groceryitem.create({
      name: 'sourdough bread',
      price: 299,
      category: 'grain'
    })
  ])

  const recipes = await Promise.all([
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

  const menus = await Promise.all([
    Menu.create({
      name: 'avocado toast',
      category: 'breakfast'
    }),
    Menu.create({
      name: 'pork kimchi stew',
      category: 'lunch'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${groceryitems.length} groceryitems`)
  console.log(`seeded ${recipes.length} groceryitemsInOrders`)
  console.log(`seeded ${menus.length} orders`)

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
