import express from "express";
import {
  register,
  login,
  me,
  callbackGoogle,
} from "../controllers/auth.controller.js";
import passport from "passport";
import authentication from "../middleware/authentication.js";
import uploadCloudinary from "../middleware/uploadCloudinary.js";

const authRouter = express.Router();

authRouter.post("/register", uploadCloudinary.single("avatar"), register);
authRouter.post("/login", login);
authRouter.get("/me", authentication, me);

authRouter.get(
  "/login-google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
authRouter.get(
  "/callback-google",
  passport.authenticate("google", { session: false }),
  callbackGoogle
);

export default authRouter;
