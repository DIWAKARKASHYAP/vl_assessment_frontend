import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Package, FileText, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setLoggedIn(true);
      const user = JSON.parse(storedUser);
      setRole(user.role);
      setUsername(user.username || user.company_name || "User");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";

  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) => `
    flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300
    ${isActive(path)
      ? "bg-blue-100 text-blue-600"
      : "text-gray-700 hover:bg-gray-100"
    }
  `;

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
            onClick={closeMobileMenu}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900">B2B</h1>
              <p className="text-xs text-gray-600 -mt-1">Marketplace</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            {!loggedIn && (
              <div className="flex gap-2">
                <Link 
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            )}

            {loggedIn && role === "supplier" && (
              <div className="flex gap-2">
                <Link 
                  to="/my-listings"
                  className={navLinkClass("/my-listings")}
                >
                  <Package className="w-4 h-4" />
                  My Listings
                </Link>
                <Link 
                  to="/requests"
                  className={navLinkClass("/requests")}
                >
                  <FileText className="w-4 h-4" />
                  Requests
                </Link>
              </div>
            )}

            {loggedIn && role === "buyer" && (
              <div className="flex gap-2">
                <Link 
                  to="/listings"
                  className={navLinkClass("/listings")}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Browse
                </Link>
                <Link 
                  to="/my-orders"
                  className={navLinkClass("/my-orders")}
                >
                  <FileText className="w-4 h-4" />
                  My Orders
                </Link>
              </div>
            )}

            {loggedIn && (
              <>
                <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600">Welcome,</p>
                  <p className="text-sm font-bold text-gray-900 capitalize">{username}</p>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-2 max-w-7xl mx-auto">
          
          {/* User Info */}
          {loggedIn && (
            <div className="px-4 py-3 bg-blue-50 rounded-lg border border-blue-200 mb-4">
              <p className="text-sm text-gray-600">Logged in as</p>
              <p className="text-sm font-bold text-gray-900 capitalize">{username}</p>
            </div>
          )}

          {/* Auth Links */}
          {!loggedIn && (
            <div className="space-y-2">
              <Link 
                to="/login"
                onClick={closeMobileMenu}
                className="block w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={closeMobileMenu}
                className="block w-full px-4 py-2 text-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Supplier Links */}
          {loggedIn && role === "supplier" && (
            <div className="space-y-2">
              <Link 
                to="/my-listings"
                onClick={closeMobileMenu}
                className={navLinkClass("/my-listings") + " w-full justify-start"}
              >
                <Package className="w-4 h-4" />
                My Listings
              </Link>
              <Link 
                to="/requests"
                onClick={closeMobileMenu}
                className={navLinkClass("/requests") + " w-full justify-start"}
              >
                <FileText className="w-4 h-4" />
                Requests
              </Link>
            </div>
          )}

          {/* Buyer Links */}
          {loggedIn && role === "buyer" && (
            <div className="space-y-2">
              <Link 
                to="/listings"
                onClick={closeMobileMenu}
                className={navLinkClass("/listings") + " w-full justify-start"}
              >
                <ShoppingCart className="w-4 h-4" />
                Browse Listings
              </Link>
              <Link 
                to="/my-orders"
                onClick={closeMobileMenu}
                className={navLinkClass("/my-orders") + " w-full justify-start"}
              >
                <FileText className="w-4 h-4" />
                My Orders
              </Link>
            </div>
          )}

          {/* Logout */}
          {loggedIn && (
            <button
              onClick={() => {
                logout();
                closeMobileMenu();
              }}
              className="w-full flex items-center justify-start gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}