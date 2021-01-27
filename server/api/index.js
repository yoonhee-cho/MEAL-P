const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/cart', require('./cart'))
router.use('/recipe', require('./recipe'))

//for admin access only
router.use('/groeceryItems', require('./groceryItems'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
