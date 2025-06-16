import React, { useState } from "react";

/**
 * ParentTeenMode - Collaborative Family Challenge & Milestone Tracker
 * 
 * Supports:
 * - Collaborative milestone and challenge tracking
 * - Streak tracking for daily/weekly collaborations
 * - Positive, inline feedback (emojis/messages)
 * - Shared progress visualization (progress bars, streak flames)
 * - Adaptive, family-specific task suggestion/rotation
 * - Reward system for joint task completions
 * 
 * Designed for quick, positive offline engagement.
 */

// Demo family profile & adaptive suggestion base (may normally come from a backend)
const DEFAULT_FAMILY = {
  parentName: "Parent",
  teenName: "Teen",
  dynamicPreferences: ["Outdoors", "Physical Activity", "Mindfulness"],
};

const INITIAL_SHARED_MILESTONES = [
  { id: 1, label: "24 Hours Device-Free Together", completed: false, adaptive: false },
  { id: 2, label: "3 Offline Meals as a Family", completed: false, adaptive: false },
  { id: 3, label: "Weekend Nature Activity", completed: false, adaptive: "Outdoors" },
  { id: 4, label: "Mindfulness Hour (no tech, together)", completed: false, adaptive: "Mindfulness" }
];

const COMMUNITY_REWARDS = [
  { id: "giftcard", name: "Local Café Giftcard", emoji: "☕️" },
  { id: "outing", name: "Family Outing", emoji: "🌳" },
  { id: "movie", name: "Movie Night", emoji: "🎬" },
  { id: "trophy", name: "Family Digital Detox Trophy", emoji: "🏆" }
];

// Utility for streak flames
const getStreakIcon = (days) => {
  if (days >= 7) return "🔥🔥🔥";
  if (days >= 3) return "🔥🔥";
  if (days === 2) return "🔥";
  if (days === 1) return "✨";
  return "💤";
};

