const express = require("express")
const Router = express.Router()
const UserController = require('../Controller/userController')

Router.get('/profile/:query',UserController.GetUserProfile)
Router.get('/user',UserController.GetUsers)
Router.post('/create',UserController.CreateUser)
Router.patch('/new',UserController.UpdateUser)
Router.delete('/user/:id',UserController.DeleteUser)
Router.delete('/user/:id',UserController.follow_Handling)
module.exports = Router;