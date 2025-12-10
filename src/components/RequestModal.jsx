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

  if (!listing) return null; // Modal not open

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
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-sky-50">
          <h2 className="text-2xl font-semibold">
            {listing.pricing_mode === "fixed" ? "Request Purchase" : "Request Quote"}
          </h2>
          <button onClick={onClose} className="hover:bg-gray-200 p-2 rounded">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">

          {/* Listing Summary */}
          <div className="bg-gray-50 border rounded-lg p-4 text-sm">
            <p><strong>Item:</strong> {listing.name}</p>
            <p><strong>Category:</strong> {listing.category}</p>
            <p><strong>Available:</strong> {listing.quantity_available} {listing.unit}</p>
            <p><strong>Location:</strong> {listing.location_country}</p>
            <p>
              <strong>Pricing:</strong>{" "}
              {listing.pricing_mode === "fixed"
                ? `$${listing.unit_price}`
                : "RFQ Only"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded flex gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Quantity Field */}
          <div>
            <label className="block font-medium mb-1">Requested Quantity</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block font-medium mb-1">Message (optional)</label>
            <textarea
              rows="3"
              className="w-full border p-2 rounded resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                listing.pricing_mode === "fixed"
                  ? "Add delivery notes, instructions..."
                  : "Describe what you need, frequency, specifications..."
              }
            />
          </div>

          {/* Fixed-price total */}
          {listing.pricing_mode === "fixed" && quantity && (
            <div className="bg-blue-50 border border-blue-200 p-3 rounded text-blue-700">
              <strong>Total: </strong>${(listing.unit_price * quantity).toFixed(2)}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={submitRequest}
              disabled={loading}
              className="flex-1 bg-sky-600 hover:bg-sky-700 text-white py-2.5 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>

            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2.5 rounded-lg font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {success && (
        <div className="absolute bg-black/60 inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl text-center shadow-xl max-w-xs">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Check className="w-9 h-9 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Request Sent!</h3>
            <p className="text-gray-600 mt-1">
              The supplier will review your request shortly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
