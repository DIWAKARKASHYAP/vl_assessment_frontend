import { useState, useEffect } from "react";
import { Plus, Package, TrendingUp, AlertCircle, Loader } from "lucide-react";
import CreateListingModal from "../components/CreateListingModal";
import ListingCard from "../components/ListingCard";
import { BACKEND_URL } from "../../global";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [editingListing, setEditingListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const token = localStorage.getItem("token");

  const fetchMyListings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${BACKEND_URL}/listings/my-listings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch listings");

      const data = await res.json();
      setListings(data.listings || []);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  const handleListingCreated = () => {
    setShowCreateModal(false);
    fetchMyListings();
  };

  const handleEditClose = () => {
    setEditingListing(null);
  };

  const activeListings = listings.filter(l => l.status !== 'inactive')?.length || 0;
  const totalListings = listings.length;

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
                My Listings
              </h1>
              <p className="text-gray-600">Manage and track all your product listings</p>
            </div>

            {/* Create Button */}

          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/70 backdrop-blur-sm border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{totalListings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{activeListings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-cyan-200 rounded-lg p-4 md:col-span-2 hover:shadow-md transition-shadow">
              <p className="text-gray-600 text-sm mb-2">Recent Activity</p>
              <p className="text-gray-600 text-sm">Keep your listings updated to attract more buyers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Create/Edit Modal */}
<div className="flex justify-end mb-4">          
          {(showCreateModal || editingListing) && (
            <CreateListingModal
            onCreated={handleListingCreated}
            initialData={editingListing}
              onClose={handleEditClose}
            />
          )}
            </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-600">Loading your listings...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4 flex gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-semibold">Error loading listings</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && listings.length === 0 && !error && (
            <div className="bg-white/70 backdrop-blur-sm border border-gray-300 rounded-2xl p-12 text-center hover:shadow-md transition-shadow">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Listings Yet</h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                Create your first product listing to start connecting with buyers and growing your business.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Your First Listing
              </button>
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
                    onEdit={(listing) => setEditingListing(listing)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}