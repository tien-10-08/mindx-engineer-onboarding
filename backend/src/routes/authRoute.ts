import express from "express";
import { login, logout, signup, refresh } from "../controllers/authController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/signout", logout);
export default router;
