const router = require('express').Router()
const {Weeklyprice} = require('../db/models')
module.exports = router

//authentication
// function isAuthenticated(req, res, next) {
//     if (req.user.id) {
//       return next()
//     } else {
//       res.status(403).end()
//     }
//   }

// GET /api/weeklyprices/:userId (add authentication later)
router.get('/:userId', async (req, res, next) => {
  try {
    const weeklyprices = await Weeklyprice.findAll({
      where: {userId: req.params.userId},
      order: [['createdAt', 'ASC']] // sorts in chronological order :)
      // attributes: ['category', 'data', 'createdAt']
    })
    res.json(weeklyprices)
  } catch (err) {
    next(err)
  }
})

// POST /api/weeklyprices/:userId
router.post('/:userId', async (req, res, next) => {
  try {
    const priceData = req.body
    const userId = req.params.userId
    console.log('in express route, req.body', req.body)

    const weeklyprices = await Weeklyprice.create(priceData, {
      where: {userId: userId}
    })
    res.json(weeklyprices)
  } catch (err) {
    next(err)
  }
})
