import { useState, useEffect } from "react";
import { X, Check, AlertCircle } from "lucide-react";
import { BACKEND_URL } from "../../global";

export default function CreateListingModal({ onCreated, initialData, onClose }) {
  const isEditing = Boolean(initialData);

  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    category: "raw_material",
    name: "",
    description: "",
    quantity_available: "",
    unit: "kg",
    location_country: "",
    pricing_mode: "fixed",
    unit_price: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("token");

  // 👉 Load form values when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        category: initialData.category,
        name: initialData.name,
        description: initialData.description,
        quantity_available: initialData.quantity_available,
        unit: initialData.unit,
        location_country: initialData.location_country,
        pricing_mode: initialData.pricing_mode,
        unit_price: initialData.unit_price || "",
      });

      setIsOpen(true);
      setSuccess(false);
      setError("");
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const resetForm = () => {
    setForm({
      category: "raw_material",
      name: "",
      description: "",
      quantity_available: "",
      unit: "kg",
      location_country: "",
      pricing_mode: "fixed",
      unit_price: "",
    });
    setError("");
    setSuccess(false);
  };

  const closeModal = () => {
    resetForm();
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isEditing
      ? `${BACKEND_URL}/listings/${initialData._id}`
      : `${BACKEND_URL}/listings`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to save listing");
        setLoading(false);
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        if (onCreated) onCreated();
        closeModal();
      }, 1200);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Create Listing button only for creating (not editing) */}
      {!isEditing && (
        <button
          onClick={() => {
            setIsOpen(true);
            resetForm();
          }}
          className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md transition-all duration-200"
        >
          + Create New Listing
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          
          {/* SUCCESS MESSAGE */}
          {success ? (
            <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-sm">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {isEditing ? "Listing Updated!" : "Listing Created!"}
              </h3>
              <p className="text-gray-600 mb-6">
                {isEditing
                  ? "Your listing has been successfully updated."
                  : "Your listing is now live."}
              </p>
              <button
                onClick={closeModal}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2.5 rounded-lg font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            /* FORM MODAL */
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-sky-50 to-blue-50 p-6 border-b flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">
                  {isEditing ? "Edit Listing" : "Create Listing"}
                </h2>

                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="mx-6 mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="raw_material">Raw Material</option>
                    <option value="service">Service</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product/Service Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500 resize-none"
                    required
                  />
                </div>

                {/* Quantity + Unit */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantity Available
                    </label>
                    <input
                      type="number"
                      name="quantity_available"
                      value={form.quantity_available}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Unit
                    </label>
                    <select
                      name="unit"
                      value={form.unit}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="kg">kg</option>
                      <option value="ton">ton</option>
                      <option value="litre">litre</option>
                      <option value="piece">piece</option>
                      <option value="meter">meter</option>
                    </select>
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location Country
                  </label>
                  <input
                    type="text"
                    name="location_country"
                    value={form.location_country}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                {/* Pricing Mode */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Pricing Mode
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                        form.pricing_mode === "fixed"
                          ? "bg-sky-50 border-sky-400"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="pricing_mode"
                        value="fixed"
                        checked={form.pricing_mode === "fixed"}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-2">Fixed Price</span>
                    </label>

                    <label
                      className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                        form.pricing_mode === "rfq_only"
                          ? "bg-sky-50 border-sky-400"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="pricing_mode"
                        value="rfq_only"
                        checked={form.pricing_mode === "rfq_only"}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <span className="ml-2">RFQ Only</span>
                    </label>
                  </div>
                </div>

                {/* Unit Price */}
                {form.pricing_mode === "fixed" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Unit Price ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        name="unit_price"
                        step="0.01"
                        value={form.unit_price}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 pl-8 border rounded-lg focus:ring-2 focus:ring-sky-500"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold"
                  >
                    {loading
                      ? "Saving..."
                      : isEditing
                      ? "Save Changes"
                      : "Create Listing"}
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}
