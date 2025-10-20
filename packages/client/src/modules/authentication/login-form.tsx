import { FormEvent } from "react";
import { useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/auth/login";
import useAuth from "@/zustand/authStore";

interface LoginErrors {
  email?: string;
  password?: string;
}

const LoginForm: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e: FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    setLoginErrors({});
    setError("");

    const errors: LoginErrors = {};
    if (!loginEmail) errors.email = "Email or username is required";
    else if (!validateEmail(loginEmail) && loginEmail.length < 2)
      errors.email = "Please enter a valid email or username";
    if (!loginPassword) errors.password = "Password is required";
    else if (loginPassword.length < 6)
      errors.password = "Password must be at least 6 characters";

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const response = await login(loginEmail, loginPassword);
      
      if (response.status === 200) {
        useAuth.setState({
          isAuthenticated: true,
          user: {
            id: "1",
            name: "Smruti Ranjan",
            email: loginEmail
          }
        })
      }

      navigate("/dashboard");
    } catch (err: any) {
      console.error("❌ Login failed:", err);
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 text-sm">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle
            className="text-red-600 flex-shrink-0 mt-0.5"
            size={16}
          />
          <p className="text-red-600 text-xs">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-gray-700 font-medium mb-1">Email or Username</label>
        <input
          type="text"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          placeholder="Enter email or username"
          className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        {loginErrors.email && <p className="text-red-600 text-xs mt-1">{loginErrors.email}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {loginErrors.password && <p className="text-red-600 text-xs mt-1">{loginErrors.password}</p>}
      </div>

      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span className="text-gray-600">Remember me</span>
        </label>
        <button
          type="button"
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Forgot password?
        </button>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full h-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/30 disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign in"
        )}
      </button>
    </div>
  )
};

export default LoginForm;
