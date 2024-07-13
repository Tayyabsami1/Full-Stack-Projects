import mongoose,{Schema} from "mongoose";

const tweetSchema = new Schema({
    content:{
        typeof:String,
        required:true,
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref:"User",
    }
},{ timestamps: true });

const Tweet = mongoose.model("Tweet",tweetSchema);