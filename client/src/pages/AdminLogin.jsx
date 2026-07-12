import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 18,
  background: "var(--panel)",
  border: "1px solid var(--hair)",
  color: "var(--ivory)",
};

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.role !== "admin") {
        setError("This account does not have admin access.");
        return;
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section style={{ padding: "120px 6%", maxWidth: 420, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div className="eyebrow">Staff access</div>
        <h2 style={{ fontSize: 34, marginTop: 14 }}>Admin login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input style={inputStyle} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p style={{ color: "#c97a4a", fontSize: 13, marginBottom: 16 }}>{error}</p>}
        <button type="submit" className="btn btn-gold" style={{ width: "100%" }}>Log in</button>
      </form>
      <p style={{ fontSize: 12, color: "var(--ivory-dim)", marginTop: 24, textAlign: "center" }}>
        Run <code>npm run create-admin</code> in the server folder to generate a default admin login.
      </p>
    </section>
  );
}
