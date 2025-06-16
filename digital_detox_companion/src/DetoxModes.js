import React from "react";

/**
 * Flexible Detox Modes component
 * Users select from Gradual Decline, Weekend Retreat, or Focus Burst modes.
 * Display option choice and summary.
 */
// PUBLIC_INTERFACE
const DetoxModes = () => (
  <div style={{
    padding: "2.5rem 0",
    minHeight: 430,
    textAlign: "center",
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 2px 16px #e8f5e94a",
    marginTop: 32
  }}>
    <h2 style={{ color: "#2E7D32", fontWeight: 700, fontSize: 28, margin: "0 0 18px" }}>
      🔄 Flexible Detox Modes
    </h2>
    <div style={{ color: "#666", fontSize: 17, marginBottom: 18 }}>
      Choose a detox journey that fits your lifestyle:<br />
      <span style={{ fontWeight: 500 }}>
        Gradual Decline · Weekend Retreat · Focus Burst
      </span>
    </div>
    {/* TODO: Let user select a mode and show explanation */}
    <div style={{ margin: "36px 0 0", color: "#BBB", fontStyle: "italic" }}>
      (Interactive mode-selection, explanations, and scheduling coming soon!)
    </div>
  </div>
);
export default DetoxModes;
