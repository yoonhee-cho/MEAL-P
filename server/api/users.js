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

//PUT (CREATE OR REPLACE) api/users/:userId/cart
// add item to user cart
//[TODO] : add isUser middleware later
router.post('/:userId/cart', async (req, res, next) => {
  try {
    let userId = req.params.userId
    let itemId = req.body.id

    //디비에서 현재유저의 오더를 찾아, 오더한아이템리스트 포함해서
    let orderId = await Order.findOrCreate({
      where: {
        userId: userId,
        isActive: true
      },
      attributes: ['id']
    })

    //현재오더아이템을 디비에서 찾아
    let currentOrderItem = await OrderedItem.findOne({
      where: {
        groceryitemId: itemId,
        orderId: orderId[0].id
      }
    })

    if (currentOrderItem) {
      let newQty = currentOrderItem.quantity + 1
      await currentOrderItem.update({
        quantity: newQty,
        subTotal: newQty * currentOrderItem.price
      })
    } else {
      const newItemInCart = await OrderedItem.create({
        price: currentOrderItem.price,
        orderId: orderId[0].id,
        groceryitemId: itemId
      })
      await newItemInCart.save()
      res.send(newItemInCart)
    }
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
//[TODO] add isUser middleware
router.delete('/:userId/:orderId/:ordereditemId', async (req, res, next) => {
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
})

router.put('/:userId/:cartId/purchase', async (req, res, next) => {
  try {
    let cartId = req.params.cartId
    let currentCart = await Order.findByPk(cartId, {
      include: {
        model: OrderedItem,
        include: [Groceryitem]
      }
    })
    await currentCart.update(req.body)
    await currentCart.save()
  } catch (err) {
    next(err)
  }
})
