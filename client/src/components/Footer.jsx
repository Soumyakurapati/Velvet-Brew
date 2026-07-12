import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--hair)", marginTop: 60 }}>
      <div
        style={{
          padding: "70px 6% 40px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 40,
        }}
        className="footer-grid"
      >
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, marginBottom: 14 }}>
            Velvet Brew
          </div>
          <p style={{ fontSize: 13, color: "var(--ivory-dim)", marginBottom: 22, maxWidth: 280 }}>
            A luxury café experience — coffee, food, and dessert, made with intention.
          </p>
          <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>
            Join the list
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 0 }}>
            <input
              placeholder="Your email"
              style={{
                flex: 1,
                padding: "11px 14px",
                background: "var(--panel)",
                border: "1px solid var(--hair)",
                borderRight: "none",
                color: "var(--ivory)",
                fontSize: 13,
              }}
            />
            <button
              className="btn btn-gold"
              style={{ padding: "11px 18px", borderRadius: 0 }}
              type="submit"
            >
              Join
            </button>
          </form>
        </div>

        <FooterColumn
          title="Menu"
          links={[
            { label: "Coffee", to: "/menu" },
            { label: "Beverages", to: "/menu" },
            { label: "Mains", to: "/menu" },
            { label: "Desserts", to: "/menu" },
            { label: "Ice Creams", to: "/menu" },
          ]}
        />

        <FooterColumn
          title="Company"
          links={[
            { label: "Our story", to: "/" },
            { label: "Reserve a table", to: "/reserve" },
            { label: "Careers", to: "/" },
            { label: "Contact", to: "/" },
          ]}
        />

        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 18 }}>
            Follow us
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            {["Instagram", "Facebook", "X"].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  width: 36,
                  height: 36,
                  border: "1px solid var(--hair)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  color: "var(--ivory-dim)",
                }}
              >
                {s[0]}
              </a>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--ivory-dim)", marginTop: 26 }}>
            Open daily · 8am – 11pm
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--hair)",
          padding: "20px 6%",
          fontSize: 11,
          color: "var(--ivory-dim)",
          textAlign: "center",
          letterSpacing: "0.04em",
        }}
      >
        © {new Date().getFullYear()} Velvet Brew. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 18 }}>
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map((l) => (
          <Link key={l.label} to={l.to} style={{ fontSize: 13, color: "var(--ivory-dim)" }}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
