export default function ListingCard({ listing, onEdit }) {
  return (
    <div className="p-5 border rounded shadow-sm bg-white">
      <h2 className="text-xl font-semibold">{listing.name}</h2>

      <p className="text-gray-600 text-sm mt-1 capitalize">{listing.category}</p>

      <div className="mt-3 text-gray-700 space-y-1">
        <p><strong>Quantity:</strong> {listing.quantity_available} {listing.unit}</p>
        <p><strong>Location:</strong> {listing.location_country}</p>

        <p>
          <strong>Pricing:</strong>{" "}
          {listing.pricing_mode === "fixed"
            ? `$${listing.unit_price}`
            : "RFQ Only"}
        </p>
      </div>

      <button
        className="mt-4 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded"
        onClick={() => onEdit(listing)}
      >
        Edit
      </button>
    </div>
  );
}
