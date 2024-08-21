const mongoose=require ('mongoose')
//schema
const commentSchema=new mongoose.Schema(
  {
    text:{
    type:String,
    require:true,
  },
  author:{
    type:mongoose.schema.Types.ObjectId,
    require:true,
    ref:'User'
  },


  
  postId:{
    type:mongoose.schema.Types.ObjectId,
    ref:'Post',
    required:true,
  },
  

},
{
  timestamps:true,
}
)

//compile schema to model
const Comment =mongoose.model("Comment",commentSchema);
module.exports=Comment;