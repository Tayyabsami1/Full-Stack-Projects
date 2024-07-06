import { z } from "zod";

//? You can create single validation like this if you are validating only one field 
export const userNameValidation = z
    .string()
    .min(3, "Username must be atleast 3 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username should not contain special characters")

//? If you are validating an object such as the user object you can do like this 
//? and also you can use the single validation here also.

export const signUpSchema = z.object({
    userName: userNameValidation,
    email: z.string().email({ message: "Invalid Email address" }),
    password: z.string().min(6, { message: "Password must be atleast 6 Characters" })
})