import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Building2, Users, Loader2, AlertCircle } from "lucide-react";
import { BACKEND_URL } from "../../global";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    company_name: "",
    role: "buyer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "supplier") window.location.href = "/my-listings"
      else  window.location.href = "/listings";

    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-10">

      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative w-full max-w-lg">

        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8 md:p-10">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 justify-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900">B2B</h2>
              <p className="text-xs text-gray-600 -mt-1">Marketplace</p>
            </div>
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-6">
            Create an Account
          </h1>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold text-sm">Signup Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-gray-50 focus:bg-white"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
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
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-gray-50 focus:bg-white"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="company_name"
                  placeholder="Your company name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-gray-50 focus:bg-white"
                  value={form.company_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Role Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Account Type</label>
              <div className="relative">
                <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <select
                  name="role"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="buyer">Buyer</option>
                  <option value="supplier">Supplier</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 active:from-blue-700 active:to-cyan-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-gray-600 text-sm font-medium">Already have an account?</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Login Link */}
          <Link
            to="/login"
            className="w-full block text-center px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