// ----------- MAIN COMPONENT -----------
// PUBLIC_INTERFACE
function ParentTeenMode() {
  // Collab state
  const [family] = useState(DEFAULT_FAMILY);
  const [milestones, setMilestones] = useState(INITIAL_SHARED_MILESTONES);

  // Streak: # consecutive days with any collaborative completion
  const [streak, setStreak] = useState(0);
  const [lastCompletion, setLastCompletion] = useState(null); // Date

  // Completed reward
  const [reward, setReward] = useState(null);

  // Positive message for streaks/achievements
  const [positiveMsg, setPositiveMsg] = useState("");

  // Suggestion queue (rotate adaptive challenge based on family prefs & completion history)
  const [adaptiveQueue, setAdaptiveQueue] = useState(
    milestones.filter((m) => m.adaptive && !m.completed)
  );

  // Add a new adaptive challenge (simple simulated system)
  function suggestAdaptiveTask() {
    // Pick a dynamic preference not yet used & not currently active
    const used = milestones.map((m) => m.adaptive).filter(Boolean);
    const unusedPrefs = family.dynamicPreferences.filter((p) => !used.includes(p));
    if (unusedPrefs.length) {
      const pref = unusedPrefs[Math.floor(Math.random() * unusedPrefs.length)];
      const newTask = {
        id: milestones.length + 1,
        label: `Family activity (${pref})`,
        completed: false,
        adaptive: pref
      };
      setMilestones((ms) => [...ms, newTask]);
      setAdaptiveQueue((aq) => [...aq, newTask]);
      setPositiveMsg(`New adaptive family challenge added: ${pref}! 🌱`);
    } else {
      setPositiveMsg("All family preferences covered! 🎉 Add your own for more variety.");
    }
  }

  // Mark a milestone as complete
  function completeMilestone(id) {
    setMilestones((ms) =>
      ms.map((m) =>
        m.id === id ? { ...m, completed: true } : m
      )
    );
    const completedToday = isToday(lastCompletion);
    if (!completedToday) {
      setStreak((s) => s + 1);
      setLastCompletion(new Date());
      showPositiveFeedback("Streak continued! 🔥 Great teamwork!");
    } else {
      showPositiveFeedback("Milestone completed together! 🎉");
    }
    if (milestones.filter((m) => m.completed).length + 1 >= milestones.length) {
      handleAllCompleted();
    }
  }

  // Check if a given date is today (for streak logic)
  function isToday(dateObj) {
    if (!dateObj) return false;
    const stored = new Date(dateObj);
    const now = new Date();
    return (
      stored.getDate() === now.getDate() &&
      stored.getMonth() === now.getMonth() &&
      stored.getFullYear() === now.getFullYear()
    );
  }

  // Show feedback message for a few seconds
  function showPositiveFeedback(msg) {
    setPositiveMsg(msg);
    setTimeout(() => setPositiveMsg(""), 3100);
  }

  // Reset streak if no challenge completed today and previous was >1 day ago
  React.useEffect(() => {
    if (!lastCompletion) return;
    const now = new Date();
    const last = new Date(lastCompletion);
    const hours = (now - last) / 1000 / 60 / 60;
    if (hours > 36 && streak > 0) {
      setStreak(0);
      setPositiveMsg("Streak reset. Start a new one today! 💡");
    }
  }, [lastCompletion, streak]);

  // Reward logic (simulate: complete all → get a reward)
  function handleAllCompleted() {
    if (!reward) {
      const randomReward = COMMUNITY_REWARDS[Math.floor(Math.random() * COMMUNITY_REWARDS.length)];
      setReward(randomReward);
      showPositiveFeedback(`Family milestone: ${randomReward.name}! Claim your reward ${randomReward.emoji}`);
    }
  }

  // Shared progress: ratio completed
  const progress = milestones.length
    ? milestones.filter((m) => m.completed).length / milestones.length
    : 0;

  // Adaptive challenge rotation (promotes new tasks)
  function handleRotateAdaptive() {
    setAdaptiveQueue((aq) => {
      if (aq.length < 2) return aq;
      // Move first item to end
      return [...aq.slice(1), aq[0]];
    });
  }

  // Allow "celebrate/reward" animation (simple inline emoji)
  function handleRewardClaim() {
    setReward(null);
    setPositiveMsg("Enjoy your reward together! 🎁");
  }

  return (
    <div
      className="parent-teen-mode"
      style={{
        background: "#f8faf8",
        borderRadius: 13,
        marginTop: 24,
        boxShadow: "0 3px 12px rgba(44,127,67,0.07)",
        minHeight: 200,
        padding: "32px 24px 28px 24px",
        maxWidth: 600,
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <h2 className="title" style={{ color: "#2E7D32", textAlign: "center", fontWeight: 800, marginBottom: 5 }}>
        👨‍👩‍👧‍👦 Parent-Teen Collaborative Mode
      </h2>
      <p style={{ textAlign: "center", marginBottom: 20, color: "#395127" }}>
        Build positive family routines offline! Team up for shared milestones and unlock real-world rewards together.
      </p>

      {/* Progress Section */}
      <ProgressBar progress={progress} />
      <div style={{ textAlign: "center", margin: "6px 0 10px 0", fontSize: 17 }}>
        <span role="img" aria-label="progress">📈</span> Family Joint Progress: <b>{milestones.filter(m => m.completed).length}/{milestones.length}</b>
      </div>

      {/* Streak Section */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        gap: 9,
        marginBottom: 7,
        marginTop: 4
      }}>
        <span>Streak:</span>
        <span style={{
          fontSize: 25,
          letterSpacing: 0.8,
          fontFamily: "system-ui,sans-serif"
        }}>{getStreakIcon(streak)}</span>
        <span style={{
          fontWeight: streak >= 3 ? 700 : 400,
          color: streak >= 3 ? "#FFB300" : "#789262"
        }}>
          {streak} day{streak !== 1 ? "s" : ""}
        </span>
      </div>
      {/* Positive feedback */}
      {positiveMsg && (
        <div style={{
          textAlign: "center",
          background: "#EFFBE7",
          color: "#237018",
          borderRadius: 8,
          padding: "7px 0 7px 0",
          marginBottom: 7,
          fontWeight: 500,
          fontSize: 16,
        }}>
          {positiveMsg}
        </div>
      )}

      {/* Reward banner */}
      {reward && (
        <div style={{
          background: "#fffbe8",
          margin: "10px auto 8px auto",
          border: "1.5px dashed #FFD600",
          borderRadius: 8,
          padding: 13,
          textAlign: "center",
          maxWidth: 355,
          fontSize: 17,
        }}>
          <b>
            <span role="img" aria-label={reward.name}>{reward.emoji}</span> 
            Family Reward Unlocked: {reward.name}!
          </b>
          <div style={{ marginTop: 7 }}>
            <button
              className="btn btn-large"
              style={{
                background: "#2E7D32",
                color: "#fff",
                border: "none",
                borderRadius: 7,
                fontSize: 16,
                padding: "8px 18px",
                cursor: "pointer",
                marginTop: 3
              }}
              onClick={handleRewardClaim}
            >
              Claim & Celebrate
            </button>
          </div>
        </div>
      )}

      {/* Main Milestone List */}
      <h3 style={{ margin: "16px 0 6px 0", fontWeight: 700, color: "#45733C" }}>Family Challenges</h3>
      <ul style={{
        paddingLeft: 0,
        margin: 0,
        listStyleType: "none"
      }}>
        {milestones.map((m) => (
          <li key={m.id} style={{
            background: m.completed ? "#e4f8e4" : "#fff",
            margin: "0 0 7px 0",
            border: "1px solid #e7f6ec",
            borderRadius: 7,
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: m.completed ? 0.67 : 1,
            textDecoration: m.completed ? "line-through" : "none",
            transition: "all 0.18s"
          }}>
            <span style={{ fontWeight: m.completed ? 430 : 600, fontSize: 15.5 }}>
              <span role="img" aria-label="challenge" style={{ fontSize: 18, marginRight: 5 }}>
                {m.adaptive ? "🧬" : "🏅"}
              </span>
              {m.label}
            </span>
            {!m.completed && (
              <button
                className="btn"
                style={{
                  background: "#FFD600",
                  border: "none",
                  color: "#1a1a1a",
                  fontWeight: 500,
                  borderRadius: 7,
                  padding: "4px 15px",
                  fontSize: 14.5,
                  marginLeft: 12,
                  cursor: "pointer"
                }}
                onClick={() => completeMilestone(m.id)}
              >
                Mark as Done
              </button>
            )}
            {m.completed && <span style={{ marginLeft: 15, fontSize: 17 }}>✅</span>}
          </li>
        ))}
      </ul>

      {/* Adaptive challenge suggestion/rotation */}
      <div style={{ marginTop: 15, textAlign: "center" }}>
        <button
          className="btn btn-secondary"
          style={{
            background: "#d6eadd",
            border: "none",
            color: "#20624F",
            padding: "6px 14px",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 14.3,
            marginRight: 7
          }}
          onClick={suggestAdaptiveTask}
        >
          Suggest Adaptive Challenge
        </button>
        {adaptiveQueue.length > 1 && (
          <button
            className="btn btn-rotate"
            style={{
              background: "#F2F6F5",
              border: "1.5px solid #b2dfdb",
              color: "#1A1A1A",
              padding: "6px 9px",
              borderRadius: 6,
              fontWeight: 500,
              cursor: "pointer",
              fontSize: 14,
              marginLeft: 0
            }}
            onClick={handleRotateAdaptive}
            title="Rotate Adaptive Challenge"
          >
            Rotate
          </button>
        )}
        {adaptiveQueue.length > 0 && (
          <div style={{
            marginTop: 9,
            fontSize: 15.2,
            color: "#247134",
            fontWeight: 500
          }}>
            🌱 Next Adaptive: <b>{adaptiveQueue[0].label}</b>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div style={{
        marginTop: 27,
        fontSize: 13.7,
        color: "#789262",
        textAlign: "center"
      }}>
        <span role="img" aria-label="info">💬</span> 
        Collaborate as a team: mark activities after completing them together. Return each day to build your family streak and unlock rewards. 
      </div>
    </div>
  );
}

/**
 * ProgressBar - visualizes shared challenge progress
 */
// PUBLIC_INTERFACE
function ProgressBar({ progress }) {
  return (
    <div style={{ margin: "9px 0 1px 0", width: "100%" }}>
      <div style={{
        background: "#F2F6F5",
        borderRadius: 8,
        overflow: "hidden",
        height: 14,
        position: "relative"
      }}>
        <div style={{
          width: `${Math.round(progress * 100)}%`,
          background: "linear-gradient(90deg, #2E7D32, #FFD600)",
          height: "100%",
          transition: "width 0.65s cubic-bezier(.4,0,.2,1)"
        }} />
      </div>
      <div style={{
        marginTop: 3,
        fontSize: 13.2,
        color: "#789262",
        textAlign: "center"
      }}>
        {Math.round(progress * 100)}% completed jointly
      </div>
    </div>
  );
}

export default ParentTeenMode;
