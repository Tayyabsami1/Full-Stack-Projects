import { asyncHandler } from "../Utils/asyncHandler.js"

// Using a utility function async handler to get rid of try-catch blocks in our routes

export const LoginMaker = asyncHandler((req, res) => {
    // DB Operations
});

export const RegisterMaker = asyncHandler((req, res) => {
    // DB Operations
})

export const LogoutMaker = asyncHandler((req, res) => {
    // DB Operations
})