import mongoose, { Schema, Document } from "mongoose";

// defining a typescript interface for a Mongoose document
export interface Message extends Document {
    Content: string;
    createdAt: Date;
}

// this is only for type safety "Schema<Message>"
const MessageSchema: Schema<Message> = new Schema({
    Content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
}, { timestamps: true });

export interface User extends Document {
    userName: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptingMessages: boolean;
    isVerified: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        // RegexR expression to verify Email syntax
        match: [/.+\@.+\..+/, "Please use a valid Email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "VerifyCode is required"],
    },
    verifyCodeExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages:[MessageSchema],
})

const UserModel=mongoose.models.User as mongoose.Model<User> || mongoose.model("User",UserSchema);