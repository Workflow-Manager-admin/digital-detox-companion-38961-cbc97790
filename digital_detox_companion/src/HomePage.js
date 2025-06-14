import React from "react";
import { Link } from "react-router-dom";

/**
 * HomePage - Landing page showing clickable feature containers.
 *
 * Each feature is rendered as a card.
 * When a card is clicked, navigates to its dedicated feature page/route.
 */
// PUBLIC_INTERFACE
function HomePage() {
  // Features and their routes
  const features = [
    {
      key: "plan",
      label: "Personalized Detox Plan",
      description:
        "A plan tailored to you with steps to gradually reduce your social media usage.",
      icon: "📝",
      route: "/plan",
      highlight: true,
    },
    {
      key: "buddy-system",
      label: "Accountability Buddy System",
      description:
        "Get paired with an anonymous buddy for mutual support and accountability.",
      icon: "🫂",
      route: "/buddy-system",
    },
    {
      key: "rewards",
      label: "Real-World Milestone Rewards",
      description:
        "Earn real-world rewards as you hit your digital detox goals.",
      icon: "🎁",
      route: "/rewards",
    },
    {
      key: "checkin",
      label: "Off-Grid Check-In",
      description:
        "Check in to real-world activities to reinforce healthy habits.",
      icon: "✔️",
      route: "/checkin",
    },
    {
      key: "journal",
      label: "Reflection & Habit Journal",
      description:
        "AI-powered prompts and habit tracking for mindful progress.",
      icon: "📓",
      route: "/journal",
    },
  ];

  return (
    <section style={{ marginTop: 18 }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: 25 }}>
        Welcome to Your Digital Detox Companion 🌱
      </h1>
      <div>
        {features.map((f) => (
          <Link
            key={f.key}
            to={f.route}
            style={{
              textDecoration: "none",
              display: "block",
            }}
            tabIndex={0}
            aria-label={`Go to ${f.label} page`}
          >
            <div
              style={{
                marginBottom: 24,
                borderRadius: 15,
                boxShadow: f.highlight
                  ? "0 3px 22px -4px #B2DFDB33"
                  : "0 2px 5px 0 #E7F6EC11",
                background: f.highlight ? "#EFFBFC" : "#FFF",
                padding: f.highlight ? "28px 26px 18px" : "22px 18px 12px",
                border: f.highlight
                  ? "2.5px solid #B2DFDB"
                  : "1px solid #E5EFEA99",
                color: "#39544F",
                transition:
                  "box-shadow 0.14s cubic-bezier(.4,0,.2,1), border 0.17s cubic-bezier(.4,0,.2,1)",
                cursor: "pointer",
                outline: "none",
                display: "block",
              }}
              className="feature-card"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 22,
                  fontWeight: 600,
                }}
              >
                <span style={{ fontSize: 28, marginRight: 16 }}>{f.icon}</span>
                {f.label}
              </div>
              <div
                style={{
                  marginTop: 10,
                  color: "#789262",
                  fontWeight: 500,
                  fontSize: 15,
                  marginBottom: 0,
                }}
              >
                {f.description}
              </div>
              <div
                style={{
                  marginTop: 7,
                  color: "#82A97F",
                  fontWeight: 500,
                  fontSize: 14,
                  fontStyle: "italic",
                  opacity: 0.85,
                }}
              >
                Tap to explore the {f.label} page &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div
        style={{
          marginTop: 34,
          color: "#8E9478",
          fontSize: 15,
          textAlign: "center",
        }}
      >
        Designed for quick use. Go offline & enjoy the real world!
      </div>
    </section>
  );
}

export default HomePage;
