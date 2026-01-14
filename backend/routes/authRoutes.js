import express from "express";
import {
  register,
  signIn,
  signOut,
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();


router.post("/register", register);

router.post("/login", signIn);


router.post("/logout", auth, signOut);


export default router;
