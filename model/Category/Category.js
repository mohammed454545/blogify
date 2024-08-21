const mongoose=require ('mongoose')
//schema
const categorySchema=new mongoose.Schema(
  {
    name:{
    type:String,
    require:true,
  },
  author:{
    type:mongoose.schema.Types.ObjectId,
    require:true,
    ref:'User'
  },
  shares:{
    type:Number,
    default:0,
  },
  
  post:{
    type:mongoose.schema.Types.ObjectId,
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