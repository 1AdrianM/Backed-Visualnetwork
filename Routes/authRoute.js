const express = require("express")
const router = express.Router()
const Auth = require('../Controller/authController')

router.route('/LogIn').post(Auth.LogIn)
router.route('/refresh').get(Auth.refresh)
router.route('/LogOut').post(Auth.LogOut)

module.exports = router