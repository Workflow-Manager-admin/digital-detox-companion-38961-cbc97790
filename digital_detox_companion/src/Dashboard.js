import React from "react";

/**
 * Dashboard/Home page for Digital Detox Companion
 * Shows a unique, mission-oriented description.
 */
// PUBLIC_INTERFACE
export default function Dashboard() {
  return (
    <div style={{ padding: "48px 0 0 0" }}>
      <h1 className="title" style={{ fontWeight: 900, fontSize: 38, color: "#2E7D32" }}>
        Welcome to Your Digital Detox Companion
      </h1>
      <p className="description" style={{ fontSize: 19, color: "#444", maxWidth: 620, margin: "18px 0 40px" }}>
        Digital Detox Companion is your supportive guide toward healthier screen habits and a more present life.
        We combine science-backed detox plans, real-world milestone rewards, and an anonymous buddy system to help you break free from digital overload.
        Discover the joy of meaningful offline moments, celebrate every small victory, and build lasting habits that truly matter. Start your journey—reconnect with yourself, others, and the world beyond your device.
      </p>

      {/* Add future summary stats/components below */}
    </div>
  );
}
