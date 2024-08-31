const asyncHandler=require('express-async-handler');
const Category =require('../../model/Category/Category')


//@desc Register a category
//@route POST /api/v1/users/categories
//@access Private

exports.createCategory=asyncHandler(async(req , res)=>{
  const {name,author}=req.body
  //! if exist
  const categoryFound =await Category.findOne({name});
  if (categoryFound){
    throw new Error ("Category already exists");
  }
  const category =await Category.create(
    {
      name:name,
      author:req.userAuth?._id,
    }
  );
  res.status(201).json({
    status:'success',
    message:'Category successfully created',
    category,
  });
})


//@desc get all categories
//@route GET /api/v1/users/categories
//@access PUBLIC

exports.getCategories=asyncHandler(async(req , res)=>{
  const categories =await Category.find({});

  res.status(201).json({
    status:'success',
    message:'categories successfully fetched',
    categories,
  });
})



//@desc delete a category
//@route DELETE /api/v1/users/categories/:id
//@access Private

exports.deleteCategory=asyncHandler(async(req , res)=>{
await Category.findByIdAndDelete(req.params.id);

  res.status(202).json({
    status:'success',
    message:'category successfully deleted',
  });
})



//@desc update a category
//@route PUT /api/v1/users/categories/:id
//@access Private

exports.updateCategory=asyncHandler(async(req , res)=>{
  const category=await Category.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true,runValidators:true});
  
    res.status(200).json({
      status:'success',
      message:'category successfully updated',
      category
    });
  })