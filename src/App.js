import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Listings from "./pages/Listings";
import CreateListing from "./pages/CreateListing";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <div style={{ paddingTop: '60px' }}>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/create-listing" element={<CreateListing />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;