const isUserMiddleware = (req, res, next) => {
  const currentUser = Number(req.user.id)

  if (currentUser === Number(req.params.userId)) {
    next()
  } else {
    const error = new Error(
      'This user is not authorized to perform this action'
    )
    res.sendStatus = 401
    next(error)
  }
}

module.exports = isUserMiddleware
