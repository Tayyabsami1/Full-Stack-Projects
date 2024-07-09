import { Router } from "express";
import { RegisterUser } from "../Controllers/user.controller.js";

const router=Router();

router.route("/register").post(RegisterUser);

export default router;