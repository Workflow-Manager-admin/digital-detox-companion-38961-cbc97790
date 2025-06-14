import React from "react";

// PUBLIC_INTERFACE
/**
 * Dashboard/Home page for Digital Detox Companion.
 * Displays:
 * 1. Main app description
 * 2. Why/Use Case
 * 3. Unique Features list
 */
function Dashboard() {
  // There should be no reference to PUBLIC_URL in this file.
  return (
    <section style={{
      background: "#FFFFFF",
      borderRadius: 16,
      boxShadow: "0 3px 16px rgba(30,50,45,0.03)",
      padding: "40px 5vw 32px 5vw",
      margin: "0 auto",
      marginTop: 35,
      maxWidth: 760,
      minWidth: 0,
      border: "1px solid #E7F6EC",
      color: "#1A1A1A"
    }}>
      <h1 className="title" style={{
        fontSize: "2.2rem",
        fontWeight: 700,
        color: "#2E7D32",
        marginBottom: 14,
        letterSpacing: "-0.01em"
      }}>
        Welcome to Digital Detox Companion
      </h1>
      <p className="description" style={{
        fontSize: "1.18rem",
        lineHeight: 1.65,
        marginBottom: 25,
        color: "#34563d"
      }}>
        Digital Detox Companion is a multipage web app that helps users reduce social media usage and improve digital wellbeing through personalized detox plans, accountability, real-world rewards, and mindful offline activities. It minimizes in-app engagement to encourage healthier habits.
      </p>
      <div style={{
        margin: "30px 0",
        background: "#B2DFDB22",
        borderRadius: 12,
        padding: "22px 18px"
      }}>
        <h2 style={{
          fontSize: "1.13rem",
          color: "#FFD600",
          background: "#2E7D32",
          display: "inline-block",
          fontWeight: 600,
          borderRadius: 7,
          padding: "3px 16px 4px",
          margin: 0,
          letterSpacing: "0.02em"
        }}>
          Why this app?
        </h2>
        <p style={{
          color: "#356156",
          fontSize: "1.04rem",
          margin: "13px 0 0"
        }}>
          Excessive screen time and social media usage can reduce productivity, increase stress, and negatively affect real-world relationships. Digital Detox Companion empowers users to reclaim their time, be more present, and build a balanced relationship with technology.
        </p>
      </div>
      <div style={{ marginTop: 20 }}>
        <h2 style={{
          fontSize: "1.1rem",
          color: "#2E7D32",
          fontWeight: 600,
          marginBottom: 12,
          letterSpacing: "0.01em"
        }}>
          🌟 Unique Features
        </h2>
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          columns: 2,
          fontSize: "1.01rem"
        }}>
          <li style={{marginBottom: 14}}><span role="img" aria-label="">🗺️</span> Personalized Digital Detox Plans</li>
          <li style={{marginBottom: 14}}><span role="img" aria-label="">🤝</span> Accountability Buddy System</li>
          <li style={{marginBottom: 14}}><span role="img" aria-label="">🎁</span> Milestone Rewards for Offline Achievements</li>
          <li style={{marginBottom: 14}}><span role="img" aria-label="">✅</span> Off-grid Activity Check-ins</li>
          <li style={{marginBottom: 14}}><span role="img" aria-label="">📖</span> AI-Powered Reflection & Habit Journal</li>
          <li style={{marginBottom: 14}}><span role="img" aria-label="">⏳</span> Time Reallocation Tracker</li>
          <li style={{marginBottom: 14}}><span role="img" aria-label="">🛡️</span> Flexible Detox Modes (Gradual, Retreat, Focus Burst)</li>
          <li style={{marginBottom: 14}}><span role="img" aria-label="">🌲</span> Offline Event Generator (uses local data and interests)</li>
          <li style={{marginBottom: 14}}><span role="img" aria-label="">🎮</span> Non-addictive Mini Detox Games/Tasks</li>
          <li style={{marginBottom: 14}}><span role="img" aria-label="">👨‍👩‍👧</span> Parent-Teen Mode with family features</li>
          <li style={{marginBottom: 14}}><span role="img" aria-label="">💰</span> Digital Budget Mode (weekly screen time planning)</li>
          <li style={{marginBottom: 14}}><span role="img" aria-label="">🫂</span> Supportive Community Circles</li>
        </ul>
      </div>
      <div style={{
        textAlign: "center",
        marginTop: 48,
        color: "#2E7D32",
        fontSize: "1.15rem",
        fontWeight: 400
      }}>
        <span role="img" aria-label="tree">🌳</span> Begin your journey toward a healthier digital life!
      </div>
    </section>
  );
}

export default Dashboard;
