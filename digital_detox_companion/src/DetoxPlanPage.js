import React, { useState } from "react";

// Color palette and theme variables (consistent with app)
const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  bg: "#fff",
  text: "#1A1A1A",
};

// PUBLIC_INTERFACE
function DetoxPlanPage({ showToast }) {
  // Example plan and progress state (replace with real data integration as needed)
  const [plan, setPlan] = useState({
    title: "Social Media Detox",
    description: "Reduce social media use gradually for lasting change.",
    totalDays: 21,
    completedDays: 5,
    streak: 3, // consecutive days
    nextMilestone: 7, // days for next reward
    goals: [
      { label: "No social media after 8pm", completed: true },
      { label: "Max 1hr per day", completed: false },
      { label: "Daily real-world activity", completed: false },
    ],
    badges: [
      { name: "Starter", earned: true, icon: "🌱", color: COLORS.primary, description: "Joined Detox" },
      { name: "3-Day Streak", earned: true, icon: "🔥", color: COLORS.accent, description: "3 Days In A Row" },
      { name: "Milestone: Week 1", earned: false, icon: "🥇", color: COLORS.secondary, description: "7 Days Detox" },
    ],
    points: 350,
    level: 2, // assume 200 points per level
  });

  // UI interactions for quick actions
  function handleQuickCheck(dayComplete = false) {
    if (dayComplete) {
      showToast && showToast("Great job! Streak extended. 🔥", "success");
      setPlan((prev) => ({
        ...prev,
        completedDays: prev.completedDays + 1,
        streak: prev.streak + 1,
        points: prev.points + 50,
        level: Math.floor((prev.points + 50) / 200) + 1
      }));
    } else {
      showToast && showToast("Challenge for today: Minimize scrolling tonight!", "info");
    }
  }

  // Render progress bar for plan duration
  const dayProgress = Math.min(plan.completedDays / plan.totalDays, 1);

  // Render progress toward next milestone
  const milestoneProgress = Math.min((plan.completedDays % plan.nextMilestone) / plan.nextMilestone, 1);

  // Points/level system
  const nextLevelPts = (plan.level * 200);

  // PUBLIC_INTERFACE
  function ProgressBar({ percent, color, accent, label }) {
    return (
      <div style={{ width: "100%", margin: "10px 0 2px" }}>
        <div
          style={{
            background: "#F2F6F5",
            borderRadius: 8,
            position: "relative",
            height: 16,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(44,127,67,0.045)"
          }}
          aria-label={label}
        >
          <div
            style={{
              width: `${Math.round(percent * 100)}%`,
              background: `linear-gradient(90deg, ${color}, ${accent})`,
              height: "100%",
              transition: "width 0.7s cubic-bezier(.48,.13,0,1)",
              borderRadius: 8,
            }}
          />
          <span style={{
            position: "absolute",
            right: 12,
            top: 1,
            fontSize: "0.83rem",
            color: COLORS.primary,
            opacity: 0.7,
            fontWeight: 500,
          }}>
            {Math.round(percent * 100)}%
          </span>
        </div>
        {label && (
          <div style={{
            fontSize: 13,
            marginTop: 3,
            color: "#789262"
          }}>
            {label}
          </div>
        )}
      </div>
    );
  }

  // PUBLIC_INTERFACE
  function Badge({ icon, color, name, earned, description }) {
    return (
      <div
        title={description}
        style={{
          opacity: earned ? 1 : 0.38,
          background: "#fafafa",
          border: `2px solid ${color}`,
          borderRadius: 16,
          minWidth: 68,
          margin: "0 8px 8px 0",
          display: "inline-block",
          verticalAlign: "top",
          textAlign: "center",
          boxShadow: earned
            ? "0 4px 18px 0 rgba(44,127,67,0.06)"
            : undefined,
          transition: "box-shadow 0.25s",
        }}
      >
        <div
          style={{
            fontSize: 28,
            margin: "10px 0 0",
            color: color,
            filter: earned ? "none" : "grayscale(75%) blur(0.5px)",
            transition: "filter 0.3s",
          }}
        >
          {icon}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            margin: "3px 0",
            color: "#334C2F",
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: 11, color: "#789262", minHeight: 20, padding: "0 4px 4px" }}>
          {description}
        </div>
      </div>
    );
  }

  // PUBLIC_INTERFACE
  function FunFeedback({ plan }) {
    // Celebrate streaks, milestones, or level-ups dynamically
    if (plan.streak && plan.streak > 0 && plan.streak % 7 === 0) {
      return (
        <div style={{
          background: COLORS.accent,
          color: COLORS.primary,
          borderRadius: 14,
          fontWeight: 600,
          margin: "18px 0 0",
          padding: "13px 20px 10px",
          fontSize: "1.06rem",
          boxShadow: "0 2px 18px #FFD70033",
          textAlign: "center"
        }}>
          🎉 One week streak! Celebrate with a real-world treat!
        </div>
      );
    }
    if (plan.completedDays === plan.nextMilestone) {
      return (
        <div style={{
          background: COLORS.secondary,
          color: COLORS.primary,
          borderRadius: 12,
          padding: "10px",
          margin: "20px 0 0",
          textAlign: "center",
          fontWeight: 500,
          boxShadow: "0 1px 10px #B2DFDB55"
        }}>
          🥇 Milestone unlocked! Time for a reward—go outside!
        </div>
      );
    }
    if ((plan.points % 200) === 0 && plan.points !== 0) {
      return (
        <div style={{
          background: COLORS.primary,
          color: "#fff",
          borderRadius: 13,
          padding: "10px 20px",
          margin: "13px 0 0",
          textAlign: "center",
          fontWeight: 600,
          boxShadow: "0 1px 8px #2E7D3220"
        }}>
          🚀 Level Up! You’re now Level {plan.level}
        </div>
      );
    }
    return null;
  }

  // Minimal distraction real-life prompt zone
  function RealWorldPrompt() {
    return (
      <div
        style={{
          border: `1px dashed ${COLORS.primary}`,
          margin: "22px 0 4px",
          borderRadius: 10,
          padding: "14px 13px",
          background: "#f3fbe8",
          textAlign: "center",
        }}>
        🌳 Step away: Plan an outdoor activity today.<br />
        <button
          onClick={() => showToast && showToast("Enjoy fresh air and sunshine!", "success")}
          style={{
            border: 0,
            background: COLORS.accent,
            color: COLORS.primary,
            fontWeight: 700,
            borderRadius: 8,
            padding: "7px 24px",
            margin: "10px 0 0 0",
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 1px 3px #eef2e027"
          }}>
          Log Real-World Activity
        </button>
      </div>
    );
  }

  // Actionable quick prompts (no modals)
  function ActionPrompts() {
    return (
      <div
        style={{
          display: "flex",
          gap: 9,
          margin: "18px 0 5px 0",
          flexWrap: "wrap",
        }}>
        <button
          onClick={() => handleQuickCheck(true)}
          style={{
            background: COLORS.primary,
            color: "#fff",
            fontWeight: 600,
            border: 0,
            borderRadius: 8,
            padding: "9px 22px",
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 1px 6px #b2dfdb49",
            transition: "background .19s"
          }}
        >
          ✔️ Check off today!
        </button>
        <button
          onClick={() => handleQuickCheck(false)}
          style={{
            background: COLORS.accent,
            color: COLORS.primary,
            fontWeight: 600,
            border: 0,
            borderRadius: 8,
            padding: "9px 17px",
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 1px 6px #e87a411a",
            transition: "background .19s"
          }}
        >
          💡 Challenge Prompt
        </button>
        <div style={{ fontSize: 12, color: "#789262", alignSelf: "center", marginLeft: 5 }}>
          Keep the momentum!
        </div>
      </div>
    );
  }

  return (
    <div
      className="detox-plan-page"
      style={{
        padding: "38px 0 54px",
        background: COLORS.bg,
        minHeight: 450,
        color: COLORS.text,
        fontFamily: "Inter, Roboto, Arial, sans-serif"
      }}
      aria-label="Detox Plan Section"
    >
      <h1 style={{
        color: COLORS.primary,
        fontWeight: 800,
        letterSpacing: "0.01em",
        fontSize: 28,
        marginBottom: 4,
      }}>
        {plan.title} 🗺️
      </h1>
      <div style={{
        fontSize: 18,
        color: "#395d34",
        marginBottom: 21,
        maxWidth: 520,
        fontWeight: 400,
      }}>
        {plan.description}
      </div>

      {/* Plan & milestone progress */}
      <div style={{ maxWidth: 600, marginBottom: 11 }}>
        <ProgressBar
          percent={dayProgress}
          color={COLORS.primary}
          accent={COLORS.secondary}
          label={`Total Progress: Day ${plan.completedDays} of ${plan.totalDays}`}
        />
        <ProgressBar
          percent={milestoneProgress}
          color={COLORS.accent}
          accent={COLORS.primary}
          label={`Next Milestone: ${plan.nextMilestone - (plan.completedDays % plan.nextMilestone)} days to go`}
        />
      </div>

      {/* Gamified Goals */}
      <div style={{ marginBottom: 15 }}>
        <div style={{ fontWeight: 600, color: COLORS.primary, marginBottom: 2 }}>
          🔎 Daily Goals
        </div>
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 18px",
        }}>
          {plan.goals.map((goal, idx) => (
            <li key={goal.label} style={{
              textDecoration: goal.completed ? "line-through" : undefined,
              opacity: goal.completed ? 0.65 : 1,
              color: COLORS.text,
              background: "#e4f3e4",
              border: `1.6px solid ${goal.completed ? COLORS.primary : COLORS.accent}`,
              borderRadius: 8,
              padding: "8px 14px",
              fontWeight: 500,
              fontSize: 14.2,
              minWidth: 120,
              boxShadow: goal.completed
                ? undefined
                : `0 2px 8px #FFD60022`,
              transition: "background 0.25s",
              cursor: "pointer"
            }}>
              {goal.completed ? "✅" : "⬜️"} {goal.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Points/Level-up + Badges */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 17,
        margin: "16px 0 7px"
      }}>
        <div style={{
          background: "#fffde4",
          border: `2.2px solid ${COLORS.accent}`,
          borderRadius: 9,
          fontWeight: 700,
          color: COLORS.primary,
          fontSize: 18.5,
          padding: "7px 19px 7px 9px",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 1px 7px #FFD60022",
        }}>
          <span style={{
            fontSize: 23,
            marginRight: 8,
          }}>✨</span>
          <span>{plan.points}</span>
          <span style={{
            fontSize: 13,
            color: "#b2b2b2",
            marginLeft: 6,
            fontWeight: 400
          }}>pts</span>
        </div>
        <div style={{
          background: COLORS.primary,
          color: "#fff",
          borderRadius: 7,
          padding: "6px 13px 6px 13px",
          fontWeight: 600,
          fontSize: 15.5,
          letterSpacing: 0.06,
          boxShadow: "0 2px 8px #2e7d3221",
          display: "inline-flex",
          alignItems: "center"
        }}>
          <span style={{
            fontSize: 18,
            marginRight: 6,
          }}>⬆️</span>
          Level {plan.level}
          <span style={{
            fontSize: 12,
            marginLeft: 7,
            color: COLORS.secondary
          }}>
            {Math.max(0, nextLevelPts - plan.points)} pts to next
          </span>
        </div>
      </div>

      {/* Display badges/rewards */}
      <div style={{ margin: "7px 0 12px" }}>
        <div style={{
          fontWeight: 600,
          margin: "4px 0 6px",
          color: "#395d34"
        }}>
          Badges & Rewards:
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
          {plan.badges.map(badge =>
            <Badge
              key={badge.name}
              icon={badge.icon}
              color={badge.color}
              name={badge.name}
              earned={badge.earned}
              description={badge.description}
            />
          )}
        </div>
      </div>

      {/* Interactive streak/milestone system */}
      <div style={{
        background: "#F7FDF7",
        border: "1.5px solid #E7F6EC",
        borderRadius: 12,
        padding: "13px 15px",
        margin: "14px 0",
        color: "#395d34",
        boxShadow: "0 1px 4px #b2dfdb12"
      }}>
        <span style={{ fontWeight: 700, color: COLORS.primary }}>
          🔥 Streak: {plan.streak} day{plan.streak !== 1 ? "s" : ""}
        </span>{" "}
        <span style={{ marginLeft: 9 }}>
          Next reward at {plan.nextMilestone}-day mark!
        </span>
        <div style={{ fontSize: 14, marginTop: 7, color: "#23965F" }}>
          Keep up your streak to unlock more badges. Missing a day <b>resets</b> your streak!
        </div>
      </div>

      {/* Fun, dynamic feedback */}
      <FunFeedback plan={plan} />

      {/* Interactive action area */}
      <ActionPrompts />

      {/* Minimal distraction / real-world engagement prompt */}
      <RealWorldPrompt />

      {/* Callout for clean UI */}
      <div style={{
        borderTop: `1.5px solid #e8f3eb`,
        margin: "34px 0 0",
        paddingTop: 10,
        fontSize: 13.6,
        color: "#B8B8B8",
        textAlign: "center"
      }}>
        Progress is best made offline. Close the app and live your day!
      </div>
    </div>
  );
}

export default DetoxPlanPage;
