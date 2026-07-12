import { useState } from "react";
import api from "../api/api.js";

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 18,
  background: "var(--panel)",
  border: "1px solid var(--hair)",
  color: "var(--ivory)",
  fontFamily: "'Jost', sans-serif",
};

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    occasion: "None",
    specialRequests: "",
  });
  const [status, setStatus] = useState(""); // "", "submitting", "confirmed", "error"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await api.post("/reservations", form);
      setStatus("confirmed");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "confirmed") {
    return (
      <section style={{ padding: "120px 6%", textAlign: "center" }}>
        <div className="eyebrow">Reservation confirmed</div>
        <h2 style={{ fontSize: 40, margin: "18px 0" }}>See you soon, {form.name.split(" ")[0]}.</h2>
        <p style={{ color: "var(--ivory-dim)" }}>
          Table for {form.guests} on {form.date} at {form.time}. A confirmation has been noted for {form.email}.
        </p>
      </section>
    );
  }

  return (
    <section style={{ padding: "80px 6%", maxWidth: 560, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <div className="eyebrow">Book ahead</div>
        <h2 style={{ fontSize: 40, marginTop: 14 }}>Reserve a table</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <input style={inputStyle} name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
        <input style={inputStyle} name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input style={inputStyle} name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required />

        <div style={{ display: "flex", gap: 14 }}>
          <input style={inputStyle} name="date" type="date" value={form.date} onChange={handleChange} required />
          <input style={inputStyle} name="time" type="time" value={form.time} onChange={handleChange} required />
        </div>

        <input style={inputStyle} name="guests" type="number" min="1" placeholder="Number of guests" value={form.guests} onChange={handleChange} required />

        <select style={inputStyle} name="occasion" value={form.occasion} onChange={handleChange}>
          <option>None</option>
          <option>Birthday</option>
          <option>Anniversary</option>
          <option>Date night</option>
          <option>Business meeting</option>
          <option>Other</option>
        </select>

        <textarea
          style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
          name="specialRequests"
          placeholder="Special requests (optional)"
          value={form.specialRequests}
          onChange={handleChange}
        />

        {status === "error" && (
          <p style={{ color: "#c97a4a", fontSize: 13, marginBottom: 16 }}>
            Could not reach the server. Make sure your backend is running.
          </p>
        )}

        <button type="submit" disabled={status === "submitting"} className="btn btn-gold" style={{ width: "100%" }}>
          {status === "submitting" ? "Booking…" : "Confirm reservation"}
        </button>
      </form>
    </section>
  );
}
