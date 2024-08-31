const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const { createComment, deleteComment, updateComment } = require('../../controllers/comments/comments');
const commentRouter =express.Router()
commentRouter.post('/:postId',isLogin ,createComment);
//! delete
commentRouter.delete('/:id' ,isLogin,deleteComment);
//* update
commentRouter.put('/:id' ,isLogin,updateComment);
// *Export
module.exports =commentRouter;