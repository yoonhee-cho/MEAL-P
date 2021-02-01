const router = require('express').Router()
const {Groceryitem} = require('../db/models')
const isAdmin = require('../auth/isAdminMiddleware')

//all grocery items api route
router.get('/', async (req, res, next) => {
  try {
    const groceryItems = await Groceryitem.findAll()
    res.json(groceryItems)
  } catch (err) {
    next(err)
  }
})

router.get('/:groceryItemId', async (req, res, next) => {
  try {
    const groceryItem = await Groceryitem.findByPk(req.params.groceryItemId)
    res.json(groceryItem)
  } catch (err) {
    next(err)
  }
})

//admin creates new item api route
//[TODO] : add isAdmin middleware
router.post('/', async (req, res, next) => {
  try {
    const newItem = await Groceryitem.create(req.body)
    res.json(newItem)
  } catch (err) {
    next(err)
  }
})

//admin edit grocery item api route
//[TODO] : add isAdmin middleware
router.put('/:itemId', async (req, res, next) => {
  try {
    const itemId = req.params.itemId
    const itemToUpdate = await Groceryitem.findByPk(itemId)
    const updatedItem = await itemToUpdate.update(req.body)
    res.json(updatedItem)
  } catch (err) {
    next(err)
  }
})

//admin delete grocery item api route
//[TODO] : add isAdmin middleware
router.delete('/:itemId', async (req, res, next) => {
  try {
    await Groceryitem.destroy({
      where: {
        id: req.params.itemId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
