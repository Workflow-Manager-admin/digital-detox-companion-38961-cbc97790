import React, { useState } from "react";

/**
 * BuddyStreakSystem
 * Modular entry point for streak widgets, motivational boosts & streak break reflection modal.
 * Place `<BuddyStreakSystem />` inside the Buddy System page or any other relevant area.
 * 
 * PUBLIC_INTERFACE
 */
export default function BuddyStreakSystem({
  streakDays = 5,
  buddyName = "anonbuddy14",
  buddyStatus = "active",
  onBreakReflection = () => {},
  showBuddy = true
}) {
  // Simulated local state (no backend)
  const [currentStreak, setCurrentStreak] = useState(streakDays);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [showBoost, setShowBoost] = useState(false);

  // Resets streak and shows the break modal
  function handleBreakStreak() {
    setShowBreakModal(true);
    setCurrentStreak(0);
  }

  function handleSaveReflection(reflection) {
    setShowBreakModal(false);
    setTimeout(() => {
      if (typeof onBreakReflection === "function") onBreakReflection(reflection);
    }, 100);
  }

  // Simulate reaching motivational streak length
  function simulateLongStreak(boostLen = 7) {
    setCurrentStreak(boostLen);
    setShowBoost(true);
  }

  return (
    <section style={{marginTop:18, marginBottom:8}}>
      <BuddyStreakWidget
        streak={currentStreak}
        buddyName={buddyName}
        buddyStatus={buddyStatus}
        onStreakBreak={handleBreakStreak}
        onStreakBoost={() => simulateLongStreak(14)}
        showBuddy={showBuddy}
      />
      {showBoost &&
        <MotivationalBoost
          streak={currentStreak}
          onDismiss={() => setShowBoost(false)}
        />
      }
      {showBreakModal &&
        <StreakBreakReflectionModal
          onClose={() => setShowBreakModal(false)}
          onSave={handleSaveReflection}
        />
      }
    </section>
  );
}

/**
 * BuddyStreakWidget
 * Displays current buddy streak, buddy info, and actions for break/boost.
 * PUBLIC_INTERFACE
 */
export function BuddyStreakWidget({
  streak,
  buddyName,
  buddyStatus,
  onStreakBreak,
  onStreakBoost,
  showBuddy = true
}) {
  const COLORS = {
    primary: "var(--primary, #2E7D32)",
    accent: "var(--accent, #FFD600)",
    secondary: "var(--secondary, #B2DFDB)"
  };

  // Emoji/yellow flame for streak
  function streakIcon(days) {
    if (days >= 7) return "🔥";
    if (days >= 3) return "🌟";
    if (days === 0) return "🥲";
    return "💧";
  }

  return (
    <div
      style={{
        background: "#F8FBF8",
        border: `1.8px solid ${COLORS.secondary}`,
        borderRadius: 14,
        padding: "19px 23px",
        display: "flex",
        alignItems: "center",
        gap: 22,
        boxShadow: "0 2px 8px 0 rgba(44,127,67,0.02)",
        position: "relative",
        minWidth: 180,
      }}
    >
      <span style={{fontSize:33, verticalAlign:"top", marginRight:9}}>
        {streakIcon(streak)}
      </span>
      <div>
        {showBuddy &&
          <div style={{
            fontWeight: 600,
            color: COLORS.primary,
            marginBottom: 2,
            fontSize: 15.6
          }}>
            With: {buddyName} {" "}
            <span style={{
              fontWeight:400,
              color: "#7a8875",
              fontSize:13.4,
              marginLeft:5
            }}>{buddyStatus === "active" ? "🟢 active" : "🔴 inactive"}</span>
          </div>
        }
        <div style={{
          color: COLORS.primary,
          fontWeight: 500,
          fontSize: 22
        }}>
          {streak > 0
            ? `Streak: ${streak} day${streak !== 1 ? "s" : ""}`
            : "Streak Broken"
          }
        </div>
      </div>
      {/* ACTIONS - demo only */}
      <div style={{marginLeft: "auto", display:"flex",gap:8}}>
        <button
          style={{
            background: COLORS.accent,
            border: "none",
            borderRadius: 6,
            color: "#473500",
            fontWeight: 600,
            fontSize: 14,
            padding: "7px 13px",
            cursor: "pointer",
            opacity: streak === 0 ? 0.56 : 1
          }}
          disabled={streak === 0}
          onClick={onStreakBreak}
          title="Break streak (demo)"
        >Break Streak</button>
        <button
          style={{
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 13,
            padding: "7px 13px",
            cursor: "pointer"
          }}
          onClick={onStreakBoost}
          title="Simulate long streak (demo)"
        >Boost</button>
      </div>
    </div>
  );
}

