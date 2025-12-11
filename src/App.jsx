import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyListings from "./pages/MyListings";
import Requests from "./pages/Requests";
import Listings from "./pages/Listings";
import MyOrders from "./pages/MyOrders";
import Home from './pages/Home'

// Placeholder pages (you will create real ones later)
// const Home = () => <div className="page-container"><h1 className="text-3xl font-bold">Home</h1></div>;



function App() {
  return (
    <>
<div className="max-w-7xl mx-auto px-4">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />

        {/* Buyer Routes */}
        <Route path="/listings" element={<Listings />} />
        <Route path="/my-orders" element={<MyOrders />} />

        {/* Supplier Routes */}
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/requests" element={<Requests />} />
      </Routes>

    </div>

    </>
  );
}

export default App;
