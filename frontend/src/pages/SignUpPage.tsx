import { useState } from "react";
import { Input, Button, Checkbox, message } from "antd";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  Facebook,
  ArrowRight,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import { z } from "zod";
import { registerSchema } from "../utils/authFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

export default function SignupPage() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  type SigUpValue = z.infer<typeof registerSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigUpValue>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SigUpValue) => {
    if (!agreeTerms) {
      message.warning("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);
    try {
      // Split fullName into firstName and lastName
      const nameParts = data.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      await signup({
        username: data.username,
        password: data.password,
        email: data.email,
        firstName,
        lastName,
      });

      message.success("Account created successfully!");
      navigate("/", { replace: true });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
      message.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderError = (field: keyof SigUpValue) => {
    const error = errors[field];
    if (!error) return null;
    return <p className="text-red-500 text-sm mt-1">{error.message}</p>;
  };

  const socialButtons = (
    <div className="grid grid-cols-2 gap-4">
      <Button
        icon={<Chrome size={20} />}
        className="flex items-center justify-center h-12 rounded-2xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 hover:scale-[1.02] font-medium"
      >
        <span className="ml-2">Google</span>
      </Button>
      <Button
        icon={<Facebook size={20} />}
        className="flex items-center justify-center h-12 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:scale-[1.02] font-medium"
      >
        <span className="ml-2">Facebook</span>
      </Button>
    </div>
  );

  return (
    <AuthLayout
      icon={<User size={28} strokeWidth={2.5} />}
      title="Create new Account"
      socialButtons={socialButtons}
      footerLink={{
        text: "Already have an account?",
        linkText: "Login",
        onClick: () => navigate("/login"),
      }}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">
            Họ và tên
          </label>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <div
                className={`relative group transition-all duration-300 ${
                  focusedField === "fullName" ? "scale-[1.02]" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                    focusedField === "fullName" ? "opacity-30" : ""
                  }`}
                ></div>
                <Input
                  {...field}
                  prefix={
                    <User
                      className={`transition-all duration-300 ${
                        focusedField === "fullName"
                          ? "text-indigo-600 scale-110"
                          : "text-gray-400"
                      }`}
                      size={20}
                    />
                  }
                  placeholder="User name..."
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => {
                    field.onBlur();
                    setFocusedField(null);
                  }}
                  className="h-12 rounded-2xl bg-gray-50 hover:bg-gray-100 border-none transition-all duration-300"
                  size="large"
                />
                {renderError("fullName")}
              </div>
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div
                className={`relative group transition-all duration-300 ${
                  focusedField === "email" ? "scale-[1.02]" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                    focusedField === "email" ? "opacity-30" : ""
                  }`}
                ></div>
                <Input
                  {...field}
                  type="email"
                  prefix={
                    <Mail
                      className={`transition-all duration-300 ${
                        focusedField === "email"
                          ? "text-indigo-600 scale-110"
                          : "text-gray-400"
                      }`}
                      size={20}
                    />
                  }
                  placeholder="Email..."
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => {
                    field.onBlur();
                    setFocusedField(null);
                  }}
                  className="h-12 rounded-2xl bg-gray-50 hover:bg-gray-100 border-none transition-all duration-300"
                  size="large"
                />
                {renderError("email")}
              </div>
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">
            Username
          </label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <div
                className={`relative group transition-all duration-300 ${
                  focusedField === "username" ? "scale-[1.02]" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                    focusedField === "username" ? "opacity-30" : ""
                  }`}
                ></div>
                <Input
                  {...field}
                  prefix={
                    <User
                      className={`transition-all duration-300 ${
                        focusedField === "username"
                          ? "text-indigo-600 scale-110"
                          : "text-gray-400"
                      }`}
                      size={20}
                    />
                  }
                  placeholder="Username..."
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => {
                    field.onBlur();
                    setFocusedField(null);
                  }}
                  className="h-12 rounded-2xl bg-gray-50 hover:bg-gray-100 border-none transition-all duration-300"
                  size="large"
                />
                {renderError("username")}
              </div>
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div
                className={`relative group transition-all duration-300 ${
                  focusedField === "password" ? "scale-[1.02]" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                    focusedField === "password" ? "opacity-30" : ""
                  }`}
                ></div>
                <Input.Password
                  {...field}
                  prefix={
                    <Lock
                      className={`transition-all duration-300 ${
                        focusedField === "password"
                          ? "text-indigo-600 scale-110"
                          : "text-gray-400"
                      }`}
                      size={20}
                    />
                  }
                  placeholder="Password..."
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => {
                    field.onBlur();
                    setFocusedField(null);
                  }}
                  iconRender={(visible) =>
                    visible ? <Eye size={18} /> : <EyeOff size={18} />
                  }
                  className="h-12 rounded-2xl bg-gray-50 hover:bg-gray-100 border-none transition-all duration-300"
                  size="large"
                />
                {renderError("password")}
              </div>
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide ml-1">
            Confirm Password
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <div
                className={`relative group transition-all duration-300 ${
                  focusedField === "confirmPassword" ? "scale-[1.02]" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                    focusedField === "confirmPassword" ? "opacity-30" : ""
                  }`}
                ></div>
                <Input.Password
                  {...field}
                  prefix={
                    <Lock
                      className={`transition-all duration-300 ${
                        focusedField === "confirmPassword"
                          ? "text-indigo-600 scale-110"
                          : "text-gray-400"
                      }`}
                      size={20}
                    />
                  }
                  placeholder="Confirm Password..."
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => {
                    field.onBlur();
                    setFocusedField(null);
                  }}
                  iconRender={(visible) =>
                    visible ? <Eye size={18} /> : <EyeOff size={18} />
                  }
                  className="h-12 rounded-2xl bg-gray-50 hover:bg-gray-100 border-none transition-all duration-300"
                  size="large"
                />
                {renderError("confirmPassword")}
              </div>
            )}
          />
        </div>

        <div className="pt-2">
          <Checkbox
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="text-gray-600"
          >
            <span className="text-sm">
              I agree to the{" "}
              <button
                type="button"
                className="cursor-pointer text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="cursor-pointer text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
              >
                Privacy Policy
              </button>
            </span>
          </Checkbox>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none rounded-2xl shadow-lg shadow-indigo-300/50 hover:shadow-xl hover:shadow-indigo-400/50 font-semibold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-6"
          size="large"
          disabled={isSubmitting || isLoading || !agreeTerms}
          loading={isLoading}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Sign Up</span>
            <ArrowRight size={20} />
          </div>
        </Button>
      </form>
    </AuthLayout>
  );
}
