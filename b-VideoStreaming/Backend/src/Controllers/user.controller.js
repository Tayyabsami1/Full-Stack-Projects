import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../Models/user.model.js"
import { UploadOnCloudinary } from "../Utils/Cloudinary.js";
import { ApiResponse } from "../Utils/ApiResponse.js";


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

export { RegisterUser };