import { useState } from "react";
import axios from "axios";

const useApi = (baseURL = 'http://localhost:5000/api') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = async ({ url, method = "GET", data = null, headers = {} }) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    const authHeaders = token
      ? { Authorization: `Bearer ${token}`, ...headers }
      : headers;

    try {
      const response = await axios({
        url: `${baseURL}${url}`,
        method,
        data,
        headers: authHeaders,
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || "An error occurred");
      console.error("API error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { api, loading, error };
};

export default useApi;
