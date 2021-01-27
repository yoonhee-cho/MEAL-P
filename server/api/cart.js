const router = require('express').Router()
const {Groceryitem} = require('../db/models')
module.exports = router

// authentication
function isAuthenticated(req, res, next) {
  if (req.user.id) {
    return next()
  } else {
    res.status(403).end()
  }
}

// GET /api/groceryItem
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    // finds all groceryItem by user
    const groceryItems = await Groceryitem.findAll({
      // where: {userId: req.userId},
    })
    res.json(groceryItems)
  } catch (err) {
    next(err)
  }
})

// POST /api/weeklyprices/:userId
// router.post('/:userId', async (req, res, next) => {
//   try {
//     const priceData = req.body
//     const userId = req.params.userId
//     console.log('in express route, req.body', req.body)

//     const weeklyprices = await Weeklyprice.create(priceData, {
//       where: {userId: userId}
//     })
//     res.json(weeklyprices)
//   } catch (err) {
//     next(err)
//   }
// })
