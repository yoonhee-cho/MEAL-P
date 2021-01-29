//isAdmin middleware created to protect api routes
const isAdmin = (req, res, next) => {
  const currUser = req.user
  if (currUser && currUser.isAdmin) {
    next()
  } else {
    const error = new Error('Sorry, this page is only for the admin')
    res.sendStatus(401)
    next(error)
  }
}

module.exports = isAdmin
