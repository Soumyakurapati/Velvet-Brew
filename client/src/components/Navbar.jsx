import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "28px 6%",
        borderBottom: "1px solid var(--hair)",
      }}
    >
      <Link
        to="/"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26 }}
      >
        Velvet Brew
      </Link>
      <div style={{ display: "flex", gap: 36, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ivory-dim)" }}>
        <Link to="/menu">Menu</Link>
        <Link to="/reserve">Reserve</Link>
        <Link to="/orders/mine">My orders</Link>
      </div>
      <Link
        to="/checkout"
        style={{
          border: "1px solid var(--gold-dim)",
          borderRadius: 999,
          padding: "8px 18px",
          fontSize: 12,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--gold)",
        }}
      >
        Cart · {count}
      </Link>
    </nav>
  );
}
