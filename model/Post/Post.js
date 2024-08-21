const mongoose=require ('mongoose')
//schema
const postSchema=new mongoose.Schema(
  {
    title:{
    type:String,
    require:true,
  },
  image:{
    type:String,
    default:""
  },
  claps:{
    type:Number,
    default:0
  },
  content:{
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
  postViews:{
    type:Number,
    default:0,
  },
  category:{
    type:mongoose.schema.Types.ObjectId,
    require:true,
    ref:"Category"
  },
  shedduledpublished:{
    type:Date,
    default:null,
  },
  likes:[{
    type:mongoose.schema.Types.ObjectId,
    ref:'User'
  }],
  dislikes:[{
    type:mongoose.schema.Types.ObjectId,
    ref:'User'
  }],
  comments:[{
    type:mongoose.schema.Types.ObjectId,
    ref:'Comment'
  }],

},
{
  timestamps:true,
}
)

//compile schema to model
const Post =mongoose.model("Post",postSchema);
module.exports=Post;