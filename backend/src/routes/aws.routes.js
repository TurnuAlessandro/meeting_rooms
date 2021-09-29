const router = require('express-promise-router')()
const awsController = require('../controllers/aws.controller')
/*
router.get('/', awsController.read)
router.post('/', awsController.write)
*/


router.get('/', awsController.read)
router.post('/', awsController.write)
module.exports = router