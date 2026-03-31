import React, { useState, useEffect, useRef } from "react";
import EmergencyBypassModal, { useEmergencyBypassModal } from "./EmergencyBypassModal";

/**
 * DetoxModes Component
 * Branded, minimal UI for selecting between digital detox modes:
 * - Gradual Decline: Reduce usage over a timespan
 * - Weekend Retreat: Block/limit for a defined weekend window
 * - Focus Burst: Short, intense screen break (e.g. 45–180min)
 * Each mode includes tailored description, configurable timer, and clear visual feedback.
 * PUBLIC_INTERFACE
 */
export default function DetoxModes() {
  // Modes
  const MODES = [
    {
      id: "gradual",
      name: "Gradual Decline",
      icon: "📉",
      desc:
        "Ease down your daily screen time step by step. Good for sustainable habit change.",
      instructions:
        "Set a daily goal and period for tapering off."
    },
    {
      id: "weekend",
      name: "Weekend Retreat",
      icon: "🏕️",
      desc:
        "Commit to a digital-free weekend, focusing on rest, nature, or friends.",
      instructions:
        "Pick your next retreat dates and commit."
    },
    {
      id: "focus",
      name: "Focus Burst",
      icon: "⚡",
      desc:
        "Unplug for a focused block—ideal for studying, work, or creative flow.",
      instructions:
        "Choose a screen-free session length."
    }
  ];

  // State for mode, config, timer, status
  const [selected, setSelected] = useState(null); // mode id
  // For timer logic (focus burst, retreat): different time forms
  const [timerConfig, setTimerConfig] = useState({
    gradualDays: 7,
    gradualInitial: 120,
    gradualGoal: 60,
    weekendStart: getNextWeekend().start,
    weekendEnd: getNextWeekend().end,
    focusMinutes: 45
  });
  const [timer, setTimer] = useState(0); // in seconds
  const [running, setRunning] = useState(false);
  const [countdownDone, setCountdownDone] = useState(false);
  const timerRef = useRef();

  // EmergencyBypassModal (Mindful Pause) state/hook
  const [bypassModalOpen, openBypassModal, closeBypassModal, renderBypassModal] = useEmergencyBypassModal();
  // Store last bypass reason for confirmation (could be logged)
  const [lastBypassReason, setLastBypassReason] = useState(null);
  // After bypass, briefly show confirmation/encouragement
  const [showBypassThanks, setShowBypassThanks] = useState(false);

  // Demo: simulate a bypass trigger
  function handleBypassAttempt() {
    openBypassModal();
  }

  // Called when user selects a bypass reason
  function handleBypassReflection(reason) {
    setLastBypassReason(reason);
    setShowBypassThanks(true);
    setTimeout(() => setShowBypassThanks(false), 2800);
    // In a real app, proceed to "unlock"/bypass OR cancel based on logic
  }

  // Handle starting a timer (focus burst or retreat)
  function startTimer(durationMinutes) {
    setTimer(durationMinutes * 60);
    setCountdownDone(false);
    setRunning(true);
  }

  // Timer effect logic
  useEffect(() => {
    if (!running || timer <= 0) {
      if (timer === 0 && running) setCountdownDone(true);
      setRunning(false);
      return;
    }
    timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [running, timer]);

  // Timer display utility
  function prettyTime(secs) {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // Display for mode-specific form/block
  function renderModeConfigPanel() {
    if (!selected) return null;
    if (selected === "gradual") {
      return (
        <div style={modePanelStyle}>
          <h3 style={{ color: COLORS.primary }}>Set Gradual Decline Plan</h3>
          <div style={formRow}>
            <label>
              Days:{" "}
              <input
                type="number"
                min="3"
                max="30"
                value={timerConfig.gradualDays}
                onChange={e =>
                  setTimerConfig(cfg => ({
                    ...cfg,
                    gradualDays: e.target.value
                  }))
                }
                style={inputStyle}
              />{" "}
              days
            </label>
          </div>
          <div style={formRow}>
            <label>
              Start limit:{" "}
              <input
                type="number"
                min="20"
                max="480"
                value={timerConfig.gradualInitial}
                onChange={e =>
                  setTimerConfig(cfg => ({
                    ...cfg,
                    gradualInitial: e.target.value
                  }))
                }
                style={inputStyle}
              />{" "}
              min/day
            </label>
          </div>
          <div style={formRow}>
            <label>
              End goal:{" "}
              <input
                type="number"
                min="10"
                max={timerConfig.gradualInitial || 120}
                value={timerConfig.gradualGoal}
                onChange={e =>
                  setTimerConfig(cfg => ({
                    ...cfg,
                    gradualGoal: e.target.value
                  }))
                }
                style={inputStyle}
              />{" "}
              min/day
            </label>
          </div>
          <div style={descPanelStyle}>
            Daily screen time will gently decrease from{" "}
            <b>{timerConfig.gradualInitial} min</b> to{" "}
            <b>{timerConfig.gradualGoal} min</b> across{" "}
            <b>{timerConfig.gradualDays} days</b>.
          </div>
        </div>
      );
    }
    if (selected === "weekend") {
      return (
        <div style={modePanelStyle}>
          <h3 style={{ color: COLORS.primary }}>Plan a Weekend Retreat</h3>
          <div style={formRow}>
            <label>
              Retreat start:{" "}
              <input
                type="date"
                value={timerConfig.weekendStart}
                onChange={e =>
                  setTimerConfig(cfg => ({
                    ...cfg,
                    weekendStart: e.target.value
                  }))
                }
                style={inputStyle}
              />
            </label>
          </div>
          <div style={formRow}>
            <label>
              Retreat end:{" "}
              <input
                type="date"
                value={timerConfig.weekendEnd}
                onChange={e =>
                  setTimerConfig(cfg => ({
                    ...cfg,
                    weekendEnd: e.target.value
                  }))
                }
                style={inputStyle}
              />
            </label>
          </div>
          <div style={descPanelStyle}>
            <b>Tip:</b> Try to unplug from <b>Friday {formatDate(timerConfig.weekendStart)}</b> to <b>Sunday {formatDate(timerConfig.weekendEnd)}</b>. Set reminders to prepare!
          </div>
          {/* Timer for active retreat, demo only */}
          {new Date(timerConfig.weekendStart) <= new Date() &&
            new Date(timerConfig.weekendEnd) >= new Date() && (
              <button
                style={timerBtnStyle}
                onClick={() => startTimer(getMinutesUntilDate(timerConfig.weekendEnd))}
              >
                Start Retreat Timer
              </button>
            )}
          {running && (
            <CountdownTimerUI
              timer={timer}
              prettyTime={prettyTime}
              onReset={() => setRunning(false)}
              done={countdownDone}
            />
          )}
        </div>
      );
    }
    if (selected === "focus") {
      return (
        <div style={modePanelStyle}>
          <h3 style={{ color: COLORS.primary }}>Start a Focus Burst</h3>
          <label>
            Minutes:{" "}
            <input
              type="number"
              min="15"
              max="180"
              value={timerConfig.focusMinutes}
              onChange={e =>
                setTimerConfig(cfg => ({
                  ...cfg,
                  focusMinutes: e.target.value
                }))
              }
              style={{ ...inputStyle, width: 64 }}
            />
          </label>
          <button
            style={timerBtnStyle}
            onClick={() => startTimer(timerConfig.focusMinutes)}
          >
            Start Burst
          </button>
          {running && (
            <CountdownTimerUI
              timer={timer}
              prettyTime={prettyTime}
              onReset={() => setRunning(false)}
              done={countdownDone}
            />
          )}
        </div>
      );
    }
    return null;
  }

  return (
    <section style={{ marginTop: 30, marginBottom: 15 }}>
      <h2 style={{ color: COLORS.primary, fontSize: "2.08rem", fontWeight: 700, marginBottom: 9 }}>
        Detox Modes
      </h2>
      <div style={{ color: "#678964", fontWeight: 500, fontSize: "1.06rem", marginBottom: 13 }}>
        Choose a detox approach that matches your goals—sustainable, immersive, or focused!
      </div>
      <div style={{ display: "flex", gap: 22, flexWrap: "wrap", marginBottom: 13 }}>
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            aria-pressed={selected === m.id}
            style={{
              background: selected === m.id ? "#F3FCF9" : "#EFFBFC",
              border: selected === m.id ? `2.5px solid ${COLORS.primary}` : "1.2px solid #ddebef",
              borderRadius: 13,
              padding: "18px 17px",
              minWidth: 166,
              minHeight: 115,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 7,
              fontWeight: selected === m.id ? 700 : 500,
              color: COLORS.primary,
              boxShadow:
                selected === m.id ? "0 2px 8px 0 #B2DFDB18" : "0 2px 8px 0 #b2dfdb08",
              fontSize: 15.5,
              cursor: "pointer"
            }}
          >
            <span style={{ fontSize: 34, marginBottom: 2 }}>{m.icon}</span>
            <span style={{ fontSize: 16 }}>{m.name}</span>
            <span style={{ color: "#8d9492", fontWeight: 400, fontSize: 13 }}>
              {m.desc}
            </span>
            <span style={{ color: "#b49a26", fontWeight: 500, fontSize: 12 }}>{m.instructions}</span>
          </button>
        ))}
      </div>
      {/* Bypass Button: only show if a timer is running, blocked, or in a real app, if blocked */}
      {running && (
        <button
          style={{
            background: "#FFD600",
            color: "#2E7D32",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 17,
            padding: "12px 25px",
            marginBottom: 15,
            marginTop: 2,
            boxShadow: "0 2px 7px #B2DFDB19",
            cursor: "pointer"
          }}
          onClick={handleBypassAttempt}
        >
          🚦 Emergency Bypass (Mindful Pause)
        </button>
      )}
      {/* Modal rendering */}
      {renderBypassModal(handleBypassReflection, closeBypassModal)}
      {/* Supportive message after bypass */}
      {showBypassThanks && (
        <div style={{
          background: "#FFFDE6",
          border: "1.5px solid #FFD60077",
          color: "#A88D1B",
          fontWeight: 500,
          fontSize: 15.5,
          borderRadius: 9,
          marginTop: 17,
          marginBottom: 8,
          padding: "15px 22px",
          textAlign: "center"
        }}>
          It's ok to notice your urge to bypass: <b>{lastBypassReason}</b>. Remember your intentions—you've got this! 🌱
        </div>
      )}
      {renderModeConfigPanel()}
      <div style={{ marginTop: 18, color: "#819c7b", fontSize: 14.4 }}>
        The right detox approach can make your offline life more rewarding!
      </div>
    </section>
  );
}

