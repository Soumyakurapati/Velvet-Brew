import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";

const GALLERY = [
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&h=500&q=80&fit=crop",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=500&q=80&fit=crop",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&q=80&fit=crop",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=500&h=500&q=80&fit=crop",
];

const TESTIMONIALS = [
  { quote: "The kind of place that makes an ordinary Tuesday feel like an occasion.", name: "R. Malhotra" },
  { quote: "Every plate looks considered. The sizzling brownie alone is worth the visit.", name: "A. Fernandes" },
  { quote: "Ordering ahead and picking up was effortless — and the espresso is genuinely excellent.", name: "S. Rao" },
];

export default function Home() {
  const [signature, setSignature] = useState([]);

  useEffect(() => {
    api
      .get("/menu")
      .then((res) => setSignature(res.data.filter((i) => i.isSignature).slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", padding: "120px 6% 100px", textAlign: "center", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(201,162,74,0.12), transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div className="eyebrow" style={{ marginBottom: 22 }}>
          Velvet Brew — a luxury café experience
        </div>
        <h1 style={{ fontSize: "clamp(42px,7vw,88px)", lineHeight: 1.05, maxWidth: 820, margin: "0 auto 26px" }}>
          Coffee, poured with <em style={{ color: "var(--gold)", fontStyle: "italic" }}>intention</em>.
        </h1>
        <p style={{ maxWidth: 480, margin: "0 auto 40px", color: "var(--ivory-dim)" }}>
          Order ahead, reserve a table, or scan the code at your seat — our kitchen and bar move the moment you do.
        </p>
        <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/menu" className="btn btn-gold">View the menu</Link>
          <Link to="/reserve" className="btn btn-outline">Reserve a table</Link>
        </div>
      </section>

      {/* SIGNATURE PICKS */}
      {signature.length > 0 && (
        <section style={{ padding: "40px 6% 90px" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="eyebrow">Chef's recommendations</div>
            <h2 style={{ fontSize: 40, marginTop: 14 }}>Signature this season</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {signature.map((item) => (
              <div key={item._id} style={{ border: "1px solid var(--hair)", background: "var(--panel)" }}>
                {item.image && (
                  <div style={{ height: 190 }}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                )}
                <div style={{ padding: "20px 22px" }}>
                  <h3 style={{ fontSize: 21, marginBottom: 8 }}>{item.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--ivory-dim)" }}>{item.description}</p>
                  <span style={{ color: "var(--gold)", fontFamily: "'Cormorant Garamond', serif", fontSize: 18, display: "block", marginTop: 12 }}>
                    ₹{item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GALLERY */}
      <section style={{ padding: "40px 6% 90px" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div className="eyebrow">Inside Velvet Brew</div>
          <h2 style={{ fontSize: 40, marginTop: 14 }}>The atmosphere</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }} className="gallery-grid">
          {GALLERY.map((src, i) => (
            <div key={i} style={{ aspectRatio: "1/1", overflow: "hidden" }}>
              <img src={src} alt="Café interior" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "40px 6% 100px" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div className="eyebrow">Word of mouth</div>
          <h2 style={{ fontSize: 40, marginTop: 14 }}>What guests say</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ border: "1px solid var(--hair)", padding: "30px 26px", textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 19, marginBottom: 18, color: "var(--ivory)" }}>
                "{t.quote}"
              </p>
              <p style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESERVATION CTA */}
      <section style={{ padding: "20px 6% 110px", textAlign: "center" }}>
        <div style={{ border: "1px solid var(--hair)", padding: "60px 30px" }}>
          <h2 style={{ fontSize: 34, marginBottom: 16 }}>Planning something special?</h2>
          <p style={{ color: "var(--ivory-dim)", marginBottom: 30 }}>Reserve your table in under a minute.</p>
          <Link to="/reserve" className="btn btn-gold">Reserve a table</Link>
        </div>
      </section>
    </>
  );
}
