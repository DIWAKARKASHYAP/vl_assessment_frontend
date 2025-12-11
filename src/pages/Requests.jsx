import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../global";
import { CheckCircle, XCircle, Mail, Package, User, Loader2, Clock, AlertCircle, Inbox } from "lucide-react";

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

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 border-amber-200 text-amber-800";
      case "accepted":
        return "bg-emerald-50 border-emerald-200 text-emerald-800";
      case "rejected":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "accepted":
        return "bg-emerald-100 text-emerald-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const pendingRequests = requests.filter(r => r.status === "pending");
  const completedRequests = requests.filter(r => r.status !== "pending");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="animate-spin w-12 h-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading requests...</p>
        </div>
      </div>
    );
  }

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
                Incoming Requests
              </h1>
              <p className="text-gray-600">Review and manage buyer purchase requests</p>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <div className="bg-white/70 backdrop-blur-sm border border-amber-200 rounded-lg px-4 py-3 text-center">
                <p className="text-amber-600 text-sm font-semibold">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingRequests.length}</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg px-4 py-3 text-center">
                <p className="text-emerald-600 text-sm font-semibold">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedRequests.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4 flex gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-semibold">Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {requests.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-sm border border-gray-300 rounded-2xl p-12 text-center hover:shadow-md transition-shadow">
              <Inbox className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Requests Yet</h3>
              <p className="text-gray-600 max-w-sm mx-auto">
                You don't have any incoming purchase requests at the moment. Your listings will start receiving requests from buyers soon.
              </p>
            </div>
          ) : (
            <div>
              {/* Pending Requests Section */}
              {pendingRequests.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-6 h-6 text-amber-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Pending ({pendingRequests.length})</h2>
                  </div>
                  <div className="space-y-4">
                    {pendingRequests.map((req) => (
                      <RequestCard
                        key={req._id}
                        req={req}
                        onAction={updateStatus}
                        actionLoading={actionLoading}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Requests Section */}
              {completedRequests.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Completed ({completedRequests.length})</h2>
                  </div>
                  <div className="space-y-4">
                    {completedRequests.map((req) => (
                      <RequestCard
                        key={req._id}
                        req={req}
                        onAction={updateStatus}
                        actionLoading={actionLoading}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RequestCard({ req, onAction, actionLoading }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 border-amber-200";
      case "accepted":
        return "bg-emerald-50 border-emerald-200";
      case "rejected":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "accepted":
        return "bg-emerald-100 text-emerald-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`group relative border rounded-xl p-6 transition-all duration-300 hover:shadow-md ${getStatusColor(req.status)}`}
    >
      {/* Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-transparent rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 pb-4 border-b border-gray-200/50">
        <h2 className="text-xl font-bold text-gray-900">
          {req.listing_id.name}
        </h2>

        <span
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold w-fit ${getStatusBadgeColor(req.status)}`}
        >
          {getStatusIcon(req.status)}
          {req.status}
        </span>
      </div>

      {/* Request Info Grid */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">

        {/* Quantity */}
        <div className="flex items-start gap-3 bg-white/50 rounded-lg p-3 border border-gray-200/50">
          <Package className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-gray-600 text-xs uppercase tracking-wider font-semibold">Requested Quantity</p>
            <p className="text-gray-900 font-bold text-lg">
              {req.requested_quantity} <span className="text-gray-500 text-sm font-normal">{req.listing_id.unit}</span>
            </p>
          </div>
        </div>

        {/* Buyer */}
        <div className="flex items-start gap-3 bg-white/50 rounded-lg p-3 border border-gray-200/50">
          <User className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-gray-600 text-xs uppercase tracking-wider font-semibold">Buyer</p>
            <p className="text-gray-900 font-semibold">{req.buyer_id.username}</p>
            <p className="text-gray-600 text-sm">{req.buyer_id.company_name}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3 bg-white/50 rounded-lg p-3 border border-gray-200/50 md:col-span-2">
          <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-gray-600 text-xs uppercase tracking-wider font-semibold">Email</p>
            <p className="text-gray-900 font-semibold break-all">{req.buyer_id.email}</p>
          </div>
        </div>
      </div>

      {/* Message */}
      {req.message && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5">
          <p className="text-gray-600 text-xs uppercase tracking-wider font-semibold mb-2">Buyer Message</p>
          <p className="text-gray-800">{req.message}</p>
        </div>
      )}

      {/* Action Buttons */}
      {req.status === "pending" && (
        <div className="flex gap-3 pt-4 border-t border-gray-200/50">
          {/* Accept */}
          <button
            onClick={() => onAction(req._id, "accepted")}
            disabled={actionLoading === req._id}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:from-emerald-700 active:to-emerald-800 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
            onClick={() => onAction(req._id, "rejected")}
            disabled={actionLoading === req._id}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}