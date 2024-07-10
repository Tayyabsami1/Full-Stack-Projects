// Step 1 create a middleware of the Route in the main App.js
// Step 2 Initialize a router to do the specific tasks 
// Step 3 Add the path and the specific controler to handle the tasks
// We can also inject a middleware in the Route to upload pic or send files ect

import { Router } from "express";
import { RegisterUser } from "../Controllers/user.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router=Router();

// router.post("/register",controller);

// Lets inject a Middleware in this Route for the Image uploading , we created one through Multer
router.route("/register").post(upload.fields(
    [
        {
            name:"avatar",
            maxCount:1,
        },
        {
            name:"coverPic",
            maxCount:1,
        }
    ]
),RegisterUser);

export default router;