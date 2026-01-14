import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Invalid email address");

export const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/^\S+$/, "Password must not contain spaces")
  .max(64, "Password must be at most 64 characters")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

export const confirmPasswordSchema = z
  .string()
  .min(1, "Please confirm your password");

export const usernameSchema = z
  .string()
  .trim()
  .min(1, "Username must be at least 1 character")
  .max(20, "Username must be at most 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores"
  );

export const fullNameSchema = z
  .string()
  .trim()
  .min(1, "Full name is required")
  .max(50, "Full name must be at most 50 characters");
