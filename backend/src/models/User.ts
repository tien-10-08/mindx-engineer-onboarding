import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    displayName: {
      type: String,
      trim: true,
      required: true,
    },
    avatarUrl: {
      type: String, //link để hiển thị ảnh đại diện
    },
    avatarId: {
      type: String, //id ảnh đại diện trong cloudinary
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    phone: {
      type: String,
      sparse: true, //cho phép nhiều giá trị null trong trường unique
    },
  },
  {
    timestamps: true, //tự động tạo createdAt và updatedAt
  }
);

export const User = mongoose.model("User", userSchema);
