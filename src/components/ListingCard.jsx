import { Edit2, MapPin, Package, DollarSign, Tag } from "lucide-react";

export default function ListingCard({ listing, onEdit }) {
  const isPriceFixed = listing.pricing_mode === "fixed";
  
  const getCategoryColor = (category) => {
    const colors = {
      raw_material: "from-emerald-400 to-teal-500",
      service: "from-blue-400 to-cyan-500",
      other: "from-purple-400 to-pink-500",
    };
    return colors[category] || "from-gray-400 to-gray-500";
  };

  const getCategoryBgColor = (category) => {
    const colors = {
      raw_material: "bg-emerald-50",
      service: "bg-blue-50",
      other: "bg-purple-50",
    };
    return colors[category] || "bg-gray-50";
  };

  const getCategoryIcon = (category) => {
    const icons = {
      raw_material: "📦",
      service: "🔧",
      other: "📌",
    };
    return icons[category] || "📦";
  };

  return (
    <div className="group relative h-full bg-white border border-gray-200 hover:border-blue-300 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-100">
      
      {/* Soft hover background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-cyan-50/0 group-hover:from-blue-50/50 group-hover:to-cyan-50/50 transition-all duration-300 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{getCategoryIcon(listing.category)}</span>
          <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${getCategoryColor(listing.category)} capitalize shadow-sm`}>
            {listing.category.replace('_', ' ')}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {listing.name}
        </h2>

        {/* Description (if available) */}
        {listing.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {listing.description}
          </p>
        )}

        {/* Details Section */}
        <div className="flex-1 space-y-4 mb-6 py-4">
          
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
          <div className={`flex items-start gap-3 rounded-lg p-3 border ${isPriceFixed ? 'bg-cyan-50 border-cyan-100' : 'bg-orange-50 border-orange-100'}`}>
            <DollarSign className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isPriceFixed ? 'text-cyan-600' : 'text-orange-600'}`} />
            <div className="flex-1">
              <p className={`text-xs uppercase tracking-wider font-semibold ${isPriceFixed ? 'text-cyan-600' : 'text-orange-600'}`}>
                Pricing
              </p>
              {isPriceFixed ? (
                <div className="flex items-baseline gap-1 mt-1">
                  <p className="text-gray-900 font-black text-xl">${listing.unit_price}</p>
                  <p className="text-gray-500 text-sm">per {listing.unit}</p>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-orange-200 rounded-lg mt-1">
                  <Tag className="w-4 h-4 text-orange-500" />
                  <p className="text-orange-700 font-semibold text-sm">Quote on Request</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Badge */}
        {listing.status && (
          <div className="mb-4 flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${listing.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-xs font-semibold capitalize ${listing.status === 'active' ? 'text-green-700' : 'text-red-700'}`}>
              {listing.status}
            </span>
          </div>
        )}

        {/* Edit Button */}
        <button
          onClick={() => onEdit(listing)}
          className="group/btn w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 active:from-blue-700 active:to-cyan-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Edit2 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
          Edit Listing
        </button>
      </div>

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-transparent group-hover:from-blue-500 group-hover:via-cyan-500 transition-all"></div>
    </div>
  );
}