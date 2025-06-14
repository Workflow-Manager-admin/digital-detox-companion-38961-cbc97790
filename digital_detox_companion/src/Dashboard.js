import React from "react";

/**
 * Dashboard/Home page for Digital Detox Companion app.
 * Shows overview, mission, and core progress.
 */
// PUBLIC_INTERFACE
function Dashboard() {
  return (
    <div style={{ padding: "44px 0 16px 0" }}>
      <h1
        style={{
          fontSize: 34,
          fontWeight: 700,
          marginBottom: 8,
          letterSpacing: "0.02em",
          color: "#2E7D32",
        }}
      >
        Welcome to Digital Detox Companion
      </h1>
      <p
        className="description"
        style={{
          fontSize: 20,
          lineHeight: 1.5,
          marginBottom: 22,
          maxWidth: 620,
          color: "#1A1A1A",
          fontWeight: 400,
          opacity: 0.97,
        }}
      >
        Break free from endless scrolling and rediscover what matters most. <b>Digital Detox Companion</b> is your mission-driven guide to reclaiming your time, mental clarity, and real-world connections. With personalized detox plans, anonymous accountability buddies, and real-world rewards, we empower you to take meaningful steps towards a healthier, more intentional digital life.
        <br />
        <br />
        Our mission: help you build a balanced relationship with technology, one offline moment at a time. Start your journey today—because your best moments happen when you look up.
      </p>
      
      <div
        style={{
          marginTop: 36,
          marginBottom: 10,
          display: "flex",
          flexWrap: "wrap",
          gap: 28,
        }}
      >
        <div style={{
          background: "#F6FBF9",
          border: "1px solid #DFE9E4",
          padding: 24,
          borderRadius: 14,
          minWidth: 260,
          flex: "1 1 230px",
          boxShadow: "0 4px 18px rgba(44,127,67,0.03)",
        }}>
          <span style={{ fontSize: 30, marginRight: 8 }}>🗺️</span>
          <span style={{ fontWeight: 700, color: "#20542d" }}>Personalized Plans</span>
          <div style={{ fontSize: 16, marginTop: 3, color: "#2E7D32", opacity: 0.86 }}>
            Gradually reduce screen time with plans fit to your goals.
          </div>
        </div>
        <div style={{
          background: "#FFFCEA",
          border: "1px solid #FFEDB6",
          padding: 24,
          borderRadius: 14,
          minWidth: 260,
          flex: "1 1 230px",
          boxShadow: "0 4px 18px rgba(127,107,44,0.04)",
        }}>
          <span style={{ fontSize: 30, marginRight: 8 }}>🤝</span>
          <span style={{ fontWeight: 700, color: "#A68B00" }}>Buddy Accountability</span>
          <div style={{ fontSize: 16, marginTop: 3, color: "#AC8800", opacity: 0.86 }}>
            Support each other anonymously along your detox journey.
          </div>
        </div>
        <div style={{
          background: "#ECF9FE",
          border: "1px solid #B6E6FF",
          padding: 24,
          borderRadius: 14,
          minWidth: 260,
          flex: "1 1 230px",
          boxShadow: "0 4px 18px rgba(44,90,127,0.04)",
        }}>
          <span style={{ fontSize: 30, marginRight: 8 }}>🎁</span>
          <span style={{ fontWeight: 700, color: "#006684" }}>Earn Real Rewards</span>
          <div style={{ fontSize: 16, marginTop: 3, color: "#006684", opacity: 0.86 }}>
            Celebrate real progress: unlock milestone rewards as you reclaim your life.
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 48,
        marginBottom: 16,
        fontSize: 17.5,
        color: "#225a36",
        opacity: 0.92,
        maxWidth: 600
      }}>
        <span style={{ fontWeight: 600 }}>Why Digital Detox?</span> <br />
        Technology should empower, not distract. If you feel overwhelmed, disconnected, or simply want to make more time for meaningful moments, this is your starting line.
      </div>
    </div>
  );
}

export default Dashboard;
