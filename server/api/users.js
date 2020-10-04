const router = require('express').Router()
const {User, Groceryitem, GroceryInOrder, Order} = require('../db/models')
const GroceryInOder = require('../db/models/groceryinorder')
module.exports = router

//GET api/users/:userId/cart
router.get('/:userId/cart', async (req, res, next) => {
  try {
    // const users = await User.findAll({
    //   attributes: ['id', 'email']
    // })
    const userIdFromLink = req.params.userId

    const orderIdFromOrders = await Order.findAll({
      where: {
        userId: userIdFromLink
      },
      attributes: ['id']
    })

    if (orderIdFromOrders.length > 0) {
      const findGroceryIdInCart = await GroceryInOrder.findAll({
        where: {
          orderId: orderIdFromOrders[0].id
        },
        attributes: ['groceryitemId']
      })

      const getGroceryItems = async () => {
        return Promise.all(
          findGroceryIdInCart.map(async groceryItem => {
            const groceryItemId = groceryItem.groceryitemId
            const groceryGetter = await Groceryitem.findOne({
              where: {
                id: groceryItemId
              },

              include: [
                {
                  model: GroceryInOder,
                  where: {
                    orderId: orderIdFromOrders[0].id
                  },
                  attributes: ['groceryitemId', 'qty', 'totalPrice']
                }
              ]
            })
            return groceryGetter
          })
        )
      }

      getGroceryItems().then(data => {
        res.json(data)
      })
    }
  } catch (err) {
    next(err)
  }
})

//PUT api/users/:userId/cart (update, 수정)
router.put('/:userId/cart', async (req, res, next) => {
  try {
    const groceryItemId = req.body.id

    const userId = req.params.userId

    const orderId = await Order.findOne({
      where: {
        userId: userId
      },
      attributes: ['id']
    })

    const quantityInCart = req.body.grocery_in_orders[0].qty

    const groceryInOrder = await GroceryInOrder.findOne({
      where: {
        groceryitemId: groceryItemId,
        orderId: orderId.id
      }
    })

    const subtotal = req.body.price * quantityInCart

    groceryInOrder.quantity = quantityInCart
    await groceryInOrder.save()
    groceryInOrder.totalPrice = subtotal

    await groceryInOrder.save()

    await res.status(201).end()
  } catch (error) {
    console.log(error)
  }
})

//DELETE /api/users/:userId/cart
router.delete('/:userId/cart', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const groceryIdToBeRmoved = req.body.id
    if (!req.body.id) {
      const orderIdToBeDeleted = await Order.findOne({
        where: {
          userId: userId
        },
        attributes: ['id']
      })

      await GroceryInOrder.destroy({
        where: {
          orderId: orderIdToBeDeleted.id
        }
      })

      return res.status(204).end()
    } else {
      await GroceryInOrder.destroy({
        where: {
          groceryitemId: groceryIdToBeRmoved
        }
      })
      return res.status(204).end()
    }
  } catch (err) {
    next(err)
  }
})
