import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../global";
import {
  Loader2,
  Package,
  MapPin,
  Building2,
  HelpCircle,
  ClipboardList,
} from "lucide-react";

export default function MyOrders() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchMyRequests = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BACKEND_URL}/requests/my-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load requests");
        return;
      }

      setRequests(data.requests || []);
    } catch {
      setError("Could not fetch your requests. Try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  // Badge Styling
  const statusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      accepted: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Header Section */}
      <div className="relative px-6 md:px-16 py-12 bg-gradient-to-r from-blue-100/60 to-cyan-100/60 backdrop-blur-sm border-b border-blue-200/50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900">
            My Requests
          </h1>
          <p className="text-gray-600 mt-2">View and track all your purchase & quote requests</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center py-20">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-3" />
              <p className="text-gray-600">Loading your requests...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="bg-red-50 border border-red-300 p-4 rounded-xl text-red-700 text-center font-semibold max-w-lg mx-auto">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && requests.length === 0 && !error && (
            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-bold text-gray-900">No Requests Yet</h3>
              <p className="text-gray-600 mt-2">You haven’t requested any purchases or quotes.</p>
            </div>
          )}

          {/* Requests List */}
          {!loading && requests.length > 0 && (
            <div>
              <p className="text-gray-700 mb-6 font-medium">
                Showing <span className="font-bold text-gray-900">{requests.length}</span>{" "}
                request{requests.length !== 1 ? "s" : ""}
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6"
                >
                  {/* Header */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {req.listing_id?.name}
                    </h2>
                    <p className="text-gray-500 text-sm capitalize">
                      {req.listing_id?.category}
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={`inline-block mt-4 px-3 py-1 text-sm font-medium border rounded-full ${statusBadge(
                      req.status
                    )}`}
                  >
                    {req.status.toUpperCase()}
                  </span>

                  {/* Details */}
                  <div className="mt-5 space-y-3 text-gray-700 text-sm">

                    {/* Quantity */}
                    <p className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      <strong>Requested:</strong> {req.requested_quantity}{" "}
                      {req.listing_id?.unit}
                    </p>

                    {/* Supplier */}
                    <p className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <strong>Supplier:</strong>{" "}
                      {req.supplier_id?.company_name || "Unknown"}
                    </p>

                    {/* Price */}
                    {req.listing_id?.unit_price && (
                      <p className="flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-blue-600" />
                        <strong>Unit Price:</strong> ${req.listing_id.unit_price}
                      </p>
                    )}

                    {/* Location */}
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <strong>Location:</strong>{" "}
                      {req.listing_id?.location_country || "N/A"}
                    </p>

                    {/* Message */}
                    {req.message && (
                      <p className="mt-2 text-gray-600 italic">
                        “{req.message}”
                      </p>
                    )}

                    <p className="text-gray-400 text-xs mt-3">
                      Requested on {new Date(req.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
