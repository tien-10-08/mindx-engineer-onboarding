import {
  emailSchema,
  passwordSchema,
  usernameSchema,
  confirmPasswordSchema,
  fullNameSchema,
} from "./validate";
import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: "custom",
      });
    }
  });

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});
