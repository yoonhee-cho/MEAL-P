const router = require('express').Router()
const {Recipe} = require('../db/models')
module.exports = router

// authentication
function isAuthenticated(req, res, next) {
  if (req.user.id) {
    return next()
  } else {
    res.status(403).end()
  }
}

// GET /api/recipe
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    // this finds all recipes by user
    const recipes = await Recipe.findAll({
      // where: {userId: req.user.id},
      order: [['createdAt', 'ASC']] // sorts in chronological order :)
    })
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})

// POST /api/recipe
router.post('/', async (req, res, next) => {
  try {
    const recipeData = req.body
    recipeData.userId = req.user.id
    console.log('in express route', req.body)
    const recipe = await Recipe.create(recipeData)
    res.json(recipe)
  } catch (err) {
    next(err)
  }
})
