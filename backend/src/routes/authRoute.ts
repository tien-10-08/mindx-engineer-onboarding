import express from "express";
import { login, logout, signup } from "../controllers/authController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/signout", logout);
export default router;
