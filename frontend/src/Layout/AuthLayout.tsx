import { Lock } from "lucide-react";
import { Divider } from "antd";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  icon?: ReactNode;
  title: string;
  footerLink?: {
    text: string;
    linkText: string;
    onClick: () => void;
  };
  socialButtons?: ReactNode;
};

export default function AuthLayout({
  children,
  icon = <Lock size={28} strokeWidth={2.5} />,
  title,
  footerLink,
  socialButtons,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-400 opacity-10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "700ms" }}
        ></div>
        <div
          className="absolute -bottom-40 left-1/3 w-80 h-80 bg-pink-400 opacity-10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
      </div>

      <div className="w-full max-w-xl relative z-10">
        <div className="bg-white opacity-90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-900/20 p-8 sm:p-10 transition-all duration-500 hover:shadow-purple-900/30 scrollbar-hide">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-indigo-200 transform transition-transform duration-300 hover:scale-110 hover:rotate-3">
              <div className="text-white">{icon}</div>
            </div>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {title}
            </h1>
          </div>

          {children}

          {socialButtons && (
            <>
              <Divider plain className="my-6">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2">
                  Or continue with
                </span>
              </Divider>
              {socialButtons}
            </>
          )}

          {footerLink && (
            <div className="text-center pt-6 mt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                {footerLink.text}{" "}
                <button
                  type="button"
                  onClick={footerLink.onClick}
                  className="font-bold text-indigo-600 hover:text-indigo-700 transition-all duration-200 hover:underline hover:scale-105 inline-block cursor-pointer"
                >
                  {footerLink.linkText}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
