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
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-sky-600">B2B Marketplace</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-gray-700 font-medium">

        {!loggedIn && (
          <>
            <Link to="/login" className="hover:text-sky-600">Login</Link>
            <Link to="/signup" className="hover:text-sky-600">Signup</Link>
          </>
        )}

        {loggedIn && role === "supplier" && (
          <>
            <Link to="/my-listings" className="hover:text-sky-600">My Listings</Link>
            <Link to="/requests" className="hover:text-sky-600">Requests</Link>
          </>
        )}

        {loggedIn && role === "buyer" && (
          <>
            <Link to="/listings" className="hover:text-sky-600">Listings</Link>
            <Link to="/my-orders" className="hover:text-sky-600">My Orders</Link>
          </>
        )}

        {loggedIn && (
          <button
            onClick={logout}
            className="text-red-500 font-semibold hover:text-red-700"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-3xl">☰</span>
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 gap-4 md:hidden">

          {!loggedIn && (
            <>
              <Link to="/login" className="hover:text-sky-600">Login</Link>
              <Link to="/signup" className="hover:text-sky-600">Signup</Link>
            </>
          )}

          {loggedIn && role === "supplier" && (
            <>
              <Link to="/my-listings" className="hover:text-sky-600">My Listings</Link>
              <Link to="/requests" className="hover:text-sky-600">Requests</Link>
            </>
          )}

          {loggedIn && role === "buyer" && (
            <>
              <Link to="/listings" className="hover:text-sky-600">Listings</Link>
              <Link to="/my-orders" className="hover:text-sky-600">My Orders</Link>
            </>
          )}

          {loggedIn && (
            <button
              onClick={logout}
              className="text-red-500 font-semibold hover:text-red-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
