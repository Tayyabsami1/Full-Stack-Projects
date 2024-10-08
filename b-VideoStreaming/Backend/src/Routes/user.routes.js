// Step 1 create a middleware of the Route in the main App.js
// Step 2 Initialize a router to do the specific tasks 
// Step 3 Add the path and the specific controler to handle the tasks
// We can also inject a middleware in the Route to upload pic or send files ect

import { Router } from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    getUserChannelProfile,
    getWatchHistory,
    LoginUser,
    LogoutUser,
    refreshAccessToken,
    RegisterUser,
    updateAccountDetail,
    updateAvatarDetails,
    updateCoverPicDetails
} from "../Controllers/user.controller.js";

import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router = Router();

// router.post("/register",controller);

// Lets inject a Middleware in this Route for the Image uploading , we created one through Multer
router.route("/register").post(upload.fields(
    [
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverPic",
            maxCount: 1,
        }
    ]
), RegisterUser);

router.route("/login").post(LoginUser);

router.route("/logout").post(verifyJWT, LogoutUser);
router.route("/refreshToken").post(refreshAccessToken);

router.route("/changePassword").post(verifyJWT, changeCurrentPassword);


router.route("/user").get(verifyJWT, getCurrentUser);

// So that we only modify our required data not the whole
router.route("/updateAccount").patch(verifyJWT, updateAccountDetail);

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateAvatarDetails);

router.route("/coverPic").patch(verifyJWT, upload.single("coverPic"), updateCoverPicDetails);

router.route("/channel/:username").get(verifyJWT, getUserChannelProfile);

router.route("/watchHistory").get(verifyJWT, getWatchHistory);

export default router;