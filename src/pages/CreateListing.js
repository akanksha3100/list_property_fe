import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const [form, setForm] = useState({
    title: "",
    address: "",
    area: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/properties/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Listing created successfully");
      navigate("/listings");
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Something went wrong while creating the listing");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Create Listing</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      {errors.title && <span className="error">{errors.title}</span>}

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />
      {errors.address && <span className="error">{errors.address}</span>}

      <input
        name="area"
        placeholder="Area (in sqft)"
        value={form.area}
        onChange={handleChange}
      />
      {errors.area && <span className="error">{errors.area}</span>}

      <button type="submit">Create Listing</button>
    </form>
  );
}

export default CreateListing;