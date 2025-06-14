import React, { useState } from "react";

/**
 * DetoxPlanPage - Personalized Detox Plan
 * Minimal, playful UI showing user's digital detox plan and progress.
 * @param {function} showToast - Function to display toast messages (feedback).
 */
// PUBLIC_INTERFACE
function DetoxPlanPage({ showToast }) {
  // Example plan and progress (could be enhanced with real data)
  const [plan, setPlan] = useState({
    startDate: "Today",
    endDate: "21 Days Later",
    dailyGoal: "Max 1 hour social media",
    extra: "Try one off-screen activity daily!",
  });
  const [progress, setProgress] = useState(0.33); // e.g., 33% through a 21-day plan

  // Playful step tracker logic
  const steps = [
    "Begin Detox",
    "3-Day Streak",
    "1 Week Milestone",
    "Halfway There!",
    "Completed!",
  ];
  const currentStep =
    progress < 0.15
      ? 0
      : progress < 0.4
      ? 1
      : progress < 0.7
      ? 2
      : progress < 1
      ? 3
      : 4;

  // Playful nudge on clicking "Mark Today's Progress"
  const handleButtonClick = () => {
    if (progress < 1) {
      const newProgress = Math.min(1, progress + 0.07 + Math.random() * 0.1);
      setProgress(newProgress);
      showToast &&
        showToast(
          newProgress >= 1
            ? "🎉 Detox Complete! Celebrate screen-free wins!"
            : "Great check-in! Stay strong; every day counts! 🌱",
          "success"
        );
    }
  };

  return (
    <div className="detox-plan-page" style={{ marginTop: 18 }}>
      <h2 style={{ color: "#2E7D32", marginBottom: 6, fontWeight: 600 }}>
        Your Detox Plan
      </h2>
      <div
        style={{
          background: "#F2F6F5",
          padding: 22,
          borderRadius: 16,
          border: "1px solid #E7F6EC",
          margin: "12px 0 16px",
          boxShadow: "0 1px 5px rgba(44,127,67,0.04)",
        }}
      >
        <div>
          <strong>Start:</strong> {plan.startDate}
        </div>
        <div>
          <strong>End:</strong> {plan.endDate}
        </div>
        <div>
          <strong>Daily Goal:</strong> {plan.dailyGoal}
        </div>
        <div style={{ color: "#789262", marginTop: 6, fontStyle: "italic" }}>
          {plan.extra}
        </div>
      </div>
      {/* Playful Progress Steps */}
      <ol
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 12,
          justifyContent: "center",
          listStyle: "none",
          padding: 0,
          marginLeft: 0,
          marginBottom: 16,
        }}
      >
        {steps.map((label, idx) => (
          <li
            key={label}
            className={idx === currentStep ? "active-step" : ""}
            style={{
              background:
                idx === currentStep ? "#FFD600" : "#B2DFDB",
              color: idx === currentStep ? "#2E7D32" : "#356c3d",
              borderRadius: 10,
              padding: "7px 13px",
              fontWeight: idx === currentStep ? 600 : 400,
              fontSize: 14,
              boxShadow:
                idx === currentStep
                  ? "0 2px 5px rgba(44,127,67,0.12)"
                  : "none",
              border:
                idx === currentStep
                  ? "2px solid #2E7D32"
                  : "1px solid #B2DFDB",
              transition: "all 0.15s",
              opacity: idx > currentStep ? 0.55 : 1,
              minWidth: 70
            }}
          >
            {label}
          </li>
        ))}
      </ol>
      {/* Visual Progress Bar */}
      <div style={{ margin: "16px 0 6px" }}>
        <div
          style={{
            background: "#ededed",
            borderRadius: 6,
            height: 14,
            position: "relative",
            overflow: "hidden",
            width: "100%",
            marginBottom: 2,
          }}
        >
          <div
            style={{
              width: `${Math.round(progress * 100)}%`,
              background:
                "linear-gradient(90deg,#2E7D32,#B2DFDB)",
              height: "100%",
              transition: "width 0.7s cubic-bezier(.4,0,.2,1)",
              borderRadius: 6,
            }}
          ></div>
        </div>
        <span style={{ fontSize: 13, color: "#789262" }}>
          {Math.round(progress * 100)}% complete
        </span>
      </div>
      <button
        className="btn"
        style={{
          background: "#FFD600",
          color: "#2E7D32",
          margin: "22px 0 0",
          fontWeight: 600,
          fontSize: "1rem",
          border: "none",
          borderRadius: 8,
          padding: "13px 25px",
          cursor: "pointer",
          boxShadow: "0 1px 8px rgba(89,186,106,0.08)",
          transition: "background 0.15s",
        }}
        onClick={handleButtonClick}
        disabled={progress >= 1}
      >
        {progress < 1 ? "Mark Today's Progress" : "Detox Complete! 🎉"}
      </button>
      <div style={{ marginTop: 18, color: "#B79A5A", fontSize: 15 }}>
        Tip: The less you check this app, the better you’re doing! 🌳
      </div>
    </div>
  );
}

export default DetoxPlanPage;
