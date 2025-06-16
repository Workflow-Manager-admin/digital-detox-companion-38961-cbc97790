import React from "react";

/**
 * Parent-Teen Mode component
 * Shared dashboards, family challenges, encouragement for multi-user detox.
 */
// PUBLIC_INTERFACE
const ParentTeenMode = () => (
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
      👨‍👩‍👧 Parent-Teen Mode
    </h2>
    <div style={{ color: "#666", fontSize: 17, marginBottom: 16 }}>
      Pair with a parent/teen for shared progress and family challenges.<br/>
      <span style={{ color: "#FFD600", fontWeight: 500 }}>
        Encourage each other on your digital break!
      </span>
    </div>
    {/* TODO: Pairing and family dashboard */}
    <div style={{ margin: "36px 0 0", color: "#BBB", fontStyle: "italic" }}>
      (Family dashboard and mutual encouragement coming soon!)
    </div>
  </div>
);

export default ParentTeenMode;
