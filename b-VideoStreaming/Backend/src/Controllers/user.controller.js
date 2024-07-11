import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../Models/user.model.js"
import { UploadOnCloudinary } from "../Utils/Cloudinary.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import jwt from "jsonwebtoken"

// Utility Function to generate access and refresh tokens with the help of methods we made in User Model
const generateAccessAndRefreshToken = async (userID) => {
   try {
      const user = await User.findById(userID);
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshTokens()

      user.refreshToken = refreshToken;
      // We update the data in the db
      await user.save({ validateBeforeSave: false });

      return { accessToken, refreshToken };
   }
   catch (err) {
      throw new ApiError(500, "Something went wrong while generating your tokens")
   }
}

// Async handler is our utlility function it helps us to use try catch block
const RegisterUser = asyncHandler(async (req, res) => {
   // Our data is the body of the request 
   const { username, email, password } = req.body;

   // checking if any field is empty using advanced syntax
   if ([username, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are necessary");
   }

   // We made on a query on the user model in the database , if user or email exist or not
   const UserExist = await User.findOne({
      $or: [{ username }, { email }]
   });

   // If user exists we simply throw the Error
   if (UserExist) throw new ApiError(409, "This User already exists");

   // Now lets check if any files are present 
   const AvatarLocalPath = req.files?.avatar[0]?.path;
   let CoverImgLocalPath;

   if (req.files && Array.isArray(req.files.coverPic) && req.files.coverPic.length > 0) {
      CoverImgLocalPath = req.files?.coverPic[0]?.path;
   }

   if (!AvatarLocalPath) throw new ApiError(400, "Please upload an Avatar");

   const AvatarCloudinaryObject = await UploadOnCloudinary(AvatarLocalPath);
   const CoverImgCloudinaryObject = await UploadOnCloudinary(CoverImgLocalPath);


   const MyNewUser = await User.create({
      username: username.toLowerCase(),
      password,
      email,
      avatar: AvatarCloudinaryObject.url,
      coverImage: CoverImgCloudinaryObject?.url || "",
   })

   // This is a fool proof method to check if my user is created in the DB or not 
   const createdUser = await User.findById(MyNewUser._id).select("-password -refreshToken");

   if (!createdUser) throw new ApiError(500, "Something went wrong while creating the User");


   //   return new ApiResponse(200,createdUser,)
   return res.status(200).json(new ApiResponse(200, createdUser, "User registered successfully"));
   // res.status(200).json({ message: "OK" });
});

const LoginUser = asyncHandler(async (req, res) => {
   const { username, password } = req.body;

   if (!username || !password) {
      throw new ApiError(400, "Please fill in all the credentials");
   }

   const MyUser = await User.findOne({username});

   if (!MyUser) throw new ApiError(400, "User doesnot exist");

   const isPassValid = await MyUser.isPasswordCorrect(password);

   if (!isPassValid) throw new ApiError(401, "Password is Incorrect");
   
   const {accessToken,refreshToken}=await generateAccessAndRefreshToken(MyUser._id);

   // Removing the password and Refresh token from the data we will send to the user 
   const LoggedInUser= await User.findById(MyUser._id).select("-password -refreshToken");

   // Creation of Cookies 
   const options={
      httpOnly:true,
      secure:true,
   }

   return res.status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken,options)
   .json(
      new ApiResponse(200,{user:LoggedInUser,accessToken,refreshToken,},"User Logged In Successfully")
   )
})

const LogoutUser=asyncHandler(async(req,res)=>{
   
  await  User.findByIdAndUpdate(
      req.user._id,
      {
         $unset:{
         refreshToken:1,
         }
      },{
         new:true,
      }
   )

   const options={
      httpOnly:true,
      secure:true,
   }

   return res
   .status(200)
   .clearCookie("refreshToken",options)
   .clearCookie("accessToken",options)
   .json(new ApiResponse(200,{},"User Logged out"));
})

const refreshAccessToken=asyncHandler(async(req,res)=>{
   const incommingToken=req.cookies.refreshToken|| req.body.refreshToken;

   if(incommingToken) throw new ApiError(400,"Unauthorized Request");
   const decodedToken=jwt.verify(incommingToken,process.env.REFRESH_TOKEN_SECRET)

   const user=User.findById(decodedToken?._id)

   if(!user) throw new ApiError(401,"Invalid Refresh Token");

   if(user?.refreshToken!==incommingToken)
      throw new ApiError(401,"Refresh Token is expired");

   const {accessToken,newRefreshToken}=await generateAccessAndRefreshToken(user?._id);

   const options={
      httpOnly:true,
      secure:true,
   }

   return res
   .status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",newRefreshToken,options)
   .json(new ApiResponse(200,{accessToken,newRefreshToken},"Refresh Token Refreshed Successful"))

});



export { RegisterUser,LoginUser,LogoutUser,refreshAccessToken };