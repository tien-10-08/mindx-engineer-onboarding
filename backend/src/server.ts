/// <reference path="./express.d.ts" />
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./libs/db";
import { initializeAppInsights } from "./libs/appInsights";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";
import cookieParser from "cookie-parser";
import { protectedRouter } from "./middlewares/authMiddleware";
import { corsMiddleware } from "./middlewares/cors";
import { errorHandler } from "./middlewares/error";


dotenv.config();
initializeAppInsights();


const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(corsMiddleware);

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
app.use(errorHandler);

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
