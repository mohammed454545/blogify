const User =require('../../model/User/User')
const bcrypt = require ('bcryptjs');
const generateToken = require('../../utils/generateToken');
//@desc Register a new user
//@route POST /api/v1/users/register
//@access public
const asyncHandler =require('express-async-handler')
exports.register = asyncHandler(async (req, res) => {
    // Extract user details from request body
    const { username, password, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ status: 'fail', message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user
    await newUser.save();

    // Return success response
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  
});

//@desc login user
//@route POST /api/v1/users/login
//@access public

exports.login = asyncHandler( async (req,res)=>{
  //? get the login details
  const {username , password}=req.body;
  //!check if exists
  const user =await User.findOne({username});
  if(!user){
    throw new Error('invaled login credentials')
  }
  //compare the hashed password with the one the request
  const isMatched=await bcrypt.compare(password,user?.password);
  if(!isMatched){
    throw new Error('invaled login credentials')
  }
  //Update the last login
  user.lastLogin =await new Date();
  res.json({
    status:'success',
    _id:user?._id,
    email:user?.email,
    username:user?.username,
    role:user?.role,
    token:generateToken(user),
  })

})



//@desc Get Profile
//@route GET /api/v1/users/profile/:id
//@access Private

exports.getProfile= asyncHandler(async(req,res,next)=>{

  const id=req.userAuth._id;
  const user=await User.findById(id);

    res.json({
      status:'success',
      message:'profile fetched',
      user,
    })

})


//@desc block a user
//@route POST /api/v1/users/block/:userIdToBlock
//@access Private

exports.blockUser=asyncHandler(async(req,res)=>{
  //*find the user to blocked
  const userIdToBlock=req.params.userIdToBlock;
  const userToBlock = await User.findById(userIdToBlock);
  if (!userToBlock){
    throw new Error ('user to block not found')
  }
  //! user who is blocking
  const userBlocking=req.userAuth._id;
  //check if user is blocking him/hereself
  if (userIdToBlock.toString()===userBlocking.toString){
    throw new Error ('cannot block yourself');
  }
  //find the current user 
  const currentUser =await User.findById(userIdToBlock);
  //? check if user already blocked
  if (currentUser?.blockUsers?.includes(userIdToBlock)){
    throw new Error ('Useralready blocked');
  }
  //push the user to be blocked in the array of the current user
  currentUser?.blockedUsers.push(userIdToBlock);
  await currentUser.save()
  res.json({
    status:'success'
    message:'user blocked successfully'
  })
})