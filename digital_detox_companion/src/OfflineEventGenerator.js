import React from "react";

/**
 * Offline Event Generator component
 * Suggests offline local events using interests/location.
 * API integration (for real events) stubbed.
 */
// PUBLIC_INTERFACE
const OfflineEventGenerator = () => (
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
      🎟️ Offline Event Generator
    </h2>
    <div style={{ color: "#666", fontSize: 17, marginBottom: 18 }}>
      Find local events to explore when unplugged.<br/>
      Enter your interests & location (feature coming soon).
    </div>
    {/* TODO: Interest/location form and event API calls */}
    <div style={{ margin: "36px 0 0", color: "#BBB", fontStyle: "italic" }}>
      (Offline event suggestions will appear here – API/data integration in development)
    </div>
  </div>
);

export default OfflineEventGenerator;
