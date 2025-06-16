import React from "react";

/**
 * Digital Budget Mode component
 * Set, track, and allocate your weekly screen time "budget".
 * Includes optional rollover and allocation logic (to be implemented).
 */
// PUBLIC_INTERFACE
const DigitalBudgetMode = () => (
  <div style={{
    padding: "2.5rem 0",
    minHeight: 420,
    textAlign: "center",
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 2px 16px #e8f5e94a",
    marginTop: 32
  }}>
    <h2 style={{ color: "#2E7D32", fontWeight: 700, fontSize: 28, margin: "0 0 18px" }}>
      💡 Digital Budget Mode
    </h2>
    <div style={{ color: "#666", fontSize: 17, marginBottom: 16 }}>
      Set a weekly screen time budget.<br/>
      <span style={{ color: "#FFD600", fontWeight: 500 }}>
        Track use, allocate time by activity, and manage rollover!
      </span>
    </div>
    {/* TODO: Budget setup, allocation, tracking logic */}
    <div style={{ margin: "36px 0 0", color: "#BBB", fontStyle: "italic" }}>
      (Budget planner and rollover allocation features in progress)
    </div>
  </div>
);

export default DigitalBudgetMode;
