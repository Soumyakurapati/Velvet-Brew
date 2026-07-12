import { useEffect, useState } from "react";
import api from "../api/api.js";
import MenuCard from "../components/MenuCard.jsx";

const CATEGORIES = [
  { key: "coffee", label: "Coffee" },
  { key: "beverages", label: "Beverages" },
  { key: "mains", label: "Mains" },
  { key: "desserts", label: "Desserts" },
  { key: "icecreams", label: "Ice Creams" },
];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get("/menu", { params: category ? { category } : {} })
      .then((res) => setItems(res.data))
      .catch((err) => {
        console.error(err);
        setError("Could not reach the server. Make sure your backend is running on port 5000.");
      })
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <section style={{ padding: "80px 6%" }}>
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <div className="eyebrow">Full menu</div>
        <h2 style={{ fontSize: 44, marginTop: 14 }}>Browse and order</h2>
      </div>

      <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 50, flexWrap: "wrap" }}>
        <button
          onClick={() => setCategory("")}
          className={category === "" ? "btn btn-gold" : "btn btn-outline"}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={category === c.key ? "btn btn-gold" : "btn btn-outline"}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "var(--ivory-dim)" }}>Loading menu…</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "#c97a4a" }}>{error}</p>
      ) : items.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--ivory-dim)" }}>
          No items yet — run <code>npm run seed</code> in the server folder to add the full menu.
        </p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {items.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
