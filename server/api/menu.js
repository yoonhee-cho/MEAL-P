const router = require('express').Router()
const {Menu} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const menus = await Menu.findAll()
    res.json(menus)
  } catch (err) {
    next(err)
  }
})

router.get('/:menuId', async (req, res, next) => {
  try {
    const menuId = req.params.menuId
    const menu = await Menu.findByPk(menuId)
    res.json(menu)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newItem = {
      name: req.body.name,
      category: req.body.category,
      createdAt: req.body.createdAt
    }
    // const newItem = await Menu.create(req.body)
    const newMenu = await Menu.create(newItem)
    res.json(newMenu)
  } catch (err) {
    next(err)
  }
})

router.put('/:menuId', async (req, res, next) => {
  try {
    const menuId = req.params.menuId
    const menuToUpdate = await Menu.findByPk(menuId)
    const updatedMenu = await menuToUpdate.update(req.body)
    res.json(updatedMenu)
  } catch (err) {
    next(err)
  }
})

//admin delete grocery item api route
//[TODO] : add isAdmin middleware
router.delete('/:menuId', async (req, res, next) => {
  try {
    const menuId = req.params.menuId
    const menuToDelete = await Menu.findByPk(menuId)
    await menuToDelete.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
