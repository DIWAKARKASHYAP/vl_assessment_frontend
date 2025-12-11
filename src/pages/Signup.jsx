import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

      if (data.user.role === "supplier") navigate("/my-listings");
      else navigate("/listings");

    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8 md:p-10 border border-gray-200">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6">
          Create an Account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              className="w-full border border-gray-300 focus:border-sky-500 focus:ring-sky-500 p-3 rounded-lg shadow-sm transition-all"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 focus:border-sky-500 focus:ring-sky-500 p-3 rounded-lg shadow-sm transition-all"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 focus:border-sky-500 focus:ring-sky-500 p-3 rounded-lg shadow-sm transition-all"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Company */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Company Name</label>
            <input
              type="text"
              name="company_name"
              className="w-full border border-gray-300 focus:border-sky-500 focus:ring-sky-500 p-3 rounded-lg shadow-sm transition-all"
              value={form.company_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Select */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Account Type</label>
            <select
              name="role"
              className="w-full border border-gray-300 focus:border-sky-500 focus:ring-sky-500 p-3 rounded-lg shadow-sm transition-all bg-white"
              value={form.role}
              onChange={handleChange}
            >
              <option value="buyer">Buyer</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg shadow-md transition-all disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>
      </div>
    </div>
  );
}
