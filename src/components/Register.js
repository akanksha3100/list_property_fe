import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./authForm.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = "Name is required";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registered successfully");
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setApiError(error.response.data.error);
      } else {
        setApiError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        name="name"
        onChange={handleChange}
        placeholder="Name"
        value={form.name}
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <input
        name="email"
        onChange={handleChange}
        placeholder="Email"
        type="email"
        value={form.email}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
        value={form.password}
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <button type="submit">Register</button>

      {apiError && <span className="error">{apiError}</span>}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

export default Register;
