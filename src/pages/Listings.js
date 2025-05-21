import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";

function Listings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  const handleAddListing = () => {
    navigate("/create-listing");
  };

  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/properties/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setListings(res.data.listings || []);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to fetch listings.");
      }
    };

    fetchListings();
  }, []);

  const handleDelete = (id) => {
    console.log("Delete listing with ID:", id);
    // delete logic
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0, color: "#000" }}>Property Listing</h2>

        <button
          onClick={handleAddListing}
          style={{
            padding: "8px 14px",
            backgroundColor: "#4682b4",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + Add Listing
        </button>
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #ccc",
          margin: "20px 0",
        }}
      />

      <h3 style={{ marginTop: "0", color: "#333", fontSize: "1rem" }}>
        {listings.length} Properties Available
      </h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {listings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          listings.map((listing) => (
            <PropertyCard
              key={listing._id || listing.id}
              title={listing.title}
              address={listing.address}
              area={listing.area}
              onEdit={() =>
                navigate(`/create-listing?listing_id=${listing._id}`)
              }
              onDelete={() => handleDelete(listing._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Listings;
