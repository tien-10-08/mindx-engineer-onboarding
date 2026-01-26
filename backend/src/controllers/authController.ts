import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../models/Session";
import { trackAuthEvent } from "../libs/appInsights";

const accessTokenExpiry = "30m"; // Thời gian hết hạn của access token
const refreshTokenExpiry = 14 * 24 * 60 * 60 * 1000; // Thời gian hết hạn của refresh token

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;
    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const duplicate = await User.findOne({ $or: [{ username }, { email }] });
    if (duplicate) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      hashedPassword,
      email,
      displayName: `${firstName} ${lastName}`,
    });
    
    trackAuthEvent("signup", newUser._id.toString());
    
    return res.sendStatus(204);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      trackAuthEvent("failed", username);
      return res
        .status(401)
        .json({ message: "Username or password is incorrect" });
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      trackAuthEvent("failed", user._id.toString());
      return res
        .status(401)
        .json({ message: "Username or password is incorrect" });
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "Server configuration error" });
    }
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      secret,
      { expiresIn: accessTokenExpiry }
    );

    const refreshToken = crypto.randomBytes(64).toString("hex");

    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + refreshTokenExpiry),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: refreshTokenExpiry,
    });

    trackAuthEvent("login", user._id.toString());

    return res.status(200).json({ message: "Login successful", accessToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    // Lấy refresh token từ cookie
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not provided" });
    }

    // Tìm session với refresh token
    const session = await Session.findOne({ refreshToken });
    if (!session) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Kiểm tra session đã hết hạn chưa
    if (session.expiresAt < new Date()) {
      await Session.deleteOne({ refreshToken });
      return res.status(403).json({ message: "Refresh token expired" });
    }

    // Tìm user từ session
    const user = await User.findById(session.userId);
    if (!user) {
      await Session.deleteOne({ refreshToken });
      return res.status(404).json({ message: "User not found" });
    }

    // Tạo access token mới
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      secret,
      { expiresIn: accessTokenExpiry }
    );

    trackAuthEvent("refresh", user._id.toString());

    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    //lấy refresh token từ cookie
    const token = req.cookies.refreshToken;
    if (token) {
      const session = await Session.findOne({ refreshToken: token });
      
      // xóa refresh token khỏi Session
      await Session.deleteOne({ refreshToken: token });
      
      if (session) {
        trackAuthEvent("logout", session.userId.toString());
      }
      
      //xóa cookie
      res.clearCookie("refreshToken");
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
