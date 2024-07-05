import mongoose from "mongoose";

const OrderItemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    },
    quantity:{
        type:Number,
        required:true,
    }
})

const OrderSchema=new mongoose.Schema({
    price:{
        type:Number,
        required:true
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    orderItems:{
        type:[OrderItemSchema],
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Cancelled","Delivered"],
        default:"Pending",
    }

},{timestamps:true});

export const Order=mongoose.model("Order",OrderSchema);