import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setLoggedIn(true);
      const user = JSON.parse(storedUser);
      setRole(user.role);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-lg px-6 md:px-12 py-4 sticky top-0 z-50 flex items-center justify-between">

      {/* Logo */}
      <h1 className="text-3xl font-extrabold text-sky-600 tracking-wide cursor-pointer">
        B2B<span className="text-gray-800">Market</span>
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 text-gray-700 font-medium items-center">

        {!loggedIn && (
          <>
            <Link className="hover:text-sky-600 transition-all" to="/login">
              Login
            </Link>
            <Link
              className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 shadow-md transition-all"
              to="/signup"
            >
              Signup
            </Link>
          </>
        )}

        {loggedIn && role === "supplier" && (
          <>
            <Link className="hover:text-sky-600 transition-all" to="/my-listings">
              My Listings
            </Link>
            <Link className="hover:text-sky-600 transition-all" to="/requests">
              Requests
            </Link>
          </>
        )}

        {loggedIn && role === "buyer" && (
          <>
            <Link className="hover:text-sky-600 transition-all" to="/listings">
              Listings
            </Link>
            <Link className="hover:text-sky-600 transition-all" to="/my-orders">
              My Orders
            </Link>
          </>
        )}

        {loggedIn && (
          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-lg text-red-500 font-semibold hover:bg-red-100 transition-all"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden text-3xl text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-xl py-6 flex flex-col items-center gap-4 md:hidden animate-slideDown">

          {!loggedIn && (
            <>
              <Link className="hover:text-sky-600 transition-all" to="/login">
                Login
              </Link>

              <Link
                className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 shadow-md transition-all"
                to="/signup"
              >
                Signup
              </Link>
            </>
          )}

          {loggedIn && role === "supplier" && (
            <>
              <Link className="hover:text-sky-600 transition-all" to="/my-listings">
                My Listings
              </Link>

              <Link className="hover:text-sky-600 transition-all" to="/requests">
                Requests
              </Link>
            </>
          )}

          {loggedIn && role === "buyer" && (
            <>
              <Link className="hover:text-sky-600 transition-all" to="/listings">
                Listings
              </Link>

              <Link className="hover:text-sky-600 transition-all" to="/my-orders">
                My Orders
              </Link>
            </>
          )}

          {loggedIn && (
            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-lg text-red-500 font-semibold hover:bg-red-100 transition-all"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
