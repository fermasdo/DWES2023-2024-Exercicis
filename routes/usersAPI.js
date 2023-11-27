const router = require('express').Router()

const usersController = require('../controllers/users.js')

router.post('/login',usersController.loginUser)

router.post('/register',usersController.registerUser)

module.exports = router