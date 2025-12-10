import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../global";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid login");
        setLoading(false);
        return;
      }

      // Save token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === "supplier") navigate("/my-listings");
      else navigate("/listings");

    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="page-container max-w-md mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="page-card space-y-4"
      >
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded text-center">
            {error}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2 rounded mt-1"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border p-2 rounded mt-1"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
