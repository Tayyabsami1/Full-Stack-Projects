import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../Models/user.model.js"
import { UploadOnCloudinary } from "../Utils/Cloudinary.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import fs from "fs"

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

const deleteLocalFiles = (filePath) => {
   fs.unlinkSync(filePath);
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

   const MyUser = await User.findOne({ username });

   if (!MyUser) throw new ApiError(400, "User doesnot exist");

   const isPassValid = await MyUser.isPasswordCorrect(password);

   if (!isPassValid) throw new ApiError(401, "Password is Incorrect");

   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(MyUser._id);

   // Removing the password and Refresh token from the data we will send to the user 
   const LoggedInUser = await User.findById(MyUser._id).select("-password -refreshToken");

   // Creation of Cookies 
   const options = {
      httpOnly: true,
      secure: true,
   }

   return res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
         new ApiResponse(200, { user: LoggedInUser, accessToken, refreshToken, }, "User Logged In Successfully")
      )
})

const LogoutUser = asyncHandler(async (req, res) => {

   await User.findByIdAndUpdate(
      req.user._id,
      {
         $unset: {
            refreshToken: 1,
         }
      }, {
      new: true,
   }
   )

   const options = {
      httpOnly: true,
      secure: true,
   }

   return res
      .status(200)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .json(new ApiResponse(200, {}, "User Logged out"));
})

const refreshAccessToken = asyncHandler(async (req, res) => {
   const incommingToken = req.cookies.refreshToken || req.body.refreshToken;

   if (incommingToken) throw new ApiError(400, "Unauthorized Request");
   const decodedToken = jwt.verify(incommingToken, process.env.REFRESH_TOKEN_SECRET)

   const user = User.findById(decodedToken?._id)

   if (!user) throw new ApiError(401, "Invalid Refresh Token");

   if (user?.refreshToken !== incommingToken)
      throw new ApiError(401, "Refresh Token is expired");

   const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user?._id);

   const options = {
      httpOnly: true,
      secure: true,
   }

   return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(new ApiResponse(200, { accessToken, newRefreshToken }, "Refresh Token Refreshed Successful"))

});

const changeCurrentPassword = asyncHandler(async (req, res) => {
   const { oldPassword, newPassword } = req.body;
   const user = await User.findById(req.user?._id);
   const isPassCorrect = await user.isPasswordCorrect(oldPassword);

   if (!isPassCorrect) throw new ApiError(401, "Invalid Old Password");

   user.password = newPassword;
   await user.save({ validateBeforeSave: false });

   return res.status(200).json(new ApiResponse(200, {}, "Your password is changed successfully"));
})

const getCurrentUser = asyncHandler((req, res) => {
   return res.status(200).json(new ApiResponse(200, req.user, "User data sent"));
})

const updateAccountDetail = asyncHandler(async (req, res) => {
   const { username, email } = req.body;

   if (!username || !email)
      throw new ApiError(400, "Please Enter all the required fields");

   const myUser = await User.findByIdAndUpdate(
      req.user?._id,
      {
         $set: {
            username,
            email
         }
      },
      {
         new: true,
      }
   ).select("-password");

   return res.status(200).json(new ApiResponse(200, myUser, "User data updated successful"));
})

const updateAvatarDetails = asyncHandler(async (req, res) => {
   const avatarLocalPath = req.file?.avatar[0]?.path;

   if (!avatarLocalPath)
      throw new ApiError(400, "Avatar is missing ")

   const avatarCloudinaryObject = await UploadOnCloudinary(avatarLocalPath);

   if (!avatarCloudinaryObject.url)
      throw new ApiError(500, "Error while uploading Avatar Image")


   const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
         $set: {
            avatar: avatarCloudinaryObject.url,
         }
      }
      , {
         new: true,

      }
   ).select("-password");

   deleteLocalFiles(avatarLocalPath);

   return res.status(200).json(new ApiResponse(200, updatedUser, "User Avatar Updated Successfully"));
})

const updateCoverPicDetails = asyncHandler(async (req, res) => {
   const coverPicLocalPath = req.file?.coverPic[0]?.path;

   if (!coverPicLocalPath)
      throw new ApiError(400, "Cover Picture is missing ")

   const coverPicCloudinaryObject = await UploadOnCloudinary(coverPicLocalPath);

   if (!coverPicCloudinaryObject.url)
      throw new ApiError(500, "Error while uploading cover Image")

   const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
         $set: {
            coverImage: coverPicCloudinaryObject.url,
         }
      }
      , {
         new: true,

      }
   ).select("-password");
   deleteLocalFiles(coverPicLocalPath);
   return res.status(200).json(new ApiResponse(200, updatedUser, "User Cover Picture Updated Successfully"));
})

const getUserChannelProfile=asyncHandler(async(req,res)=>{
   const {username}=req.params;

   if(username?.trim())
   {
      throw new ApiError(400, "Please enter a valid channel name");
   }

   // aggregate is a method to do complex tasks , it takes in an array of pipeline stages
   const channel=await User.aggregate([
      {
         $match:{
            username:username.toLowerCase();
         }
      },{
         $lookup:{
            from:"subscriptions",
            localField:"_id",
            foreignField:"channel",
            as:"subscribers",
         }
      },
      {
         $lookup:{
            from:"subscriptions",
            localField:"_id",
            foreignField:"subscriber",
            as:"subscribeTo",
         }
      },
      {
         $addFields:{
            subscriberCount:{
               $size:"$subscribers",
            },
            channelSubscribeToCount:{
               $size:"$subscribeTo",
            },
            isSubscribed:{
               $cond:{
                  if:{$in: [req.user?._id,"$subscribers.subscriber"]},
                  then:true,
                  else:false,
               }
            }
         }
      },
      {
         $project:{
            fullName:1,
            username:1,
            subscriberCount:1,
            channelSubscribeToCount:1,
            isSubscribed:1,
            avatar:1,
            email:1,
            coverImage:1,
         }
      }
   ])

   // TODO : Console log the channel 

   if(!channel?.length)
      throw new ApiError(404,"Channel not found");

   return res.status(200).json(new ApiResponse(200,channel[0],"Channel data fetched successfully"))
})

export { RegisterUser, LoginUser, LogoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetail, updateAvatarDetails, updateCoverPicDetails };