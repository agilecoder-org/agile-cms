import { FormEvent, useState } from "react";
import {
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@/services/auth/register";

interface RegisterErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const RegisterForm: React.FC = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [registerErrors, setRegisterErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async (e: FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    setRegisterErrors({});
    setError("");

    const errors: RegisterErrors = {};
    if (!registerUsername) errors.username = "Username is required";
    else if (registerUsername.length < 2)
      errors.username = "Username must be at least 2 characters";
    if (!registerEmail) errors.email = "Email is required";
    else if (!validateEmail(registerEmail))
      errors.email = "Please enter a valid email";
    if (!registerPassword) errors.password = "Password is required";
    else if (registerPassword.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!registerConfirmPassword)
      errors.confirmPassword = "Please confirm your password";
    else if (registerPassword !== registerConfirmPassword)
      errors.confirmPassword = "Passwords don't match";
    if (!agreeTerms) errors.terms = "You must agree to the terms";

    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }

    try {
      setLoading(true);
      const response = await register(registerEmail, registerPassword, registerUsername);
      if (response.data?.status === "success") {
        setError(""); // clear error
        alert("Registration successful! You can now log in."); // or redirect
        navigate("/auth?form=login");
      } else {
        setError("Registration failed. Please try again later.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again later.");
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
        <label className="block text-gray-700 font-medium mb-1">Username</label>
        <input
          type="text"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
          placeholder="johndoe"
          className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        {registerErrors.username && <p className="text-red-600 text-xs mt-1">{registerErrors.username}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        {registerErrors.email && <p className="text-red-600 text-xs mt-1">{registerErrors.email}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            placeholder="Create a strong password"
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
        {registerErrors.password && <p className="text-red-600 text-xs mt-1">{registerErrors.password}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={registerConfirmPassword}
            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {registerErrors.confirmPassword && (
          <p className="text-red-600 text-xs mt-1">{registerErrors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2 cursor-pointer text-xs leading-snug">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-0.5"
          />
          <span className="text-gray-600">
            I agree to the{" "}
            <Link
              to="/terms-of-service"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Privacy Policy
            </Link>
          </span>
        </label>
        {registerErrors.terms && <p className="text-red-600 text-xs mt-1">{registerErrors.terms}</p>}
      </div>

      <button
        onClick={handleRegister}
        disabled={loading}
        className="w-full h-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/30 disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Creating...</span>
          </div>
        ) : (
          "Create account"
        )}
      </button>
    </div>
  )
};

export default RegisterForm;