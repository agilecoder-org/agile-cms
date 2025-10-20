import { useState } from "react";
import { Sparkles, ShieldCheck, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";

const Authentication: React.FC = () => {
  const { form } = useParams();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState<boolean>(
    form ? (form === "login" ? true : false) : false
  );

  const switchMode = () => {
    setIsLogin(p => !p);
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Panel */}
      <div className="hidden lg:flex bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-purple-400" size={32} />
              <h1 className="text-3xl font-bold">Agile CMS</h1>
            </div>
            <p className="text-gray-400 text-sm">Manage multiple blogs with ease</p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-3 leading-snug">
                One Dashboard.
                <br />
                Unlimited Blogs.
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Complete Control.
                </span>
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                The lightweight, headless CMS built for managing multiple niche
                blogs with powerful APIs and complete flexibility.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <ShieldCheck className="text-purple-400" size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-0.5">Secure API Access</h3>
                  <p className="text-gray-400 text-xs">
                    Each blog gets unique API keys for authorized access
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="text-blue-400" size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-0.5">Multi-Blog Management</h3>
                  <p className="text-gray-400 text-xs">
                    Manage unlimited niche blogs from one dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-gray-500 text-xs">
            Open Source • Self-Hosted • Developer-First
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center p-6 lg:p-10 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="text-purple-600" size={24} />
              <h1 className="text-xl font-bold">Agile CMS</h1>
            </div>
            <p className="text-gray-600 text-xs">Manage multiple blogs with ease</p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-5 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-xs">Back to home</span>
          </button>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">
                {isLogin ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-gray-600 text-sm">
                {isLogin
                  ? "Sign in to access your dashboard"
                  : "Start managing your blogs today"}
              </p>
            </div>

            {/* Form Components */}
            {isLogin ? (
              <LoginForm />
            ) : (
              <RegisterForm />
            )}

            <div className="mt-5 text-center">
              <p className="text-gray-600 text-xs">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={switchMode}
                  className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
