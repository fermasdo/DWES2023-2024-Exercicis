const router = require('express').Router()

const usersController = require('../controllers/users.js')

router.post('/',usersController.loginUser)

router.post('/register',usersController.registerUser)

module.exports = router