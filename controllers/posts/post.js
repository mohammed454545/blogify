const asyncHandler=require('express-async-handler');
const Post =require('../../model/Post/Post')
const User =require('../../model/User/User')
const Category =require('../../model/Category/Category')
//@desc create a post
//@route DELETE /api/v1/users/posts
//@access Private


exports.createPost=asyncHandler(async(req,res)=>{

  //Get the payload
  const {title,content,categoryId}=req.body;
  //check if post exists
  const postFound =await Post.findOne({title});
  if (postFound){
    throw new Error("post already exists")
  }
  //* creat post
  const post =await Post.create(
    {
      title,
      content,
      category:categoryId,
      author:req?.userAuth?._id,
    }
  )
  //! Associate post to user
await User.findByIdAndUpdate(req?.userAuth?._id,{$push:{posts:post._id}},{new:true});
  //* push post ino category
await Category.findByIdAndUpdate(req?.userAuth?._id,{$push:{posts:post._id}},{new:true});
  //? send the response
  res.status(201).json({
    status:'scuccess',
    message:'post succesfully created',
    post,
  })
})


//@desc get all posts
//@route GET /api/v1/users/posts
//@access PUBLIC

exports.getPosts=asyncHandler(async(req , res)=>{
  const posts =await Post.find({}).populate('comments');

  res.status(201).json({
    status:'success',
    message:'posts successfully fetched',
    posts,
  });
})



//@desc get a post
//@route GET /api/v1/users/posts/:id
//@access PUBLIC

exports.getPost=asyncHandler(async(req , res)=>{
  const post =await Post.findById(req.params.id).populate('comments');

  res.status(201).json({
    status:'success',
    message:'post successfully fetched',
    post,
  });
})



//@desc delete a post
//@route DELETE /api/v1/users/posts/:id
//@access Private

exports.deletePost=asyncHandler(async(req , res)=>{
  await Post.findByIdAndDelete(req.params.id);
  
    res.status(202).json({
      status:'success',
      message:'post successfully deleted',
    });
  })
  
  
  
  //@desc update a post
  //@route PUT /api/v1/users/posts/:id
  //@access Private
  
  exports.updatePost=asyncHandler(async(req , res)=>{
    const post=await Post.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    
      res.status(200).json({
        status:'success',
        message:'post successfully updated',
        post
      });
    })