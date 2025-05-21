import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { ADDPROPERTY, BULKUPLOAD } from "../config/apiConfig";

function CreateListing() {
  const [form, setForm] = useState({
    title: "",
    address: "",
    area: ""
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [bulkError, setBulkError] = useState("");
  const [bulkSuccess, setBulkSuccess] = useState("");
  const navigate = useNavigate();
  const { api, loading } = useApi();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.area) newErrors.area = "Area is required";
    else if (isNaN(form.area)) newErrors.area = "Area must be a number";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      api({
        url: ADDPROPERTY,
        method: "POST",
        data: form,
      });
      alert("Listing created successfully");
      navigate("/listings");
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Something went wrong while creating the listing");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setBulkError("");
    setBulkSuccess("");
  };

  const handleBulkUpload = async () => {
    if (!file) {
      setBulkError("Please select a CSV or Excel file first.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api({
        url: BULKUPLOAD,
        method: 'POST',
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      })
      setBulkSuccess(res.message || "Bulk upload successful");
      navigate("/listings");
      setBulkError("");
      setFile(null);
    } catch (error) {
      console.error("Bulk upload error:", error);
      setBulkError(
        error.response?.data?.message || "Failed to upload file. Check format."
      );
      setBulkSuccess("");
    }
  };

  return (
    <div className="container">
      <h2>Create Property Listing</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className={errors.title ? "input-error" : ""}
        />
        {errors.title && <div className="error">{errors.title}</div>}

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className={errors.address ? "input-error" : ""}
        />
        {errors.address && <div className="error">{errors.address}</div>}

        <input
          name="area"
          placeholder="Area (in sqft)"
          value={form.area}
          onChange={handleChange}
          className={errors.area ? "input-error" : ""}
          type="number"
        />
        {errors.area && <div className="error">{errors.area}</div>}

        <button type="submit" className="btn">
          {loading ? "Creating..." : "Create Listing"}
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <div className="bulk-upload-section">
        <h3>Bulk Upload Property Listings (CSV/Excel)</h3>
        <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleFileChange} />
        {bulkError && <div className="error">{bulkError}</div>}
        {bulkSuccess && <div className="success">{bulkSuccess}</div>}

        <button onClick={handleBulkUpload} className="btn upload-btn">
          Upload File
        </button>
      </div>

      <style>{`
        .container {
          max-width: 500px;
          margin: 30px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: Arial, sans-serif;
          background: #fafafa;
        }
        h2, h3 {
          text-align: center;
          color: #333;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        input {
          padding: 10px 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
          transition: border-color 0.3s ease;
        }
        input:focus {
          border-color: #007bff;
        }
        .input-error {
          border-color: #e74c3c;
        }
        .error {
          color: #e74c3c;
          font-size: 14px;
          margin-top: -12px;
          margin-bottom: 8px;
        }
        .success {
          color: #27ae60;
          font-size: 14px;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        .btn {
          background: #4682b4;
          color: white;
          border: none;
          padding: 12px;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .btn:hover {
          background: #0056b3;
        }
        .upload-btn {
          margin-top: 10px;
          width: 100%;
        }
        hr {
          border: none;
          border-top: 1px solid #ddd;
        }
        .bulk-upload-section {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default CreateListing;
