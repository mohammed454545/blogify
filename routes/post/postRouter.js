const express = require('express');

const isLogin = require('../../middlewares/isLogin');
const { createPost,getPost, deletePost, updatePost, getPosts } = require('../../controllers/posts/post');
const postRouter =express.Router()
//create
postRouter.post('/',isLogin ,createPost);
//? all
postRouter.get('/' ,getPosts);
postRouter.get('/:id' ,getPost);
//! delete
postRouter.delete('/:id' ,isLogin,deletePost);
//* update
postRouter.put('/:id' ,isLogin,updatePost);
// *Export
module.exports =postRouter;