/**
 * StreakBreakReflectionModal
 * Modal prompting user to reflect on a streak break, simulating shared chat with buddy.
 * PUBLIC_INTERFACE
 */
export function StreakBreakReflectionModal({ onClose, onSave }) {
  const [draft, setDraft] = useState("");
  const COLORS = {
    primary: "var(--primary, #2E7D32)",
    accent: "var(--accent, #FFD600)"
  };
  return (
    <div style={modalStyle}>
      <div style={modalInnerStyle}>
        <h3 style={{ color: COLORS.primary, marginTop: 0 }}>
          Streak Broken 🤝
        </h3>
        <p style={{
          color: "#78848F",
          fontWeight: 500,
          fontSize: "1.03rem",
          margin: "5px 0 10px 0"
        }}>
          Take a moment to reflect. Anything you'd like to share with your buddy?
        </p>
        <textarea
          rows={3}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="Write a quick reflection or message for your buddy…"
          style={{
            width: "100%",
            borderRadius: 8,
            padding: "11px",
            border: "1.5px solid #E5E5CD",
            fontSize: 15,
            marginBottom: 12,
            minHeight: 60,
            outlineColor: COLORS.primary,
            resize: "vertical"
          }}
        />
        <div>
          <button
            style={{
              background: COLORS.primary,
              color: "#fff",
              border: "none",
              borderRadius: 5,
              padding: "9px 22px",
              fontWeight: 500,
              fontSize: 15,
              opacity: draft.length === 0 ? 0.62 : 1,
              marginRight: 8,
              cursor: draft.length === 0 ? "not-allowed" : "pointer"
            }}
            disabled={draft.length === 0}
            onClick={() => onSave(draft)}
          >Share Reflection</button>
          <button
            style={{
              background: "none",
              color: COLORS.primary,
              border: "1.2px solid #B2DFDB",
              borderRadius: 5,
              padding: "8px 13px",
              fontWeight: 500,
              fontSize: 15,
              cursor: "pointer"
            }}
            onClick={onClose}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
}


/**
 * MotivationalBoost
 * Highlight/motivate on hitting milestone streaks (eg. 7/14/21 days).
 * PUBLIC_INTERFACE
 */
export function MotivationalBoost({ streak, onDismiss }) {
  const COLORS = {
    primary: "var(--primary, #2E7D32)",
    accent: "var(--accent, #FFD600)"
  };
  // Example boost messages
  let message = "";
  let boostIcon = "🚀";
  let color = COLORS.primary;
  if (streak >= 21) {
    message = "21 days! That's legendary habit-building 🚀!";
    boostIcon = "🌈";
    color = COLORS.accent;
  } else if (streak >= 14) {
    message = "Two weeks strong—your buddy is proud of your focus 💪!";
    boostIcon = "🔥";
  } else if (streak >= 7) {
    message = "🎉 1 week streak! Celebrate together and keep going!";
    boostIcon = "🎉";
  }

  return (
    <div style={modalStyle}>
      <div style={{ ...modalInnerStyle, minWidth: 230, textAlign: "center", color }}>
        <div style={{ fontSize: 41, marginBottom: 7 }}>{boostIcon}</div>
        <div style={{
          fontWeight: 700,
          fontSize: 17,
          marginBottom: 8,
          color: color
        }}>
          {message}
        </div>
        <button
          autoFocus
          style={{
            marginTop: 6,
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            borderRadius: 7,
            padding: "9px 22px",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer"
          }}
          onClick={onDismiss}
        >Awesome!</button>
      </div>
    </div>
  );
}

// Minimal modal styling
const modalStyle = {
  position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
  background: "rgba(34,40,39,0.18)", display: "flex", alignItems: "center",
  justifyContent: "center", zIndex: 4000
};
const modalInnerStyle = {
  background: "#fff",
  padding: "30px 26px 19px",
  borderRadius: 13,
  boxShadow: "0 3px 30px #B2DFDB22",
  minWidth: 260,
  minHeight: 120,
  maxWidth: 400
};