// ------- Timer UI Component -------
function CountdownTimerUI({ timer, prettyTime, onReset, done }) {
  return (
    <div
      style={{
        marginTop: 17,
        background: "#fff8de",
        color: "#313619",
        border: "2px solid #FFD60077",
        borderRadius: 12,
        padding: "25px 17px 19px",
        textAlign: "center",
        fontWeight: 600,
        fontSize: 21,
        letterSpacing: ".035rem",
        position: "relative"
      }}
    >
      {done ? (
        <>
          <span role="img" aria-label="done" style={{ fontSize: 31 }}>
            🎉
          </span>
          <div style={{ marginTop: 8, fontSize: 17 }}>
            Offline time complete!
          </div>
          <button
            style={{
              marginTop: 11,
              background: "#2E7D32",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 18px",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer"
            }}
            onClick={onReset}
          >
            Finish
          </button>
        </>
      ) : (
        <>
          <div style={{ fontSize: 23, marginBottom: 5 }}>
            {prettyTime(timer)}
          </div>
          <button
            style={{
              marginTop: 10,
              background: "#FFF176",
              color: "#333",
              border: "none",
              borderRadius: 6,
              padding: "6px 18px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer"
            }}
            onClick={onReset}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

// --- Helpers ---
// Color vars (or use inline app css vars)
const COLORS = {
  primary: "#2E7D32",
  accent: "#FFD600",
  secondary: "#B2DFDB"
};
const modePanelStyle = {
  background: "#F8FBF8",
  borderRadius: 13,
  padding: "19px 19px 12px",
  boxShadow: "0 1.5px 12px #b2dfdb11",
  marginTop: 10,
  marginBottom: 10,
  color: COLORS.primary,
  fontWeight: 500
};
const descPanelStyle = {
  background: "#EFFBFC",
  color: "#678964",
  padding: "12px 15px",
  fontSize: 13.6,
  fontWeight: 400,
  borderRadius: 8,
  marginTop: 8
};
const formRow = { marginBottom: 10, fontSize: 15.3 };
const inputStyle = {
  borderRadius: 7,
  border: "1.2px solid #B2DFDB",
  padding: "7px 10px",
  fontSize: 15,
  marginLeft: 6,
  width: 72
};
const timerBtnStyle = {
  background: COLORS.accent,
  color: "#324116",
  border: "none",
  borderRadius: 7,
  padding: "9px 22px",
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
  marginLeft: 13,
  marginTop: 10
};

// For "Weekend Retreat", get next Friday-Sunday as defaults
function getNextWeekend() {
  const today = new Date();
  // 0=sun, 1=mon, ... 5=fri, 6=sat
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7));
  const nextSunday = new Date(nextFriday);
  nextSunday.setDate(nextFriday.getDate() + 2);
  return {
    start: nextFriday.toISOString().slice(0, 10), // yyyy-mm-dd
    end: nextSunday.toISOString().slice(0, 10)
  };
}

// Given ISO date string, format as "MMM D"
function formatDate(str) {
  if (!str) return "";
  const d = new Date(str);
  return (
    d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric"
    }) || str
  );
}

// Get minutes until a future ISO date string
function getMinutesUntilDate(dateStr) {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = Math.max(0, Math.floor((target - now) / 60000));
  return diff || 120; // fallback to 2hrs demo
}
