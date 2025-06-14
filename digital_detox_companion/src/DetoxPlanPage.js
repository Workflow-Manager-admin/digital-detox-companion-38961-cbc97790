import React, { useState } from "react";

/**
 * DetoxPlanPage - Personalized Digital Detox Plan Overview Page.
 * @param {object} props
 * @param {function} [props.showToast] - Function to trigger a toast message.
 */
// PUBLIC_INTERFACE
function DetoxPlanPage({ showToast }) {
  // Example plan state and streaks
  const [plan, setPlan] = useState({
    goal: "2 hours max/day of social media",
    startDate: "2024-05-10",
    duration: 14,
    completed: 8,
    activities: [
      "Walk 30 min daily",
      "Check phone only twice before noon",
      "One full off-grid Saturday"
    ]
  });

  // Handler for playful CTA (Start Today/Edit Plan)
  const handleStartOrEdit = () => {
    if (showToast) showToast("🔒 Digital Detox started! Good luck!", "success");
  };

  // Progress: completed days / total
  const progress = Math.min(1, plan.completed / plan.duration);

  // Playful mascot
  const mascot = "🦥";

  return (
    <div style={{paddingTop:20}}>
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 20
      }}>
        <span style={{ fontSize: 54, marginRight: 14 }}>{mascot}</span>
        <div style={{flex:1}}>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: 30 }}>
            Your Detox Plan
          </h2>
          <p style={{ color: "#789262", fontWeight: 500, fontSize: 15 }}>
            🌱 {plan.goal} <br />
            ⏱ Duration: {plan.duration} days
          </p>
          <div style={{
            background: "#B2DFDB22",
            borderRadius: 10,
            padding: 16,
            marginBottom: 12,
            boxShadow: "0 1px 4px rgba(44,127,67,0.06)"
          }}>
            <div style={{ color: "#2E7D32", fontWeight: 600, marginBottom: 3 }}>
              Activities:
            </div>
            <ul style={{ margin: 0, paddingLeft: 19, color: "#1A1A1Abb" }}>
              {plan.activities.map((act, i) => (
                <li key={i} style={{marginBottom:2}}>{act}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Progress/streak bar */}
      <div style={{margin: "16px 0 4px"}}>
        <div style={{
          height:12, background:"#E7F6EC", borderRadius:9,
          width:"100%", overflow:"hidden", marginBottom:3
        }}>
          <div style={{
            height: "100%",
            width: `${Math.round(progress * 100)}%`,
            background: "linear-gradient(90deg, #2E7D32, #B2DFDB 90%)",
            transition: "width 0.5s cubic-bezier(.42,0,.2,1)"
          }} />
        </div>
        <div style={{color:"#789262", fontSize:13}}>
          {plan.completed} / {plan.duration} days completed
        </div>
      </div>
      {/* Playful cta */}
      <button
        className="btn btn-large"
        style={{
          marginTop: 18,
          background: "#FFD600",
          color: "#1A1A1A",
          fontWeight: 600,
          fontSize: 18,
          padding: "13px 36px",
          borderRadius: 15,
          border: "none",
          cursor: "pointer",
          letterSpacing: ".01em",
          boxShadow: "0 2px 10px rgba(190,197,95,0.07)"
        }}
        onClick={handleStartOrEdit}
        tabIndex={0}
      >
        {plan.completed === 0 ? "Start Today!" : "Edit Plan"}
      </button>
    </div>
  );
}

export default DetoxPlanPage;
