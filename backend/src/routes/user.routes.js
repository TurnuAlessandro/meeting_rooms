const router = require('express-promise-router')()
const userController = require('../controllers/user.controller')

router.get('/', userController.getAllUsers)

router.post('/exists', userController.userAlreadyExists)
router.post('/signup', userController.signup)


router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router