const express = require('express');
const router = express.Router();
const PostController = require('../Controller/PostController')

router.post('/:id',PostController.bookmaks_handling)

router.put('/like/:id',PostController.likes_Handling)

router.get('/:id',PostController.GetPost)

router.post('/create',PostController.CreatePost)//SignIn

router.delete('/:id',PostController.DeletePost) //listar

router.put('/reply/:id',PostController.replyTo)

router.delete('/reply/:id',PostController.deleteReply)

module.exports=router; 