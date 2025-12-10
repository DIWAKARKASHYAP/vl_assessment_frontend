import { useState, useEffect } from "react";
import CreateListingModal from "../components/CreateListingModal";
import ListingCard from "../components/ListingCard";
import { BACKEND_URL } from "../../global";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [editingListing, setEditingListing] = useState(null);

  const token = localStorage.getItem("token");

  const fetchMyListings = async () => {
    const res = await fetch(`${BACKEND_URL}/listings/my-listings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setListings(data.listings || []);
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  return (
    <div className="page-container max-w-5xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">My Listings</h1>

      {/* Create / Edit Modal */}
      <CreateListingModal
        onCreated={fetchMyListings}
        initialData={editingListing}
        onClose={() => setEditingListing(null)}
      />

      {/* Listings Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {listings.map((listing) => (
          <ListingCard
            key={listing._id}
            listing={listing}
            onEdit={(listing) => setEditingListing(listing)}
          />
        ))}
      </div>
    </div>
  );
}
