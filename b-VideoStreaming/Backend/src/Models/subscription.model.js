import mongoose, { Schema } from "mongoose";

const SubscriptionSchema = new Schema({
    // The one who is subscribing
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // One to who subsciber is subscribing
    channel: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })


const Subscription = mongoose.model("Subscription", SubscriptionSchema);