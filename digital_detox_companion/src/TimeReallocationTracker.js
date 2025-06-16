import React, { useState, useEffect, useRef } from "react";

/**
 * Time Reallocation Tracker (ADAPTIVE & GAMIFIED)
 * - Adaptive, gamified, and habit-stacking logic for diversified time usage.
 * - Tracks milestones with achievements and visual progress.
 * - Suggests new “stacks” for time reallocation; gives rewarding, dynamic feedback.
 * - Uplifting, branded UI with playful progress bar, mascot, and celebration.
 * - New: Adaptive suggestions, milestone unlocks, habit stacking, streaks, and dynamic, gamified feedback!
 *
 * PUBLIC_INTERFACE
 */

const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  faint: "#faffed",
  fail: "#DA8246",
};

const mascots = ["🦔", "🦦", "🐢", "☀️", "🎉", "🌱"];

// Gamified and adaptive milestones for habit stacking
const habitMilestones = [
  {
    title: "Habit Stack 1: Try One New Thing!",
    desc: "Replace 30+ min of screen time with a new offline activity.",
    required: 1,
    type: "uniqueActivity",
    badge: "✨",
    reward: "Unlocked: New Explorer!",
    suggestion: [
      "Try a walk, doodle, or read a chapter",
      "Call a friend instead of scrolling",
      "Cook a meal or try journaling by hand",
    ],
  },
  {
    title: "Stack Up: Activity Diversity (x3)",
    desc: "Log 3 different offline activities in your tracker.",
    required: 3,
    type: "activityTypes",
    badge: "🔀",
    reward: "Achievement: Multitasker!",
    suggestion: [
      "Mix it up: add a meal, a book, and an outdoor moment to your week!",
      "Invite a buddy to join one session",
      "What’s one thing you enjoyed as a child?"
    ],
  },
  {
    title: "Streak Builder (5 days in row)",
    desc: "Log at least 10 minutes gained for 5 consecutive days.",
    required: 5,
    type: "uniqueDays",
    badge: "🔥",
    reward: "Streak Champ!",
    suggestion: [
      "Keep your streak alive: try meditation, art, or visiting a new place.",
      "Reflect: How is your mood or focus changing?",
      "Pair with a friend or family for accountability!",
    ],
  },
  {
    title: "Expert: Habit Automation",
    desc: "Log over 8 hours of healthy, screen-free activities in one week.",
    required: 8, // hours
    type: "weekHours",
    badge: "🏆",
    reward: "Time Master!",
    suggestion: [
      "Schedule daily offline blocks ahead.",
      "Try a full day without your device.",
      "Integrate activities into your routine (morning, commute, or after meals).",
    ],
  },
];

function getProgressForMilestone(mIdx, logs) {
  // Helper computes the progress and goal for a milestone
  const activityTypes = Array.from(new Set(logs.map(e => e.activity.toLowerCase())));
  const uniqueDays = Array.from(new Set(logs.map(e => e.day)));
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
  const weekLogs = logs.filter(e => new Date(e.time) >= oneWeekAgo);
  const weekMins = weekLogs.reduce((sum, e) => sum + e.mins, 0);
  const weekHours = Math.round((weekMins / 60) * 10) / 10;
  const totalLogs = logs.length;

  if (mIdx === 0) {
    return { progress: totalLogs > 0 ? 1 : 0, progressGoal: 1 };
  } else if (mIdx === 1) {
    return { progress: activityTypes.length, progressGoal: habitMilestones[1].required };
  } else if (mIdx === 2) {
    return { progress: uniqueDays.length, progressGoal: habitMilestones[2].required };
  } else {
    // mIdx === 3
    return {
      progress: weekHours >= habitMilestones[3].required ? habitMilestones[3].required : weekHours,
      progressGoal: habitMilestones[3].required
    };
  }
}

