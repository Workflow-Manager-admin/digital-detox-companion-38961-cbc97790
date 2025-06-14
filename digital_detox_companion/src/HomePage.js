import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * HomePage
 * Digital Detox Companion Home page, redesigned.
 * (1) Description/use case/feature summary at the top.
 * (2) Each core feature is a card that only shows its name initially, expands/collapses on click for details.
 * Clean, branded/minimal UI.
 */
export default function HomePage() {
  // List of features and their descriptions
  const FEATURES = [
    {
      name: "Circles",
      description: "Community groups to support and motivate digital wellbeing."
    },
    {
      name: "Parent-Teen",
      description: "Tools to help parents and teens collaborate on healthy digital habits."
    },
    {
      name: "Integration",
      description: "Sync with other wellness or productivity tools."
    },
    {
      name: "Rewards",
      description: "Earn real-world rewards for achieving digital detox milestones."
    },
    {
      name: "Check In",
      description: "Record progress by checking in to real-world, offline activities."
    },
    {
      name: "Buddy System",
      description: "Pair up anonymously for mutual accountability and encouragement."
    }
  ];

  // Expanded/collapsed state for each feature
  const [expandedIdx, setExpandedIdx] = useState(null);

  // App description & use case text
  const appDescription =
    "Digital Detox Companion is a multipage web app designed to help users reduce their social media usage and build healthier digital habits. It offers tailored plans, accountability partnerships, real-world rewards, and reflective prompts to promote balanced technology use.";
  const appUseCase =
    "Ideal for anyone seeking to curb excessive screen time, improve real-world engagement, and build sustainable digital habits—be it individuals, families, or groups.";

  // Style vars (from app theme)
  const COLORS = {
    primary: "#2E7D32",
    accent: "#FFD600",
    secondary: "#B2DFDB"
  };

  // PUBLIC_INTERFACE
  return (
    <div
      style={{
        marginTop: 36,
        marginBottom: 34,
        display: "flex",
        flexDirection: "column",
        gap: 32,
        maxWidth: 650,
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      {/* --------- DESCRIPTION SECTION --------- */}
      <div
        style={{
          background: "#F8FBF8",
          border: "1px solid #e9f3ec",
          borderRadius: 18,
          padding: "30px 4vw 21px 4vw",
          marginBottom: 6,
          boxShadow: "0 1.5px 9px #b2dfdb09"
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: "1.61rem",
            color: COLORS.primary,
            marginBottom: 8,
            letterSpacing: 0.01
          }}
        >
          🌱 Digital Detox Companion
        </div>
        <div style={{ color: "#1A1A1A", fontSize: 15.6, lineHeight: 1.6, marginBottom: 10 }}>
          {appDescription}
        </div>
        <div
          style={{
            color: COLORS.primary,
            fontWeight: 500,
            marginBottom: 9,
            fontSize: 15
          }}
        >
          Use Case:&nbsp;
          <span style={{ color: "#6b795d", fontWeight: 400 }}>{appUseCase}</span>
        </div>
        <div style={{ marginTop: 12, color: "#B49A26", fontWeight: 500, fontSize: "1.02rem" }}>
          Key Features:
          <ul style={{ margin: "7px 0 0 24px", padding: 0, color: "#818A76", fontWeight: 400 }}>
            <li>Personalized detox plans</li>
            <li>Accountability buddy system</li>
            <li>Community circles & parent-teen collaboration</li>
            <li>Real-world milestone rewards</li>
            <li>Off-grid activity check-ins</li>
            <li>Tool integrations & reflective journaling</li>
          </ul>
        </div>
      </div>

      {/* --------- FEATURE LIST (Expandable) --------- */}
      <div>
        <div
          style={{
            color: COLORS.primary,
            fontWeight: 700,
            fontSize: 19,
            marginBottom: 13,
            letterSpacing: ".01rem"
          }}
        >
          Explore Features
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 17
          }}
        >
          {FEATURES.map((feat, i) => (
            <FeatureAccordionCard
              key={feat.name}
              name={feat.name}
              description={feat.description}
              expanded={expandedIdx === i}
              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
// Accordion-style minimal feature card
function FeatureAccordionCard({ name, description, expanded, onClick }) {
  // Custom icons for each feature name (optional for visual cue)
  const icons = {
    Circles: "🪢",
    "Parent-Teen": "🏠",
    Integration: "🔗",
    Rewards: "🎁",
    "Check In": "📋",
    "Buddy System": "🤝"
  };
  const COLORS = {
    primary: "#2E7D32",
    accent: "#FFD600",
    secondary: "#B2DFDB"
  };
  return (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        background: "#fff",
        color: COLORS.primary,
        border: expanded
          ? `1.8px solid ${COLORS.accent}`
          : "1.3px solid #B2DFDB",
        borderRadius: 14,
        padding: expanded ? "20px 22px 13px" : "17px 22px",
        fontWeight: expanded ? 700 : 500,
        fontSize: 17,
        transition: "box-shadow 0.16s, border 0.16s",
        boxShadow: expanded
          ? "0 4px 18px #ffd6002b"
          : "0 2px 11px #B2DFDB10",
        outline: "none",
        cursor: "pointer",
        marginBottom: 0,
        position: "relative"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
        <span style={{ fontSize: 25, marginRight: 7 }}>
          {icons[name] || "✨"}
        </span>
        <span>{name}</span>
        <span style={{ marginLeft: "auto", color: "#B49A26", fontSize: 21 }}>
          {expanded ? "−" : "+"}
        </span>
      </div>
      {expanded && (
        <div
          style={{
            marginTop: 13,
            color: "#6A816B",
            fontWeight: 400,
            fontSize: 15.2,
            lineHeight: 1.5,
            borderTop: "1px solid #F2F6F5",
            paddingTop: 12
          }}
        >
          {description}
        </div>
      )}
    </button>
  );
}
