import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({ title: "", address: "", area: "" });
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/properties", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setProperties(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addProperty = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/properties/add", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Property added");
  };

  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", file);
    await axios.post("http://localhost:5000/api/properties/upload", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("File uploaded");
  };

  return (
    <div>
      <h2>Add Property</h2>
      <form onSubmit={addProperty}>
        <input name="title" onChange={handleChange} placeholder="Title" />
        <input name="address" onChange={handleChange} placeholder="Address" />
        <input name="area" onChange={handleChange} placeholder="Area" />
        <button type="submit">Add</button>
      </form>

      <h2>Upload CSV</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>

      <h2>Property List</h2>
      <ul>
        {properties.map((prop, i) => (
          <li key={i}>{prop.title} - {prop.address} - {prop.area}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