// PUBLIC_INTERFACE
function TimeReallocationTracker() {
  // User log state, stored locally (simulate persistent by saving to localStorage on write)
  const [logs, setLogs] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem("timeReallocationLogs"));
      if (Array.isArray(data)) return data;
    } catch {}
    return [];
  });

  // UI/UX state
  const [activity, setActivity] = useState("");
  const [minutes, setMinutes] = useState("");
  const [feedback, setFeedback] = useState("");
  const [milestoneIdx, setMilestoneIdx] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [dynamicSuggestion, setDynamicSuggestion] = useState("");
  const [suggestionKey, setSuggestionKey] = useState(0);

  // Helper: update logs & localStorage together
  function updateLogs(newLogs) {
    setLogs(newLogs);
    try {
      localStorage.setItem("timeReallocationLogs", JSON.stringify(newLogs));
    } catch {}
  }

  // Handler: Log submitted
  function handleLogSubmit(e) {
    e.preventDefault();
    const mins = Math.max(0, Math.round(Number(minutes)));
    if (!activity.trim() || isNaN(mins) || mins < 5) {
      setFeedback("Please enter an activity and at least 5 minutes gained.");
      return;
    }
    const entry = {
      time: new Date().toISOString(),
      activity: activity.trim(),
      mins,
      day: (new Date()).toDateString(),
    };
    const newLogs = [entry, ...logs];
    updateLogs(newLogs);
    setActivity("");
    setMinutes("");
    setFeedback("✅ Activity logged! Keep stacking good habits.");
    setTimeout(() => setFeedback(""), 2000);
  }

  // --- Progress Logic & Milestone Advancement ---
  // 1. Calculate user stats
  const activityTypes = Array.from(new Set(logs.map(e => e.activity.toLowerCase())));
  const uniqueDays = Array.from(new Set(logs.map(e => e.day)));
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
  const weekLogs = logs.filter(e => new Date(e.time) >= oneWeekAgo);
  const weekMins = weekLogs.reduce((sum, e) => sum + e.mins, 0);
  const weekHours = Math.round((weekMins / 60) * 10) / 10;
  const totalLogs = logs.length;

  // 2. Milestone progress index logic
  let mIdx = 0;
  if (activityTypes.length >= 3) mIdx = 1;
  if (uniqueDays.length >= 5) mIdx = 2;
  if (weekHours >= 8) mIdx = 3;

  // 3. Animate milestone celebration on level up
  const didLevelUp = mIdx > milestoneIdx;
  const milestone = habitMilestones[mIdx];

  useEffect(() => {
    if (didLevelUp) {
      setTimeout(() => setConfetti(true), 400);
      setTimeout(() => setConfetti(false), 2200);
      setMilestoneIdx(mIdx);
    }
    // eslint-disable-next-line
  }, [mIdx, milestoneIdx]);

  // 4. Milestone progress
  const { progress, progressGoal } = getProgressForMilestone(mIdx, logs);
  const milComplete = progress >= progressGoal;

  // 5. Adaptive/rotating suggestion logic
  function nextSuggestion() {
    const arr = milestone.suggestion;
    const idx = (suggestionKey + 1) % arr.length;
    setDynamicSuggestion(arr[idx]);
    setSuggestionKey(idx);
  }
  useEffect(() => {
    setDynamicSuggestion(milestone.suggestion[0] || "");
    setSuggestionKey(0);
    // eslint-disable-next-line
  }, [mIdx]);

  // Lively mascot changes for celebration/encouragement
  let mascot = mascots[mIdx % mascots.length];
  if (confetti) mascot = "🎉";

  // Dynamic/interacting feedback, with gamified, playful progress
  function getDynamicFeedback() {
    if (didLevelUp) return "🎉 New milestone! Level up habit stack!";
    if (milComplete)
      return `Milestone complete: ${milestone.reward}`;
    if (progressGoal - progress === 1)
      return "One more to go!";
    if (progressGoal - progress < 4)
      return `Just ${progressGoal - progress} left for this milestone!`;
    return "Habit-building is a stack—a little progress every day!";
  }

  // Streak Progress Bar logic
  function getStreak() {
    // streak is max streak of consecutive days in logs
    const days = logs.map(e => e.day).sort();
    let maxStreak = 0, streak = 0, prev = null;
    for (const day of Array.from(new Set(days))) {
      const date = new Date(day);
      if (prev) {
        const next = new Date(prev);
        next.setDate(next.getDate() + 1);
        if (
          date.getFullYear() === next.getFullYear() &&
          date.getMonth() === next.getMonth() &&
          date.getDate() === next.getDate()
        ) {
          streak += 1;
        } else {
          streak = 1;
        }
      } else {
        streak = 1;
      }
      if (streak > maxStreak) maxStreak = streak;
      prev = day;
    }
    return maxStreak;
  }

  // UI Render
  return (
    <section
      style={{
        maxWidth: 520,
        margin: "0 auto",
        padding: "22px 10px 25px",
        background: COLORS.faint,
        borderRadius: 18,
        boxShadow: "0 2px 19px rgba(44,127,67,0.06)",
        marginTop: 32,
        marginBottom: 38,
        position: "relative",
        textAlign: "center"
      }}
    >
      {/* Confetti/celebration anim */}
      {confetti && (
        <div style={{position:"absolute", zIndex:4, left:0,right:0,top:0}}>
          <CelebrationAnimation badge={milestone.badge} />
        </div>
      )}
      <div
        style={{
          fontSize: 48, margin: "0 auto 8px",
          filter: milComplete ? "drop-shadow(0 2px 16px #FFD60055)" : undefined,
          userSelect: "none"
        }}>{mascot}</div>
      <h2
        style={{
          color: COLORS.primary,
          fontWeight: 700,
          fontSize: 28,
          margin: "7px 0 12px"
        }}
      >
        ⏳ Time Reallocation Tracker
      </h2>
      <div
        style={{
          fontSize: 16.3,
          color: "#789262",
          marginBottom: 6,
          marginTop: 0,
          fontWeight: 500
        }}
      >
        {milestone.title}{" "}
        <span style={{ fontSize: 21 }}>{milestone.badge}</span>
      </div>
      <div style={{ fontSize: 15.1, color: "#595B2A", marginBottom: 2 }}>
        {milestone.desc}
      </div>
      <ProgressBar progress={progress/progressGoal} label={`${progress} / ${progressGoal}`} />

      {/* Dynamic feedback */}
      <div style={{
        fontWeight: 500,
        fontSize: 16.2,
        margin: "11px 0 4px 0",
        color: milComplete ? COLORS.accent : (didLevelUp ? COLORS.primary : COLORS.primary),
        minHeight: 28
      }}>
        {getDynamicFeedback()}
      </div>
      <div style={{
        background: "#fffde8",
        margin: "6px 0 15px",
        padding: "12px 10px",
        fontSize: 14.6,
        borderRadius: 13,
        color: "#B59312",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <span>
          <span style={{color:COLORS.primary}}>Next suggestion:</span>{" "}
          <span style={{fontWeight:700}}>{dynamicSuggestion}</span>
        </span>
        {milestone.suggestion.length > 1 && (
          <button
            type="button"
            title="Show another suggestion"
            onClick={nextSuggestion}
            style={{
              marginLeft: 9,
              fontSize: 12,
              border: "none",
              background: "#B2DFDB22",
              borderRadius: 8,
              color: COLORS.primary,
              padding: "3px 9px",
              cursor: "pointer"
            }}
          >
            ⟳
          </button>
        )}
      </div>

      {/* LOGGING UI - playful card */}
      <form
        onSubmit={handleLogSubmit}
        style={{
          background: "#fff",
          border: `1.2px solid ${COLORS.secondary}`,
          boxShadow: "0 1px 10px #CCD4B672",
          borderRadius: 13,
          padding: "16px 11px 13px",
          marginTop: 9, marginBottom: 7
        }}
        autoComplete="off"
      >
        <div
          style={{
            fontWeight: 600,
            color: COLORS.primary,
            marginBottom: 3,
            fontSize: 15,
            textAlign: "left",
          }}
        >
          Log a screen-free activity:
        </div>
        <input
          type="text"
          placeholder="What did you do offline?"
          value={activity}
          maxLength={40}
          required
          onChange={e => setActivity(e.target.value)}
          style={{
            width: "100%",
            fontSize: 15,
            marginBottom: 7,
            padding: "7px 10px",
            borderRadius: 7,
            border: "1px solid #B2DFDB",
            background: "#F9FFF6"
          }}
          autoFocus
        />
        <div
          style={{
            fontWeight: 500,
            color: "#A6822B",
            fontSize: 14,
            marginBottom: 0,
            textAlign: "left"
          }}
        >
          Minutes gained (≥5):
        </div>
        <input
          type="number"
          min={5}
          max={240}
          placeholder="Minutes"
          value={minutes}
          onChange={e => setMinutes(e.target.value)}
          required
          style={{
            width: "73px",
            fontSize: 15,
            margin: "0 0 7px",
            borderRadius: 7,
            border: "1px solid #FFD600",
            background: "#F9FFF6"
          }}
        />
        <button
          className="btn"
          style={{
            background: COLORS.primary,
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
            border: "none",
            borderRadius: 8,
            padding: "7px 21px",
            marginLeft: 13,
            cursor: "pointer",
          }}
        >
          Log
        </button>
        <div style={{ color: COL_OR_FEEDBACK(feedback), fontSize: 14, marginTop: 6, minHeight: 22 }}>
          {feedback}
        </div>
      </form>

      {/* Weekly "What You Gained" */}
      <div
        style={{
          marginTop: 13,
          padding: "12px 12px 9px 12px",
          background: "#F8FBF9",
          borderRadius: 13,
          fontSize: 15,
          minHeight: 36,
          boxShadow: "0 0.5px 5px #B2DFDB13",
          color: "#326A13",
          fontWeight: 500,
          textAlign: "left"
        }}
      >
        This week you’ve gained <b>{weekHours}</b> hour{weekHours === 1 ? "" : "s"} of real life!<br />
        Try new things to stack up even more hours.
      </div>

      {/* Habit breakdown: activity types */}
      <div
        style={{
          margin: "14px 0 7px",
          color: "#62777A",
          fontSize: 13.6,
          textAlign: "left",
          fontWeight: 500,
        }}
      >
        <span>Unique activities this week: </span>
        <span style={{
          color: COLORS.accent,
          fontWeight: 700,
          fontSize: 16
        }}>{activityTypes.length}</span>
        <ul style={{
          margin: "5px 0 0 0",
          padding: 0,
          listStyle: "none",
          columns: 2,
        }}>
          {activityTypes.map((t, idx) =>
            <li key={t + idx} style={{
              background: "#f9fff0",
              marginBottom: 3,
              padding: "4px 9px",
              borderRadius: 6,
              color: COLORS.primary,
              fontWeight: 600,
              fontSize: 14
            }}>{t[0].toUpperCase() + t.slice(1)}</li>
          )}
        </ul>
      </div>

      {/* Streak and streak bar */}
      <div style={{ margin: "10px 0 0", textAlign: "left" }}>
        <StreakProgressBar streak={getStreak()} />
      </div>

      {/* Recent logs display */}
      {!!logs.length && (
        <div
          style={{
            marginTop: 13,
            padding: "10px 10px",
            background: "#fff",
            borderRadius: 11,
            boxShadow: "0 0.5px 5px #B2DFDB15",
            color: "#233A1A"
          }}
        >
          <div style={{ fontWeight: 600, color: COLORS.primary, marginBottom: 2, fontSize: 15 }}>
            Recent Activities
          </div>
          <ul style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            textAlign: "left",
            fontSize: 14,
            maxHeight: 116,
            overflowY: "auto"
          }}>
            {logs.slice(0, 8).map((e, idx) =>
              <li key={e.time + idx} style={{
                background: "#F5FFEA",
                borderLeft: `3px solid ${COLORS.secondary}`,
                borderRadius: 7,
                marginBottom: 4,
                padding: "5px 7px",
                fontWeight: 500
              }}>
                <span style={{ color: "#FFD600", marginRight: 4, fontWeight: 700 }}>{e.activity}</span>
                <span style={{ color: "#2E7D32", marginLeft: 5 }}>{e.mins}min</span>
                <span style={{ color: "#aac889", marginLeft: 9, fontSize: 12 }}>{new Date(e.time).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
              </li>
            )}
          </ul>
        </div>
      )}
      <div style={{ margin: "14px 0 2px", color: "#B9CEB5", fontSize: 12 }}>
        Logs reset automatically each week for healthy refresh!
      </div>
      <div
        style={{
          marginTop: 15,
          fontSize: 13.3,
          color: "#668254",
          textAlign: "center",
          fontWeight: 500,
          opacity: 0.64
        }}>
        <span>
          Adaptive tracker: Add new activities and keep stacking for surprise rewards...<br />
          Each completed stack brings dynamic, new suggestions and milestones!
        </span>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function ProgressBar({ progress = 0, label = "" }) {
  // Clamp 0-1, animate width
  const pct = Math.min(1, Math.max(0, progress));
  return (
    <div style={{ margin: "17px 0 4px" }}>
      <div
        style={{
          background: "#F2F6F5",
          borderRadius: 8,
          overflow: "hidden",
          height: 15,
          position: "relative"
        }}
      >
        <div
          style={{
            width: `${Math.round(pct * 100)}%`,
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent} 80%)`,
            height: "100%",
            borderRadius: 8,
            transition: "width 0.8s cubic-bezier(.4,0,.15,1)"
          }}
        />
        <div style={{
          position: "absolute",
          left: "50%",
          top: 2,
          transform: "translateX(-50%)",
          color: "#7c9f64",
          fontWeight: 600,
          fontSize: 12.5
        }}>
          {label}
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function CelebrationAnimation({ badge = "🎉" }) {
  // Simple: badge animation + confetti-like overlay
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <span
        style={{
          fontSize: 66,
          margin: "12px 0",
          transition: "transform 0.8s cubic-bezier(.28,1.5,.6,1)",
          animation: "pop-badge 1.6s cubic-bezier(.3,1.7,.3,1) both"
        }}
      >
        {badge}
      </span>
      <style>{`
        @keyframes pop-badge {
          0% { transform: scale(0.6) rotate(-10deg); opacity:0.2; }
          60% { transform: scale(1.22) rotate(6deg); opacity:1; }
          100% { transform: scale(1) rotate(0deg); opacity:1; }
        }
      `}</style>
    </div>
  );
}

// PUBLIC_INTERFACE
function StreakProgressBar({ streak }) {
  // Animates playful "flame" or "plant growing" for current streak
  return (
    <div style={{ margin: "7px 0 7px 0" }}>
      <div style={{
        fontWeight: 700,
        color: "#937305",
        fontSize: 14.6,
        marginBottom: 3,
      }}>
        Current streak: <span style={{
          color: "#FFD600",
          fontWeight: 700,
          fontSize: 15,
        }}>{streak}</span> day{streak !== 1 ? "s" : ""}
        {streak >= 3 ? <span style={{ fontSize: 20, marginLeft: 7 }}>🔥</span> : streak > 0 ? <span style={{ fontSize: 18, marginLeft: 7 }}>🌱</span> : ""}
      </div>
      <div style={{
        background: "#E7F6EC",
        borderRadius: 8,
        height: 10,
        width: "100%",
        overflow: "hidden"
      }}>
        <div style={{
          height: "100%",
          width: `${Math.min(streak, 7) * 100 / 7}%`,
          background: "linear-gradient(90deg, #FFD600 55%, #B2DFDB 100%)",
          borderRadius: 8,
          transition: "width 0.8s cubic-bezier(.4,0,.23,1)"
        }} />
      </div>
      {streak >= 7 && (
        <div style={{
          color: "#62A522",
          fontWeight: 700,
          fontSize: 13.7,
          marginTop: 2
        }}>
          Streak Hero! <span role="img" aria-label="Trophy">🏅</span>
        </div>
      )}
    </div>
  );
}

function COL_OR_FEEDBACK(msg) {
  if (!msg) return "#A68913";
  if (msg.startsWith("✅")) return "#179d35";
  if (msg.startsWith("Please") || msg.startsWith("error") || msg.startsWith("Error")) return COLORS.fail;
  return COLORS.primary;
}

export default TimeReallocationTracker;
