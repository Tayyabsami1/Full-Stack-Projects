import { asyncHandler } from "../Utils/asyncHandler.js"
import bcrypt from "bcrypt";
import prisma from "../Utils/Prisma.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { ApiError } from "../Utils/ApiError.js";

// Using a utility function async handler to get rid of try-catch blocks in our routes

export const LoginMaker = asyncHandler((req, res) => {
    // DB Operations
});

export const RegisterMaker = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Checking if the user already exists in the database
    
    
    
    // Hashed the password using bcrypt
    const hashedPass = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPass,
        },
    })

    if(!user)
    {
        throw new ApiError(400,"User creation Failed");
    }


    return res.status(200).json(new ApiResponse(200, user, "User created Successful"));
})

export const LogoutMaker = asyncHandler((req, res) => {
    // DB Operations
})