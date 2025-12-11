import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { BACKEND_URL } from "../../global";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid login credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role and refresh to update navbar
      if (data.user.role === "supplier") {
        window.location.href = "/my-listings";
      } else {
        window.location.href = "/listings";
      }
      
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-10">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8 md:p-10">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 justify-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900">B2B</h2>
              <p className="text-xs text-gray-600 -mt-1">Marketplace</p>
            </div>
          </Link>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold text-sm">Login Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-gray-50 focus:bg-white"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-gray-50 focus:bg-white"
                  value={form.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 active:from-blue-700 active:to-cyan-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-gray-600 text-sm font-medium">New user?</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Signup Link */}
          <Link
            to="/signup"
            className="w-full block text-center px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            Create an Account
          </Link>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-6">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}