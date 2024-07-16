import { Router } from "express";

const AuthRouter=Router();

import { LoginMaker, RegisterMaker,LogoutMaker } from "../Controllers/auth.controller.js";

AuthRouter.post("/login",LoginMaker);
AuthRouter.post("/signup",RegisterMaker);
AuthRouter.post("/logout",LogoutMaker);

export {AuthRouter};