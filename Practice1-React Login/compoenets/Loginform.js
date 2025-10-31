// src/components/LoginForm.js
import React, { useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    if (!username.trim() || !password.trim()) {
      setError("Both username and password are required.");
      return;
    }
    // For demo: log credentials (in real app, send to backend)
    console.log("Submitted credentials:", { username, password });
    alert("Check console for submitted credentials.");
    setForm({ username: "", password: "" });
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Username</label><br />
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Password</label><br />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

        <button type="submit" style={{ padding: "8px 16px" }}>Submit</button>
      </form>
    </div>
  );
}
