import { useState } from "react";
import { Input, Button, Checkbox, message } from "antd";
import { User, Lock, Eye, EyeOff, Chrome, Facebook } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import { z } from "zod";
import { loginSchema } from "../utils/authFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  type loginFormValue = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginFormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const renderError = (field: keyof loginFormValue) => {
    const error = errors[field];
    if (!error) return null;
    return <p className="text-red-500 text-sm mt-1">{error.message}</p>;
  };

  const onSubmit = async (data: loginFormValue) => {
    setIsLoading(true);
    try {
      await login(data);
      message.success("Login successful!");
      
      // Navigate to the page user was trying to access, or home
      const from = (location.state as { from?: Location })?.from;
      navigate(from ? (from as Location).pathname : "/", { replace: true });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      message.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
      icon={<Lock size={28} strokeWidth={2.5} />}
      title="Welcome!"
      socialButtons={socialButtons}
      footerLink={{
        text: "Don't have an account?",
        linkText: "Sign up now",
        onClick: () => navigate("/signup"),
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  placeholder="Username..."
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
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => {
                    field.onBlur();
                    setFocusedField(null);
                  }}
                  className="h-14 rounded-2xl bg-gray-50 hover:bg-gray-100 border-none transition-all duration-300"
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
                  placeholder="Password..."
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
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => {
                    field.onBlur();
                    setFocusedField(null);
                  }}
                  iconRender={(visible) =>
                    visible ? <Eye size={18} /> : <EyeOff size={18} />
                  }
                  className="h-14 rounded-2xl bg-gray-50 hover:bg-gray-100 border-none transition-all duration-300"
                  size="large"
                />
                {renderError("password")}
              </div>
            )}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="text-gray-600"
          >
            <span className="text-sm">Remember me</span>
          </Checkbox>
          <button
            type="button"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-all duration-200 hover:underline hover:scale-105"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none rounded-2xl shadow-lg shadow-indigo-300/50 hover:shadow-xl hover:shadow-indigo-400/50 font-semibold text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-8"
          size="large"
          disabled={isSubmitting || isLoading}
          loading={isLoading}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Login</span>
          </div>
        </Button>
      </form>
    </AuthLayout>
  );
}
