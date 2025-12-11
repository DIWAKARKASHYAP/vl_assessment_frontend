import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../global";
import {
  Loader2,
  Package,
  MapPin,
  DollarSign,
  Search,
  Filter,
  AlertCircle,
  Zap,
  Tag,
} from "lucide-react";

import RequestModal from "../components/RequestModal";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [error, setError] = useState("");
  const [selectedListing, setSelectedListing] = useState(null);

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
      console.error(err);
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

  const getCategoryColor = (cat) => {
    switch(cat) {
      case "raw_material":
        return "from-emerald-400 to-teal-500";
      case "service":
        return "from-blue-400 to-cyan-500";
      case "other":
        return "from-purple-400 to-pink-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const getCategoryBg = (cat) => {
    switch(cat) {
      case "raw_material":
        return "bg-emerald-50";
      case "service":
        return "bg-blue-50";
      case "other":
        return "bg-purple-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Header Section */}
      <div className="relative px-6 md:px-16 py-12 bg-gradient-to-r from-blue-100/50 to-cyan-100/50 backdrop-blur-sm border-b border-blue-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Title & Description */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                Browse Listings
              </h1>
              <p className="text-gray-600">Discover products from verified suppliers worldwide</p>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <div className="bg-white/70 backdrop-blur-sm border border-blue-200 rounded-lg px-4 py-3 text-center">
                <p className="text-blue-600 text-sm font-semibold">Total</p>
                <p className="text-2xl font-bold text-gray-900">{listings.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Filter Section */}
          <div className="mb-8 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <label className="font-semibold text-gray-700">Filter by Category:</label>
              </div>
              
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
              >
                <option value="all">All Categories</option>
                <option value="raw_material">Raw Material</option>
                <option value="service">Service</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4 flex gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold">Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-600">Loading listings...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && listings.length === 0 && !error && (
            <div className="bg-white/70 backdrop-blur-sm border border-gray-300 rounded-2xl p-12 text-center hover:shadow-md transition-shadow">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Listings Found</h3>
              <p className="text-gray-600 max-w-sm mx-auto">
                Try adjusting your filters or check back later for new listings from suppliers.
              </p>
            </div>
          )}

          {/* Listings Grid */}
          {!loading && listings.length > 0 && (
            <div>
              <p className="text-gray-700 mb-6 font-medium">
                Showing <span className="text-gray-900 font-bold">{listings.length}</span> listing{listings.length !== 1 ? 's' : ''}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <ListingCard
                    key={listing._id}
                    listing={listing}
                    onRequest={() => setSelectedListing(listing)}
                    categoryColor={getCategoryColor(listing.category)}
                    categoryBg={getCategoryBg(listing.category)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Request Modal */}
      {selectedListing && (
        <RequestModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onSuccess={() => {
            fetchListings(category);
            setSelectedListing(null);
          }}
        />
      )}
    </div>
  );
}

function ListingCard({ listing, onRequest, categoryColor, categoryBg }) {
  return (
    <div className="group relative h-full bg-white border border-gray-200 hover:border-blue-300 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
      
      {/* Hover Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-cyan-50/0 group-hover:from-blue-50/50 group-hover:to-cyan-50/50 transition-all duration-300 pointer-events-none"></div>

      {/* Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-transparent group-hover:from-blue-500 group-hover:via-cyan-500 transition-all"></div>

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${categoryColor} shadow-sm`}>
            {listing.category.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {listing.name}
        </h2>

        {/* Description */}
        {listing.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {listing.description}
          </p>
        )}

        {/* Details Section */}
        <div className="flex-1 space-y-3 mb-5 py-4 border-t border-b border-gray-200">
          
          {/* Quantity */}
          <div className="flex items-start gap-3 bg-emerald-50 rounded-lg p-3 border border-emerald-100">
            <Package className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-emerald-600 text-xs uppercase tracking-wider font-semibold">Available</p>
              <p className="text-gray-900 font-bold text-lg">
                {listing.quantity_available} <span className="text-gray-500 text-sm font-normal">{listing.unit}</span>
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-3 border border-blue-100">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-600 text-xs uppercase tracking-wider font-semibold">Location</p>
              <p className="text-gray-900 font-semibold">{listing.location_country}</p>
            </div>
          </div>

          {/* Pricing */}
          <div className={`flex items-start gap-3 rounded-lg p-3 border ${listing.pricing_mode === "fixed" ? 'bg-cyan-50 border-cyan-100' : 'bg-orange-50 border-orange-100'}`}>
            <DollarSign className={`w-5 h-5 flex-shrink-0 mt-0.5 ${listing.pricing_mode === "fixed" ? 'text-cyan-600' : 'text-orange-600'}`} />
            <div className="flex-1">
              <p className={`text-xs uppercase tracking-wider font-semibold ${listing.pricing_mode === "fixed" ? 'text-cyan-600' : 'text-orange-600'}`}>
                Pricing
              </p>
              {listing.pricing_mode === "fixed" ? (
                <div className="flex items-baseline gap-1 mt-1">
                  <p className="text-gray-900 font-black text-lg">${listing.unit_price}</p>
                  <p className="text-gray-500 text-sm">per {listing.unit}</p>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-2 py-1 bg-white border border-orange-200 rounded mt-1">
                  <Tag className="w-4 h-4 text-orange-500" />
                  <p className="text-orange-700 font-semibold text-sm">Quote on Request</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Request Button */}
        <button
          onClick={onRequest}
          className={`group/btn w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-white ${
            listing.pricing_mode === "fixed"
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          }`}
        >
          <Zap className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
          {listing.pricing_mode === "fixed" ? "Request Purchase" : "Request Quote"}
        </button>
      </div>
    </div>
  );
}