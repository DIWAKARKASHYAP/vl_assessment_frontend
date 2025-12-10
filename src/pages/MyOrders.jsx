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
    } catch (err) {
      setError("Could not fetch your requests. Try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  // Status color style
  const statusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      accepted: "bg-green-100 text-green-700 border-green-300",
      rejected: "bg-red-100 text-red-700 border-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  return (
    <div className="page-container max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Requests</h1>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-sky-600 animate-spin" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center py-10 text-red-600 font-medium">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && requests.length === 0 && !error && (
        <div className="flex flex-col items-center py-20 text-gray-500">
          <HelpCircle className="h-16 w-16 mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold">No Requests Found</h3>
          <p className="text-gray-500 mt-1">
            You haven’t requested any purchases or quotes yet.
          </p>
        </div>
      )}

      {/* Requests List */}
      {!loading && requests.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
            >
              {/* Header */}
              <h2 className="text-xl font-semibold">
                {req.listing_id?.name}
              </h2>
              <p className="text-gray-500 text-sm capitalize">
                {req.listing_id?.category}
              </p>

              {/* Status */}
              <span
                className={`inline-block mt-3 px-3 py-1 text-sm font-medium border rounded-full ${statusBadge(
                  req.status
                )}`}
              >
                {req.status.toUpperCase()}
              </span>

              {/* Details */}
              <div className="mt-4 space-y-2 text-gray-700 text-sm">
                <p className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-sky-600" />
                  <strong>Requested:</strong> {req.requested_quantity}{" "}
                  {req.listing_id?.unit}
                </p>

                <p className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-sky-600" />
                  <strong>Supplier:</strong>{" "}
                  {req.supplier_id?.company_name || "Unknown"}
                </p>

                {req.listing_id?.unit_price && (
                  <p className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-sky-600" />
                    <strong>Unit Price:</strong> ${req.listing_id.unit_price}
                  </p>
                )}

                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  <strong>Location:</strong>{" "}
                  {req.listing_id?.location_country || "N/A"}
                </p>

                {/* Message */}
                {req.message && (
                  <p className="mt-2 text-gray-600 italic">
                    “{req.message}”
                  </p>
                )}

                <p className="text-gray-400 text-xs mt-2">
                  Requested on{" "}
                  {new Date(req.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
