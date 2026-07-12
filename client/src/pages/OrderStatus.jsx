import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const STEPS = ["pending", "preparing", "ready", "served"];

export default function OrderStatus() {
  const { id } = useParams();
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000");

    socket.on("orderStatusUpdate", (order) => {
      if (order._id === id) setStatus(order.status);
    });

    return () => socket.disconnect();
  }, [id]);

  const currentIndex = STEPS.indexOf(status);

  return (
    <section style={{ padding: "100px 6%", textAlign: "center" }}>
      <div className="eyebrow">Order #{id.slice(-6)}</div>
      <h2 style={{ fontSize: 40, margin: "16px 0 50px" }}>Tracking your order</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: 40, maxWidth: 600, margin: "0 auto" }}>
        {STEPS.map((step, idx) => (
          <div key={step} style={{ opacity: idx <= currentIndex ? 1 : 0.35 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: idx <= currentIndex ? "var(--gold)" : "transparent",
                border: "1px solid var(--gold-dim)",
                margin: "0 auto 10px",
              }}
            />
            <p style={{ fontSize: 12, textTransform: "capitalize", letterSpacing: "0.08em" }}>{step}</p>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 60, color: "var(--ivory-dim)", fontSize: 13 }}>
        This page updates live the moment the kitchen changes your order's status.
      </p>
    </section>
  );
}
