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
    const currentCart = await Order.findOne({
      where: {
        userId: userId,
        isActive: true
      },
      include: {
        model: OrderedItem,
        include: [Groceryitem]
      }
    })
    res.json(currentCart)
  } catch (err) {
    next(err)
  }
})

//PUT (CREATE OR REPLACE) api/users/:userId/:groceryItemId/add
// add item to user cart
//[TODO] : add isUser middleware later
router.put('/:userId/:groceryItemId/add', async (req, res, next) => {
  try {
    let userId = req.params.userId
    let itemId = req.params.groceryItemId

    //디비에서 현재 유저를 찾아
    const currentUser = await User.findByPk(userId, {
      include: [Order]
    })

    //디비에서 현재유저의 오더를 찾아, 오더한아이템리스트 포함해서
    let currentOrder = await Order.findOrCreate({
      where: {
        userId: userId,
        isActive: true
      },
      include: [OrderedItem]
    })

    //현재아이템(추가할아이템)을 디비에서 찾아
    let currentItem = await Groceryitem.findByPk(itemId)

    //현재오더아이템을 디비에서 찾아
    let currentOrderItem = await OrderedItem.findOne({
      where: {
        groceryitemId: itemId,
        orderId: currentOrder[0].dataValues.id
      }
    })

    if (currentOrderItem) {
      let newQty = currentOrderItem.quantity + 1
      await currentOrderItem.update({
        quantity: newQty,
        subTotal: newQty * currentOrderItem.price
      })
    } else {
      OrderedItem.create({
        price: currentItem.price,
        orderId: currentOrder[0].dataValues.id,
        groceryitemId: itemId
      })
    }
    res.json(currentUser)
  } catch (err) {
    next(err)
  }
})

//PUT /users/:userId/:ordereditemId
//change qty of items in user cart
//[TODO] : add isUser middleware later
router.put('/:userId/:ordereditemId', async (req, res, next) => {
  try {
    let ordereditem = await OrderedItem.findByPk(req.params.ordereditemId)
    await ordereditem.update(req.body)
    await ordereditem.save()
    let updatedOrder = await Order.findByPk(ordereditem.orderId, {
      include: {
        model: OrderedItem,
        include: [Groceryitem]
      }
    })
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

//DELETE /:userId/:cardId/:ordereditemId
//remove items from user cart
router.delete(
  '/:userId/:orderId/:ordereditemId',
  isUser,
  async (req, res, next) => {
    try {
      let orderItems = await OrderedItem.findByPk(req.params.ordereditemId)
      await orderItems.destroy()
      await orderItems.save()

      let order = await Order.findByPk(req.params.orderId, {
        include: {
          model: OrderedItem,
          include: [Groceryitem]
        }
      })
      res.json(order)
    } catch (err) {
      next(err)
    }
  }
)
