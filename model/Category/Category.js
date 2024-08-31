const mongoose=require ('mongoose')
//schema
const categorySchema=new mongoose.Schema(
  {
    name:{
    type:String,
    required:true,
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
  },
  shares:{
    type:Number,
    default:0,
  },
  
  post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'
  },
  

},
{
  timestamps:true,
}
)

//compile schema to model
const Catrgory =mongoose.model("Catrgory",categorySchema);
module.exports=Catrgory;