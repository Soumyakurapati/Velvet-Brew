import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

const TABS = ["Overview", "Menu", "Orders", "Reservations"];

const emptyItem = { name: "", description: "", price: "", category: "coffee", ingredients: "", isSignature: false };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Overview");
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(emptyItem);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("role") !== "admin") {
      navigate("/admin/login");
      return;
    }
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [menuRes, ordersRes, resvRes] = await Promise.all([
        api.get("/menu"),
        api.get("/orders"),
        api.get("/reservations"),
      ]);
      setMenuItems(menuRes.data);
      setOrders(ordersRes.data);
      setReservations(resvRes.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  // ---- Menu CRUD ----
  const openNewItem = () => { setEditingItem("new"); setForm(emptyItem); };
  const openEditItem = (item) => {
    setEditingItem(item._id);
    setForm({ ...item, ingredients: (item.ingredients || []).join(", ") });
  };
  const saveItem = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      ingredients: form.ingredients.split(",").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editingItem === "new") {
        await api.post("/menu", payload);
      } else {
        await api.put(`/menu/${editingItem}`, payload);
      }
      setEditingItem(null);
      loadAll();
    } catch (err) {
      alert(err.response?.data?.message || "Could not save item");
    }
  };
  const deleteItem = async (id) => {
    if (!confirm("Delete this menu item?")) return;
    await api.delete(`/menu/${id}`);
    loadAll();
  };

  // ---- Orders ----
  const updateOrderStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    loadAll();
  };

  // ---- Reservations ----
  const updateReservationStatus = async (id, status) => {
    await api.put(`/reservations/${id}/status`, { status });
    loadAll();
  };

  const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  if (loading) return <p style={{ padding: 100, textAlign: "center", color: "var(--ivory-dim)" }}>Loading dashboard…</p>;

  return (
    <section style={{ padding: "50px 6% 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
        <div>
          <div className="eyebrow">Staff area</div>
          <h2 style={{ fontSize: 34, marginTop: 8 }}>Admin dashboard</h2>
        </div>
        <button onClick={logout} className="btn btn-outline">Log out</button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={tab === t ? "btn btn-gold" : "btn btn-outline"}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          <StatCard label="Total revenue" value={`₹${revenue}`} />
          <StatCard label="Total orders" value={orders.length} />
          <StatCard label="Menu items" value={menuItems.length} />
          <StatCard label="Reservations" value={reservations.length} />
        </div>
      )}

      {tab === "Menu" && (
        <div>
          <button onClick={openNewItem} className="btn btn-gold" style={{ marginBottom: 24 }}>+ Add menu item</button>

          {editingItem && (
            <form onSubmit={saveItem} style={{ border: "1px solid var(--hair)", padding: 24, marginBottom: 30, background: "var(--panel)" }}>
              <h3 style={{ marginBottom: 16 }}>{editingItem === "new" ? "New item" : "Edit item"}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required style={fieldStyle} />
                <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required style={fieldStyle} />
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={fieldStyle}>
                  <option value="coffee">Coffee</option>
                  <option value="beverages">Beverages</option>
                  <option value="mains">Mains</option>
                  <option value="desserts">Desserts</option>
                  <option value="icecreams">Ice Creams</option>
                </select>
                <label style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ivory-dim)", fontSize: 13 }}>
                  <input type="checkbox" checked={form.isSignature} onChange={(e) => setForm({ ...form, isSignature: e.target.checked })} />
                  Signature item
                </label>
              </div>
              <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...fieldStyle, width: "100%", minHeight: 70, marginTop: 14 }} />
              <input placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} style={{ ...fieldStyle, width: "100%", marginTop: 14 }} />
              <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
                <button type="submit" className="btn btn-gold">Save</button>
                <button type="button" onClick={() => setEditingItem(null)} className="btn btn-outline">Cancel</button>
              </div>
            </form>
          )}

          <div style={{ display: "grid", gap: 10 }}>
            {menuItems.map((item) => (
              <div key={item._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", border: "1px solid var(--hair)", background: "var(--panel)" }}>
                <div>
                  <strong>{item.name}</strong>
                  <span style={{ color: "var(--ivory-dim)", fontSize: 12, marginLeft: 10, textTransform: "capitalize" }}>{item.category} · ₹{item.price}</span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => openEditItem(item)} className="btn btn-outline" style={{ padding: "6px 14px", fontSize: 11 }}>Edit</button>
                  <button onClick={() => deleteItem(item._id)} className="btn btn-outline" style={{ padding: "6px 14px", fontSize: 11 }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Orders" && (
        <div style={{ display: "grid", gap: 10 }}>
          {orders.length === 0 && <p style={{ color: "var(--ivory-dim)" }}>No orders yet.</p>}
          {orders.map((o) => (
            <div key={o._id} style={{ padding: "16px 18px", border: "1px solid var(--hair)", background: "var(--panel)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <strong>#{o._id.slice(-6)} — ₹{o.totalAmount}</strong>
                <span style={{ color: "var(--ivory-dim)", fontSize: 12 }}>{o.tableNumber ? `Table ${o.tableNumber}` : "Takeaway"}</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--ivory-dim)", marginBottom: 10 }}>
                {o.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}
              </p>
              <select value={o.status} onChange={(e) => updateOrderStatus(o._id, e.target.value)} style={{ ...fieldStyle, padding: "6px 10px" }}>
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="served">Served</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {tab === "Reservations" && (
        <div style={{ display: "grid", gap: 10 }}>
          {reservations.length === 0 && <p style={{ color: "var(--ivory-dim)" }}>No reservations yet.</p>}
          {reservations.map((r) => (
            <div key={r._id} style={{ padding: "16px 18px", border: "1px solid var(--hair)", background: "var(--panel)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <strong>{r.name} — {r.guests} guests</strong>
                <span style={{ color: "var(--ivory-dim)", fontSize: 12 }}>{r.date} at {r.time}</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--ivory-dim)", marginBottom: 10 }}>
                {r.email} · {r.phone} · {r.occasion}
                {r.specialRequests && ` · "${r.specialRequests}"`}
              </p>
              <select value={r.status} onChange={(e) => updateReservationStatus(r._id, e.target.value)} style={{ ...fieldStyle, padding: "6px 10px" }}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{ border: "1px solid var(--hair)", background: "var(--panel)", padding: "26px 22px" }}>
      <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-dim)", marginBottom: 10 }}>{label}</p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, color: "var(--gold)" }}>{value}</p>
    </div>
  );
}

const fieldStyle = {
  padding: 10,
  background: "var(--ink)",
  border: "1px solid var(--hair)",
  color: "var(--ivory)",
};
