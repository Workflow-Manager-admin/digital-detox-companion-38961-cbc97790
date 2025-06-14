import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * DetoxPlanPage - Personalized Digital Detox Plan page
 * Minimal/light theme and playful encouragement.
 * @param {function} showToast - optional toast function for feedback
 */
function DetoxPlanPage({ showToast }) {
  const [plan, setPlan] = useState({
    title: "Your Social Detox Plan",
    days: 7,
    reductionGoal: 35, // % less screen
    challenge: "No social media after 8pm",
    progress: 0.2,
    tips: [
      "Leave devices outside your room at night.",
      "Plan a daily outdoor walk.",
      "Replace scrolling time with a favorite book.",
    ],
  });
  const [completed, setCompleted] = useState(false);

  const handleCheckin = () => {
    setCompleted(true);
    showToast && showToast("🎉 Nice check-in! Stay strong for your detox goals!", "success");
  };

  return (
    <div style={{
      background: "#fafcfb",
      borderRadius: 13,
      boxShadow: "0 2px 14px #e7f6ec60,0 1px 0 #fff2",
      padding: 24, maxWidth: 520, margin: "18px auto"
    }}>
      <h2 style={{ color: "#2E7D32", marginBottom: 5, fontWeight: 700 }}>{plan.title} 🗺️</h2>
      <div style={{ color: "#789262", fontSize: 17, marginBottom: 16 }}>
        {plan.days}-day Challenge: <b style={{ color: "#2E7D32" }}>{plan.reductionGoal}% less screen time</b>
      </div>
      <div style={{ marginBottom: 16, fontSize: 16, color: "#444" }}>
        <b style={{ color: "#FFD600" }}>🌟 Challenge:</b> <span>{plan.challenge}</span>
      </div>
      <ProgressBar progress={plan.progress + (completed ? 0.11 : 0)} />

      <div style={{ margin: "24px 0 8px", fontWeight: 600, color: "#2E7D32", fontSize: 15 }}>
        Pro-tips:
      </div>
      <ul style={{ marginBottom: 12, paddingLeft: 18, color: "#53663A" }}>
        {plan.tips.map((tip, i) => (
          <li style={{ marginBottom: 6 }} key={i}>{tip}</li>
        ))}
      </ul>

      <button
        className="btn"
        style={{
          background: completed ? "#b2dfdb" : "#2E7D32",
          color: completed ? "#456141" : "white",
          border: "none", borderRadius: 6, padding: "12px 22px",
          fontWeight: 600, fontSize: 16, cursor: completed ? "not-allowed" : "pointer",
          opacity: completed ? 0.85 : 1,
          marginTop: 12,
        }}
        onClick={handleCheckin}
        disabled={completed}
      >
        {completed ? "Checked In ✔️" : "Check In for Today"}
      </button>
      <div style={{ marginTop: 18, color: "#FFD600", fontWeight: 500, fontSize: 15 }}>
        {completed ? "You’re on a roll! 🎉" : "Small wins, big change. Keep going! 🚀"}
      </div>
    </div>
  );
}

// Minimal ProgressBar (matches App.js style)
function ProgressBar({ progress }) {
  return (
    <div style={{ marginBottom: 0, width: "100%" }}>
      <div style={{
        background: "#E7F6EC",
        borderRadius: 8,
        overflow: "hidden",
        height: 13,
        position: "relative"
      }}>
        <div style={{
          width: `${Math.round(progress * 100)}%`,
          background: `linear-gradient(90deg,#2E7D32,#B2DFDB)`,
          height: "100%",
          transition: "width 0.7s cubic-bezier(.4,0,.2,1)"
        }} />
      </div>
      <div style={{
        marginTop: 2,
        fontSize: 13,
        color: "#789262"
      }}>
        {Math.round(progress * 100)}% to goal
      </div>
    </div>
  );
}

export default DetoxPlanPage;
