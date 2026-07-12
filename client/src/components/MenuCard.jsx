import { useCart } from "../context/CartContext.jsx";

export default function MenuCard({ item }) {
  const { addItem } = useCart();

  return (
    <div
      style={{
        border: "1px solid var(--hair)",
        background: "var(--panel)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {item.image && (
        <div style={{ height: 170, overflow: "hidden", background: "var(--panel-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "data:image/svg+xml;utf8," +
                encodeURIComponent(
                  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 350"><rect width="500" height="350" fill="#1c1915"/><path d="M180 150h140v55a70 70 0 0 1-70 70 70 70 0 0 1-70-70v-55Z" stroke="#c9a24a" stroke-width="4" fill="none"/><path d="M320 165h20a25 25 0 0 1 0 50h-20" stroke="#c9a24a" stroke-width="4" fill="none"/></svg>'
                );
            }}
          />
        </div>
      )}

      <div style={{ padding: "22px 22px 24px" }}>
      {item.isSignature && (
        <span
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--ink)",
            background: "var(--gold)",
            padding: "3px 8px",
          }}
        >
          Signature
        </span>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6, paddingRight: item.isSignature ? 70 : 0 }}>
        <h3 style={{ fontSize: 21 }}>{item.name}</h3>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ color: "var(--gold)", fontFamily: "'Cormorant Garamond', serif", fontSize: 19 }}>
          ₹{item.price}
        </span>
        {item.rating && (
          <span style={{ fontSize: 12, color: "var(--ivory-dim)" }}>★ {item.rating.toFixed(1)}</span>
        )}
      </div>

      <p style={{ fontSize: 13, color: "var(--ivory-dim)", marginBottom: 12 }}>
        {item.description}
      </p>

      {item.ingredients?.length > 0 && (
        <p style={{ fontSize: 11, color: "var(--gold-dim)", marginBottom: 18, letterSpacing: "0.03em" }}>
          {item.ingredients.join(" · ")}
        </p>
      )}

      <button
        onClick={() => addItem(item)}
        style={{
          background: "none",
          border: "none",
          borderBottom: "1px solid var(--gold-dim)",
          color: "var(--gold)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          cursor: "pointer",
          paddingBottom: 3,
        }}
      >
        Add to order
      </button>
      </div>
    </div>
  );
}
