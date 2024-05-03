const express = require("express")
const Router = express.Router()
const UserController = require('../Controller/userController')

Router.get('/profile/:query',UserController.GetUserProfile)// to  check
Router.get('/users',UserController.GetUsers)// checked and working 
Router.post('/create',UserController.CreateUser)//Checked and working
Router.patch('/edit',UserController.UpdateUser)// Checked and working 
Router.delete('/:id',UserController.DeleteUser)// checked and working
Router.put('/users/:id',UserController.follow_Handling)// to check, to complete function!!
module.exports = Router;