import mongoose,{Mongoose, Schema} from "mongoose";

const LikeSchema=new Schema({
    video:{
        type:mongoose.Types.ObjectId,
        ref:"Video",
    },
    comment:{
        type:mongoose.Types.ObjectId,
        ref:"Comment",
    },
    tweet:{
        type:mongoose.Types.ObjectId,
        ref:"Tweet",
    },
    likedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    }


},{timestamps:true})

const Likes=mongoose.model("Like",LikeSchema);