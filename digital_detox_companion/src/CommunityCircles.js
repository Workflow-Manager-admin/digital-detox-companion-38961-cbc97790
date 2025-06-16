import React from "react";

/**
 * Community Circles component
 * Anonymous, topic-based small groups for support and encouragement.
 * No social metrics or "likes". Only encouragement.
 */
// PUBLIC_INTERFACE
const CommunityCircles = () => (
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
      🫂 Community Circles
    </h2>
    <div style={{ color: "#666", fontSize: 17, marginBottom: 16 }}>
      Join small, anonymous groups for encouragement — <b>no likes, no follows.</b>
      <br />
      Respectful, positive support only.
    </div>
    {/* TODO: Topic selection, group enrollment, anonymous encouragement */}
    <div style={{ margin: "36px 0 0", color: "#BBB", fontStyle: "italic" }}>
      (Topic-based discussion and group encouragement coming soon!)
    </div>
  </div>
);

export default CommunityCircles;
