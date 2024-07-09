import { asyncHandler } from "../Utils/asyncHandler.js";

// Async handler is our utlility function it helps us to use try catch block
const RegisterUser=asyncHandler(async(req,res)=>{
   const {userName,email,password}=req.body;
   console.log(email);
   res.status(200).json({message:"OK"}); 
});

export {RegisterUser};