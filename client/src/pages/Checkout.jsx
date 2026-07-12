import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import api from "../api/api.js";

export default function Checkout() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const [tableNumber, setTableNumber] = useState("");
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (items.length === 0) return;
    setPlacing(true);
    try {
      const res = await api.post("/orders", { items, tableNumber });
      clearCart();
      navigate(`/orders/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert("Could not place order. Is the server running?");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section style={{ padding: "80px 6%", maxWidth: 640, margin: "0 auto" }}>
      <h2 style={{ fontSize: 36, marginBottom: 40 }}>Your order</h2>

      {items.length === 0 ? (
        <p style={{ color: "var(--ivory-dim)" }}>Your cart is empty.</p>
      ) : (
        <>
          {items.map((i) => (
            <div
              key={i.menuItem}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 0",
                borderBottom: "1px solid var(--hair)",
              }}
            >
              <div>
                <p>{i.name}</p>
                <p style={{ fontSize: 12, color: "var(--ivory-dim)" }}>₹{i.price} each</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button className="btn btn-outline" style={{ padding: "4px 10px" }} onClick={() => updateQuantity(i.menuItem, i.quantity - 1)}>-</button>
                <span>{i.quantity}</span>
                <button className="btn btn-outline" style={{ padding: "4px 10px" }} onClick={() => updateQuantity(i.menuItem, i.quantity + 1)}>+</button>
                <button onClick={() => removeItem(i.menuItem)} style={{ background: "none", border: "none", color: "var(--ivory-dim)", cursor: "pointer" }}>✕</button>
              </div>
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", padding: "24px 0", fontSize: 20 }}>
            <span>Total</span>
            <span style={{ color: "var(--gold)" }}>₹{total}</span>
          </div>

          <input
            placeholder="Table number (optional)"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 20,
              background: "var(--panel)",
              border: "1px solid var(--hair)",
              color: "var(--ivory)",
            }}
          />

          <button onClick={placeOrder} disabled={placing} className="btn btn-gold" style={{ width: "100%" }}>
            {placing ? "Placing order…" : "Place order"}
          </button>
        </>
      )}
    </section>
  );
}
