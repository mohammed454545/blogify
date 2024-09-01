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

exports.blockUser = asyncHandler(async (req, res) => {
  // * العثور على المستخدم الذي سيتم حظره
  const userIdToBlock = req.params.userIdToBlock;
  const userToBlock = await User.findById(userIdToBlock);
  if (!userToBlock) {
      throw new Error('user to block not found');
  }

  // ! المستخدم الذي يقوم بالحظر
  const userBlocking = req.userAuth._id;

  // التحقق مما إذا كان المستخدم يحظر نفسه
  if (userIdToBlock.toString() === userBlocking.toString()) {
      throw new Error('cannot block yourself');
  }

  // العثور على المستخدم الحالي
  const currentUser = await User.findById(userBlocking);

  // ? التحقق مما إذا كان المستخدم قد تم حظره بالفعل
  if (currentUser?.blokedUsers?.includes(userIdToBlock)) {
      throw new Error('User already blocked');
  }

  // التأكد من أن blockedUsers معرفة كمصفوفة
  if (!currentUser.blokedUsers) {
      currentUser.blokedUsers = [];
  }

  // إضافة المستخدم إلى قائمة الحظر للمستخدم الحالي
  currentUser.blokedUsers.push(userIdToBlock);
  await currentUser.save();

  res.json({
      status: 'success',
      message: 'user blocked successfully'
  });
});




//@desc block a user
//@route POST /api/v1/users/block/:userIdToBlock
//@access Private

exports.unblockUser = asyncHandler(async (req, res) => {
  // * العثور على المستخدم الذي سيتم حظره
  const userIdToUnBlock = req.params.userIdToUnBlock;
  const userToUnBlock = await User.findById(userIdToUnBlock);
  if (!userToUnBlock) {
      throw new Error('user to unblock not found');
  }

  // ! المستخدم الذي يقوم بالحظر
   const userUnBlocking = req.userAuth._id;



  // العثور على المستخدم الحالي
  const currentUser = await User.findById(userUnBlocking);

  // ? التحقق مما إذا كان المستخدم قد تم حظره بالفعل
  if (!currentUser?.blokedUsers?.includes(userIdToUnBlock)) {
      throw new Error('User not blocked');
  }

  // إضافة المستخدم إلى قائمة الحظر للمستخدم الحالي
  currentUser.blokedUsers=currentUser.blokedUsers.filter((id)=>id.toString()!==userIdToUnBlock.toString());
  await currentUser.save();

  res.json({
      status: 'success',
      message: 'user unblocked successfully'
  });
});