const jwt =require('jsonwebtoken')
const User =require("../model/User/User")
const isLogin=(req,res,next)=>{
  //Get token from header
  const token =req.headers.authorization?.split(" ")[1]

  //?verify the token 

  jwt.verify(token,process.env.JWT_KEY,async(err,decoded)=>{
    //get the user id
    const userId=decoded?.user?.id;
    const user =await User.findById(userId).select('username email role _id');
    //save the user into req obj
    req.userAuth=user;
    
    if(err){
      const err= new Error ("token expired/Invalid");
      next(err);
    }else{
  next();
    }
  })
  

}
module.exports=isLogin;