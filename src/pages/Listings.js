import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Property Listings</h2>
      <button onClick={handleAddListing}>Add New Listing</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        {listings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          <ul>
            {listings.map((listing) => (
              <li key={listing._id || listing.id}>
                <strong>{listing.title}</strong> - {listing.address}, {listing.area} sqft
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Listings;