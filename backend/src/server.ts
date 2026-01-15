/// <reference path="./express.d.ts" />
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./libs/db";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";
import cookieParser from "cookie-parser";
import { protectedRouter } from "./middlewares/authMiddleware";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  /\.trycloudflare\.com$/, 
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.some(allowedOrigin => {
        if (typeof allowedOrigin === "string") {
          return origin === allowedOrigin;
        }
        if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return false;
      });
      
      if (isAllowed) {
        callback(null, true);
      } else {
        console.log("CORS blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
    version: '1.0.0'
  });
});

app.use("/auth", authRoute);
app.use(protectedRouter);
app.use("/user", userRoute);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    throw error;
  }
};
startServer();
