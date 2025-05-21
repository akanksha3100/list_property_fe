import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "10px",
  marginBottom: "10px",
  backgroundColor: "#fff",
  fontSize: "14px",
  lineHeight: "1.4",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  position: "relative",
};

const iconStyle = {
  position: "absolute",
  top: "8px",
  right: "10px",
  display: "flex",
  gap: "8px",
};

const iconButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#555",
};

function PropertyCard({ title, address, area, onEdit, onDelete }) {
  return (
    <div style={cardStyle}>
      <div style={iconStyle}>
        <button style={iconButtonStyle} onClick={onEdit} title="Edit">
          <FaEdit />
        </button>
        <button style={iconButtonStyle} onClick={onDelete} title="Delete">
          <FaTrash />
        </button>
      </div>
      <div><strong>{title}</strong></div>
      <div>{address}</div>
      <div>{area} sqft</div>
    </div>
  );
}

export default PropertyCard;
