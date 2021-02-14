const router = require('express').Router()
const {User, Groceryitem, Order, OrderedItem} = require('../db/models')
const isAdmin = require('../auth/isAdminMiddleware')
const isUser = require('../auth/userMiddleware')
module.exports = router

//GET api/users
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//GET api/users/:userId/cart
//[TODO] : add isUser middleware later
router.get('/:userId/cart', async (req, res, next) => {
  try {
    let userId = req.params.userId

    const orderIdFromOrders = await Order.findAll({
      where: {
        userId: userId,
        isActive: true
      },
      attributes: ['id']
    })

    if (orderIdFromOrders.length > 0) {
      const findItemsIdInCart = await OrderedItem.findAll({
        where: {
          orderId: orderIdFromOrders[0].id
        },
        attributes: ['groceryitemId']
      })

      // findItemsIdInCart = [{"groceryitemId": 2}]
      const getItems = async () => {
        return Promise.all(
          findItemsIdInCart.map(async item => {
            const itemId = item.groceryitemId
            const itemGetter = await Groceryitem.findOne({
              where: {
                id: itemId
              },

              include: [
                {
                  model: OrderedItem,
                  where: {
                    orderId: orderIdFromOrders[0].id
                  },
                  attributes: [
                    'groceryitemId',
                    'quantity',
                    'subTotal',
                    'isSelected'
                  ]
                }
              ]
            })
            return itemGetter
          })
        )
      }
      getItems().then(data => {
        res.json(data)
      })
    } else {
      res.json([])
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/completed', async (req, res, next) => {
  try {
    let userId = req.params.userId

    const completedOrders = await Order.findAll({
      where: {
        userId: userId,
        isActive: false
      }
    })

    await res.send(completedOrders)
  } catch (err) {
    next(err)
  }
})

// add item to user cart
//[TODO] : add isUser middleware later
router.post('/:userId/cart', async (req, res, next) => {
  try {
    let itemId = req.body.id
    let userId = req.params.userId

    let orderId = await Order.findOrCreate({
      where: {
        userId: userId,
        isActive: true
      },
      attributes: ['id']
    })

    let itemAlreadyInOrder = await OrderedItem.findOne({
      where: {
        groceryitemId: itemId,
        orderId: orderId[0].id
      }
    })

    if (itemAlreadyInOrder) {
      res.status(500).send('This item is already in your cart')
    } else {
      const newItemInCart = await OrderedItem.create({
        orderId: orderId[0].id,
        groceryitemId: itemId
      })

      newItemInCart.subTotal = req.body.price
      await newItemInCart.save()
      res.send(newItemInCart)
    }
  } catch (err) {
    console.log('is somethingwrong??')
    next(err)
  }
})

router.post('/:userId/completed', async (req, res, next) => {
  try {
    const userId = req.params.userId

    const order = await Order.findOne({
      where: {
        userId: userId,
        isActive: true
      }
    })

    order.isActive = false

    await order.save()
    await res.status(201).end()
  } catch (error) {
    console.log(error)
  }
})
//PUT /users/:userId/cart
//change qty of items in user cart
//[TODO] : add isUser middleware later
router.put('/:userId/cart', async (req, res, next) => {
  try {
    const ordereditemId = req.body.id
    const userId = req.params.userId

    const orderIdObj = await Order.findOne({
      where: {
        userId: userId,
        isActive: true
      },
      attributes: ['id']
    })

    const quantityInCart = req.body.orderedItems[0].quantity

    const itemInOrder = await OrderedItem.findOne({
      where: {
        groceryitemId: ordereditemId,
        orderId: orderIdObj.id
      }
    })

    const subTotal = req.body.price * quantityInCart

    itemInOrder.quantity = quantityInCart
    await itemInOrder.save()

    itemInOrder.subTotal = subTotal
    await itemInOrder.save()

    await res.status(201).end()
  } catch (err) {
    next(err)
  }
})

//remove items from user cart
//[TODO] add isUser middleware
router.delete('/:userId/cart', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const itemIdToDelete = req.body.id

    if (!req.body.id) {
      const orderIdToDelete = await Order.findOne({
        where: {
          userId: userId,
          isActive: true
        },
        attributes: ['id']
      })

      await OrderedItem.destroy({
        where: {
          orderId: orderIdToDelete.id
        }
      })

      return res.status(204).end()
    } else {
      await OrderedItem.destroy({
        where: {
          groceryitemId: itemIdToDelete
        }
      })
      return res.status(204).end()
    }
  } catch (err) {
    next(err)
  }
})
