const router = require('express').Router()
const blogs = require('./blog')
const users = require('./user')
const login = require('./login')
const middleware = require ('../utils/middleware')

router.use(middleware.requestLogger)
router.use(middleware.tokenExtractor)
router.use('/blogs', blogs)
router.use('/users', users)
router.use('/login', login)
router.use(middleware.unknownEndpoint)
router.use(middleware.errorHandler)

module.exports = router
