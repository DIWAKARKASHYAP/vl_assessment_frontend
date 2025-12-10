import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../global";
import { CheckCircle, XCircle, Mail, Package, User, Loader2 } from "lucide-react";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch incoming requests
  const fetchIncomingRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/requests/incoming`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setRequests(data.requests || []);
    } catch (err) {
      setError("Failed to load requests.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIncomingRequests();
  }, []);

  // Accept or Reject
  const updateStatus = async (requestId, status) => {
    setActionLoading(requestId);

    try {
      const res = await fetch(
        `${BACKEND_URL}/requests/${requestId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update status");
        setActionLoading(null);
        return;
      }

      // Refresh list
      fetchIncomingRequests();
    } catch (err) {
      alert("Something went wrong");
    }

    setActionLoading(null);
  };

  if (loading) {
    return (
      <div className="page-container flex justify-center py-20">
        <Loader2 className="animate-spin w-10 h-10 text-sky-600" />
      </div>
    );
  }

  return (
    <div className="page-container max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Incoming Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-600 mt-10 text-center">
          No incoming requests yet.
        </p>
      ) : (
        <div className="space-y-5">
          {requests.map((req) => (
            <div
              key={req._id}
              className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {req.listing_id.name}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    req.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : req.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {req.status}
                </span>
              </div>

              {/* Request Info */}
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">

                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-sky-600" />
                  <p>
                    <strong>Quantity:</strong> {req.requested_quantity}{" "}
                    {req.listing_id.unit}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-sky-600" />
                  <p>
                    <strong>Buyer:</strong> {req.buyer_id.username} (
                    {req.buyer_id.company_name})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-sky-600" />
                  <p>{req.buyer_id.email}</p>
                </div>

                {req.message && (
                  <p className="col-span-2 text-gray-600 mt-2">
                    <strong>Message:</strong> {req.message}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              {req.status === "pending" && (
                <div className="flex gap-3 mt-5">

                  {/* Accept */}
                  <button
                    onClick={() => updateStatus(req._id, "accepted")}
                    disabled={actionLoading === req._id}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === req._id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <CheckCircle className="w-5 h-5" />
                    )}
                    Accept
                  </button>

                  {/* Reject */}
                  <button
                    onClick={() => updateStatus(req._id, "rejected")}
                    disabled={actionLoading === req._id}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === req._id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    Reject
                  </button>

                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
