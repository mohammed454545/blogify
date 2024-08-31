const Comment = require("../../model/Comment/Comment");
const asyncHandler=require('express-async-handler');
const Post =require('../../model/Post/Post')
//@desc create a comment
//@route DELETE /api/v1/users/comments
//@access Private
exports.createComment=asyncHandler(async(req,res)=>{
  //get the payload
  const {message,author}=req.body;
  //get the postId
  const postId =req.params.postId;
  //* create comment
  const comment =await Comment.create({
    message,
    author:req.userAuth._id,
    postId
  });
  //Associate comment to apost
  await Post.findByIdAndUpdate(postId,{$push:{comments:comment._id}},{new:true})
  // send the response
  res.json({
    status:"success",
    message:'Coment created successfully',
    comment,
  })
})


//@desc delete a Comment
//@route DELETE /api/v1/users/comments/:id
//@access Private

exports.deleteComment=asyncHandler(async(req , res)=>{
await Comment.findByIdAndDelete(req.params.id);

  res.status(202).json({
    status:'success',
    message:'comment successfully deleted',
  });
})



//@desc update a comment
//@route PUT /api/v1/users/comments/:id
//@access Private

exports.updateComment=asyncHandler(async(req , res)=>{
  const comment=await Comment.findByIdAndUpdate(req.params.id,{message:req.body.message},{new:true,runValidators:true});
  
    res.status(200).json({
      status:'success',
      message:'comment successfully updated',
      comment
    });
  })