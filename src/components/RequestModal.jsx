import { useState } from "react";
import { X, Check, AlertCircle } from "lucide-react";
import { BACKEND_URL } from "../../global";

export default function RequestModal({ listing, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  if (!listing) return null;

  const submitRequest = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BACKEND_URL}/requests`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listing_id: listing._id,
          requested_quantity: Number(quantity),
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to submit request.");
        setLoading(false);
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        onSuccess && onSuccess();
        onClose();
      }, 1400);
    } catch {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">

        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {listing.pricing_mode === "fixed" ? "Request Purchase" : "Request Quote"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 transition"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Listing Summary */}
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Listing Summary</h3>
            <p className="text-gray-600"><strong className="text-gray-800">Item:</strong> {listing.name}</p>
            <p className="text-gray-600"><strong className="text-gray-800">Category:</strong> {listing.category}</p>
            <p className="text-gray-600"><strong className="text-gray-800">Available:</strong> {listing.quantity_available} {listing.unit}</p>
            <p className="text-gray-600"><strong className="text-gray-800">Location:</strong> {listing.location_country}</p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Pricing:</strong>{" "}
              {listing.pricing_mode === "fixed" ? `$${listing.unit_price}` : "RFQ Only"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 rounded-lg p-4 flex items-start gap-3 shadow-sm">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Requested Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Requested Quantity
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message (optional)
            </label>
            <textarea
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                listing.pricing_mode === "fixed"
                  ? "Add delivery notes or instructions..."
                  : "Describe quantity, specs, frequency, etc..."
              }
            />
          </div>

          {/* Total Amount */}
          {listing.pricing_mode === "fixed" && quantity && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-lg p-4 font-medium shadow-sm">
              <strong>Total:</strong> ${Number(listing.unit_price * quantity).toFixed(2)}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2 border-t">
            <button
              onClick={submitRequest}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 
                         hover:from-blue-600 hover:to-cyan-600 text-white 
                         font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>

            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 py-3 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {success && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-xs animate-fadeIn">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Check className="w-10 h-10 text-green-600" />
            </div>

            <h3 className="text-xl font-bold text-gray-800">Request Sent!</h3>
            <p className="text-gray-600 mt-1">The supplier will review soon.</p>
          </div>
        </div>
      )}
    </div>
  );
}
