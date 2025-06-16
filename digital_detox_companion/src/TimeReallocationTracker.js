import React from "react";

/**
 * Time Reallocation Tracker component
 * Users log alternative (offline) activities and see weekly "What You Gained" reports.
 * Placeholder for future integration (charts, progress summaries).
 */
// PUBLIC_INTERFACE
const TimeReallocationTracker = () => (
  <div style={{
      padding: "2.5rem 0",
      minHeight: 440,
      textAlign: "center",
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 16px #e8f5e94a",
      marginTop: 32
  }}>
    <h2 style={{ color: "#2E7D32", fontWeight: 700, fontSize: 28, margin: "0 0 18px" }}>
      ⏳ Time Reallocation Tracker
    </h2>
    <p style={{ fontSize: 17, color: "#789262", margin: "0 0 18px" }}>
      Log meaningful offline activities you've done instead of scrolling.<br />
      <strong>See your weekly "What You Gained" summary here soon!</strong>
    </p>
    {/* TODO: Logging UI and weekly gains report */}
    <div style={{
      margin: "32px 0 0", color: "#BBB", fontStyle: "italic"
    }}>
      (Module under construction – personalized logs, charts, and gains insights coming soon!)
    </div>
  </div>
);

export default TimeReallocationTracker;
