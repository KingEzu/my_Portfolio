import express from "express";
import { logout, register, getuser, updateProfile, updatePassword, getuserForPortfolio, forgetPassword, resetPassword } from "../controller/userController.js";
import { login } from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js"
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated,  logout);
router.get("/me", isAuthenticated,  getuser);
router.put("/update/me", isAuthenticated,  updateProfile);
router.put("/update/password", isAuthenticated,  updatePassword);
router.get("/me/portfolio",  getuserForPortfolio);
router.post("/password/forget", forgetPassword );
router.put("/password/reset/:token", resetPassword );

export default router;
