const router = require('express-promise-router')()
const userController = require('../controllers/user.controller')

router.post('/user', userController.createUser)

router.get('/user', userController.getAllUsers)

router.post('/login', userController.login)

module.exports = router