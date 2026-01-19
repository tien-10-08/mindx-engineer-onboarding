import cors from "cors";

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  /\.trycloudflare\.com$/,
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(pattern => 
      typeof pattern === "string" ? origin === pattern : pattern.test(origin)
    )) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
});