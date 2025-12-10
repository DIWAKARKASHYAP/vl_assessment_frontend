import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../global";
import {
  Loader2,
  Package,
  MapPin,
  DollarSign,
  HelpCircle,
} from "lucide-react";

import RequestModal from "../components/RequestModal"; // ⬅️ IMPORTANT

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [error, setError] = useState("");

  const [selectedListing, setSelectedListing] = useState(null); // Modal control

  const token = localStorage.getItem("token");

  const fetchListings = async (selectedCategory = "all") => {
    setLoading(true);
    setError("");

    let url = `${BACKEND_URL}/listings`;
    if (selectedCategory !== "all") {
      url += `?category=${selectedCategory}`;
    }

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load listings.");
        return;
      }

      setListings(data.listings || []);
    } catch (err) {
      setError("Failed to load listings.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleCategoryChange = (value) => {
    setCategory(value);
    fetchListings(value);
  };

  return (
    <div className="page-container max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Available Listings</h1>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="font-medium text-gray-700">Filter by Category:</label>
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="ml-3 px-4 py-2 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
        >
          <option value="all">All</option>
          <option value="raw_material">Raw Material</option>
          <option value="service">Service</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-sky-600 animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-10 text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* No Data State */}
      {!loading && listings.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <HelpCircle className="h-16 w-16 mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold">No Listings Found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your filters.</p>
        </div>
      )}

      {/* Listings Grid */}
      {!loading && listings.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{listing.name}</h2>
              <p className="text-gray-500 text-sm capitalize mt-1">
                {listing.category}
              </p>

              <div className="mt-4 space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-sky-600" />
                  <strong>Available:</strong> {listing.quantity_available}{" "}
                  {listing.unit}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  <strong>Location:</strong> {listing.location_country}
                </p>

                <p className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-sky-600" />
                  <strong>Pricing:</strong>{" "}
                  {listing.pricing_mode === "fixed"
                    ? `$${listing.unit_price}`
                    : "RFQ Only"}
                </p>
              </div>

              {/* Open Request Modal */}
              <div className="mt-5">
                <button
                  onClick={() => setSelectedListing(listing)}
                  className={`w-full py-2 rounded-md font-semibold text-white ${
                    listing.pricing_mode === "fixed"
                      ? "bg-sky-600 hover:bg-sky-700"
                      : "bg-amber-600 hover:bg-amber-700"
                  }`}
                >
                  {listing.pricing_mode === "fixed"
                    ? "Request Purchase"
                    : "Request Quote"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Request Modal */}
      {selectedListing && (
        <RequestModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onSuccess={() => fetchListings()}
        />
      )}
    </div>
  );
}
