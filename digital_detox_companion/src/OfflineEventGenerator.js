import React, { useState, useEffect } from "react";
import "./App.css"; // For shared theme/colors etc.

/*
 * Gamified Offline Event Generator
 * Features:
 *  - Suggests offline activities in an engaging, dynamic, and context-aware way
 *  - Adaptive challenge logic: harder/more rewarding as user progresses
 *  - Milestone achievements and badges
 *  - Progress tracking with gamified visual bar and milestone markers
 *  - Dynamic/varied motivational feedback and gamified encouragement
 *  - Encourages participation and celebrates effort, not just completion
 */

// --- GAME DATA ---

// PUBLIC_INTERFACE
export const EVENT_CATEGORIES = [
  {
    name: "Mind & Body",
    color: "#2E7D32",
    icon: "🧘‍♂️",
    activities: [
      "Try a new yoga flow pose you've never done.",
      "Meditate outdoors for 10 minutes.",
      "Go for a mindful walk and notice five details in nature.",
      "Do a 15-minute home workout challenge.",
      "Practice deep breathing exercises (5m)."
    ]
  },
  {
    name: "Creativity",
    color: "#FFD600",
    icon: "🎨",
    activities: [
      "Draw something with only 2 colors.",
      "Write a short poem about your day.",
      "Make a collage from old magazines/newspapers.",
      "Invent a recipe using just 3 main ingredients.",
      "Try to sketch a self-portrait with your non-dominant hand."
    ]
  },
  {
    name: "Social & Family",
    color: "#B2DFDB",
    icon: "👨‍👩‍👦",
    activities: [
      "Call or meet someone you haven't spoken to in a while.",
      "Help a family member with a small task.",
      "Write a letter to a friend (paper or email).",
      "Share your favorite childhood story with someone.",
      "Play a board or card game with others (no phone scores!)."
    ]
  },
  {
    name: "Growth & Skills",
    color: "#789262",
    icon: "📚",
    activities: [
      "Read 10 pages from a physical book.",
      "Learn to say a greeting in a new language.",
      "Organize a shelf or workspace.",
      "Try a 10-minute memory training activity.",
      "Journal about something you learned this week."
    ]
  }
];

// Milestones for achievements
const MILESTONE_THRESHOLDS = [1, 3, 7, 14, 30];
const MILESTONE_TITLES = [
  "First Step!",
  "Momentum Rookie",
  "Challenge Explorer",
  "Offline Hero",
  "Detox Legend"
];
const MILESTONE_EMOJIS = ["🥉", "🥈", "🥇", "🏅", "🏆"];

// --- UTILITIES ---

// Shuffle helper for random activity selection
function getRandomItem(arr) {
  if (!arr || arr.length === 0) return "";
  return arr[Math.floor(Math.random() * arr.length)];
}

// Varied dynamic feedback for events (by win, try, skip, milestone, streak, etc.)
const FEEDBACK_MESSAGES = {
  success: [
    "Brilliant! Offline adventure complete.",
    "High five! Your mind thanks you.",
    "Another step away from screen—well done!",
    "You did it! Points for your real-world self.",
    "Offline missions: ACCOMPLISHED. 🚀"
  ],
  skip: [
    "Skipped? No worries—try a new one!",
    "Some days are busy. Tomorrow's another shot.",
    "It's about effort, not perfection. Pick another!",
    "You’re building momentum. Keep exploring!",
    "One skipped—but your streak remains possible!"
  ],
  challenge: [
    "Ready for a new challenge? Level up your experience!",
    "Try something bolder for bonus dopamine.",
    "Push yourself gently. Growth always shines offline!",
    "You’ve unlocked a bigger quest—up for it?",
    "Each step takes you closer to your offline legend!"
  ],
  milestone: [
    "Milestone unlocked! You’re making real progress.",
    "New badge earned—display it with pride!",
    "Achievement reached. Your journey matters.",
    "Celebrate this moment—device-free power!",
    "Look at you grow! Next stop: greatness."
  ]
};

// --- STATE KEYS ---
const LOCALSTORAGE_KEY = "offline_event_progress_v1";
// Structure: { completed: [], skipped: [], streak: number, milestones: [], lastEventTime: timestamp }

// --- MAIN COMPONENT ---
// PUBLIC_INTERFACE
export default function OfflineEventGenerator() {
  // Persistent progress state
  const [progress, setProgress] = useState({
    completed: [],
    skipped: [],
    milestones: [],
    streak: 0,
    lastEventTime: null
  });

  // UI state
  const [suggestion, setSuggestion] = useState(null);
  const [category, setCategory] = useState(null);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [animKey, setAnimKey] = useState(Date.now());

  // --- Effects: Load saved progress ---
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCALSTORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {
      // Bad/missing data, ignore.
    }
  }, []);

  // --- Persist progress ---
  useEffect(() => {
    try {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Silent fail (likely quota)
    }
  }, [progress]);

  // --- Helper: update feedback with animation reset ---
  function setDynamicFeedback(type, msg) {
    setFeedback({ type, message: msg });
    setAnimKey(Date.now());
  }

  // --- Generate suggestions ---
  // Picks more ambitious/novel activities as user progresses
  function generateSuggestion() {
    // Slightly bias toward less-used categories
    let catIdx = Math.random();
    if (progress.completed.length + progress.skipped.length > 10) {
      // Bias to categories used less often
      const counts = EVENT_CATEGORIES.map(
        (cat) =>
          progress.completed.filter((e) => e.category === cat.name).length
      );
      const minCount = Math.min(...counts);
      const unusedIdxs = counts
        .map((c, i) => (c === minCount ? i : null))
        .filter((v) => v !== null);
      catIdx = getRandomItem(unusedIdxs);
    } else {
      catIdx = Math.floor(Math.random() * EVENT_CATEGORIES.length);
    }
    const cat = EVENT_CATEGORIES[catIdx];
    // Activity: higher completed → bias toward later/ambitious activities
    const progFrac = Math.min(1, (progress.completed.length || 0) / 15);
    const actList = [...cat.activities];
    // Harder events bubbled up if progressing
    if (progFrac > 0.7) actList.reverse();
    const actIdx = Math.floor(Math.random() * Math.ceil(actList.length * (0.6 + progFrac * 0.4)));
    const activity = actList[actIdx];
    setCategory(cat);
    setSuggestion(activity);
    setDynamicFeedback(
      "challenge",
      getRandomItem(FEEDBACK_MESSAGES.challenge)
    );
  }

  // --- Complete event (track, reward, check milestones) ---
  function handleComplete() {
    if (!suggestion || !category) return;
    const ts = Date.now();
    const newEntry = {
      activity: suggestion,
      category: category.name,
      completedAt: ts
    };
    // Track streak
    let newStreak = progress.streak + 1;
    if (
      progress.lastEventTime &&
      ts - progress.lastEventTime > 1000 * 60 * 60 * 36 // 36h gap breaks streak
    )
      newStreak = 1;
    // Track milestones
    const totalCompleted = [...progress.completed, newEntry].length;
    const newMilestones = [...progress.milestones];
    let newMilestone = null;
    for (let i = 0; i < MILESTONE_THRESHOLDS.length; ++i) {
      const th = MILESTONE_THRESHOLDS[i];
      if (
        totalCompleted >= th &&
        !newMilestones.includes(th)
      ) {
        newMilestones.push(th);
        newMilestone = i;
      }
    }
    setProgress((prev) => ({
      ...prev,
      completed: [...prev.completed, newEntry],
      lastEventTime: ts,
      streak: newStreak,
      milestones: newMilestones
    }));
    if (newMilestone !== null) {
      setDynamicFeedback(
        "milestone",
        FEEDBACK_MESSAGES.milestone[newMilestone] ||
          "New milestone reached!"
      );
    } else {
      setDynamicFeedback("success", getRandomItem(FEEDBACK_MESSAGES.success));
    }
    setSuggestion(null); // Hide current suggestion
    setTimeout(generateSuggestion, 1300);
  }

  // --- Skip event (does not reset streak if used rarely) ---
  function handleSkip() {
    if (!suggestion || !category) return;
    const ts = Date.now();
    setProgress((prev) => ({
      ...prev,
      skipped: [...prev.skipped, { activity: suggestion, category: category.name, skippedAt: ts }],
      // streak stays the same unless frequent skipping
      lastEventTime: prev.lastEventTime,
    }));
    setDynamicFeedback("skip", getRandomItem(FEEDBACK_MESSAGES.skip));
    setSuggestion(null);
    setTimeout(generateSuggestion, 900);
  }

  // --- Reset progress ---
  function handleReset() {
    setProgress({
      completed: [],
      skipped: [],
      streak: 0,
      milestones: [],
      lastEventTime: null
    });
    setSuggestion(null);
    setCategory(null);
    setDynamicFeedback("success", "Progress reset. Ready for new challenges!");
  }

  // --- On mount, try suggesting first event if not present ---
  useEffect(() => {
    if (!suggestion) generateSuggestion();
    // eslint-disable-next-line
  }, []); // Mount only

  // --- Progress (as a fraction for visual bar) ---
  const totalCompleted = progress.completed.length;
  const milestoneGoal =
    MILESTONE_THRESHOLDS[progress.milestones.length] ||
    MILESTONE_THRESHOLDS[MILESTONE_THRESHOLDS.length - 1];
  const progressFrac = Math.min(1, totalCompleted / milestoneGoal);

  // --- UI ---

  return (
    <div
      className="offline-events-container"
      style={{
        width: "100%",
        maxWidth: 540,
        minHeight: 370,
        margin: "28px auto 16px",
        background: "#ffffff",
        borderRadius: 13,
        boxShadow: "0 4px 16px rgba(44,127,67,0.06)",
        padding: "34px 32px 26px",
        border: `1.3px solid #E7F6EC`
      }}
    >
      <h2
        style={{
          color: "#2E7D32",
          textAlign: "center",
          marginBottom: 8,
          letterSpacing: "0.01em"
        }}
      >
        Offline Event Generator
      </h2>
      {/* Progress bar and gamified streak */}
      <ProgressWithMilestones
        progress={progressFrac}
        completed={totalCompleted}
        milestones={progress.milestones}
        milestoneGoals={MILESTONE_THRESHOLDS}
        badges={MILESTONE_TITLES}
        lastBadge={
          progress.milestones.length === 0
            ? null
            : MILESTONE_TITLES[progress.milestones.length - 1]
        }
        streak={progress.streak || 0}
      />

      {/* Current Event Suggestion */}
      <div
        key={animKey}
        className="event-suggestion"
        style={{
          margin: "26px 0 18px",
          padding: "32px 18px",
          background: category ? `${category.color}33` : "#F2F6F5",
          borderRadius: 10,
          fontSize: 20,
          color: "#1A1A1A",
          minHeight: 72,
          transition: "background 0.3s"
        }}
      >
        {category ? (
          <>
            <span style={{ fontSize: 27, verticalAlign: "bottom" }}>
              {category.icon}
            </span>
            <span style={{ fontWeight: 500, marginLeft: 7 }}>
              {category.name}:
            </span>
            <span
              style={{
                fontStyle: "italic",
                marginLeft: 7,
                color: "#42743A"
              }}
            >
              {suggestion}
            </span>
          </>
        ) : (
          <span style={{ color: "#789262" }}>
            Ready for your next offline adventure?
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          gap: 18,
          justifyContent: "center",
          marginBottom: 12
        }}
      >
        <button
          className="btn btn-large"
          onClick={handleComplete}
          style={{
            background: "#2E7D32",
            color: "#fff",
            fontWeight: 700,
            borderRadius: 9,
            minWidth: 105,
            fontSize: 17,
            border: "none",
            outline: "none"
          }}
        >
          ✓ Done!
        </button>
        <button
          className="btn"
          onClick={handleSkip}
          style={{
            background: "#FFD600",
            color: "#273E17",
            borderRadius: 9,
            fontWeight: 500,
            minWidth: 83,
            fontSize: 16,
            border: "none",
            outline: "none"
          }}
        >
          Skip
        </button>
        <button
          className="btn"
          onClick={handleReset}
          style={{
            background: "#e0eff0",
            color: "#459269",
            borderRadius: 9,
            fontWeight: 400,
            minWidth: 65,
            fontSize: 14,
            border: "none",
            outline: "none"
          }}
        >
          Reset
        </button>
      </div>

      {/* Dynamic Feedback / Motivation */}
      {feedback.message && (
        <div
          className={`event-feedback ${feedback.type}`}
          style={{
            margin: "12px 0 0",
            textAlign: "center",
            color:
              feedback.type === "milestone"
                ? "#FFD600"
                : feedback.type === "success"
                  ? "#2E7D32"
                  : feedback.type === "skip"
                    ? "#B2DFDB"
                    : "#789262",
            fontWeight: 600,
            fontSize: 17,
            minHeight: 31,
            letterSpacing: "0.01em",
            transition: "color 0.3s"
          }}
        >
          {feedback.message}
        </div>
      )}

      {/* Quick list of recent achievements */}
      <RecentAchievements
        completed={progress.completed}
        milestones={progress.milestones}
      />
    </div>
  );
}

// --- Progress bar with milestone badges ---
// PUBLIC_INTERFACE
function ProgressWithMilestones({
  progress,
  completed,
  milestones,
  milestoneGoals,
  badges,
  lastBadge,
  streak
}) {
  // Renders badges for milestones achieved and upcoming
  return (
    <div style={{ width: "100%", marginBottom: 0, marginTop: 15 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%"
        }}
      >
        <div style={{ minWidth: 37, fontSize: 22, textAlign: "center" }}>
          {streak > 1 ? <span title="Streak 🔥">{`🔥${streak}`}</span> : ""}
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <div
            style={{
              background: "#F2F6F5",
              borderRadius: 8,
              overflow: "hidden",
              height: 14,
              marginBottom: 0,
              position: "relative"
            }}
          >
            <div
              style={{
                width: `${Math.round(progress * 100)}%`,
                background:
                  "linear-gradient(90deg, #2E7D32, #B2DFDB 78%, #FFD600)",
                height: "100%",
                transition: "width 0.7s cubic-bezier(.4,0,.2,1)"
              }}
            />
            {/* Milestone badges */}
            {milestoneGoals.map((goal, i) => (
              <span
                key={goal}
                style={{
                  position: "absolute",
                  left: `${Math.min(
                    100,
                    Math.floor((goal / milestoneGoals[milestoneGoals.length - 1]) * 100)
                  )}%`,
                  top: -13,
                  transform: "translateX(-50%)",
                  fontSize: milestones.includes(goal) ? 21 : 16,
                  opacity: milestones.includes(goal) ? 1 : 0.3,
                  color: "#E87A41"
                }}
                title={badges[i]}
              >
                {MILESTONE_EMOJIS[i]}
              </span>
            ))}
          </div>
          <div
            style={{
              marginTop: 4,
              fontSize: 13.2,
              color: "#789262",
              fontWeight: 400,
              letterSpacing: 0.08
            }}
          >
            {completed} complete{" "}
            {lastBadge && (
              <span style={{ fontWeight: 600, marginLeft: 7 }}>
                {MILESTONE_EMOJIS[milestones.length - 1]} {lastBadge}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Recent achievements panel ---
// PUBLIC_INTERFACE
function RecentAchievements({ completed, milestones }) {
  const lastActs = completed.slice(-3).reverse();
  return (
    <div style={{ marginTop: 20 }}>
      {milestones && milestones.length > 0 && (
        <div
          style={{
            background: "#FFF6D6",
            color: "#B4922E",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 15,
            padding: "8px 10px 5px 11px",
            textAlign: "left",
            marginBottom: 8,
            display: "inline-block"
          }}
        >
          <span role="img" aria-label="milestone">
            {MILESTONE_EMOJIS[milestones.length - 1]}
          </span>{" "}
          Milestone: <span>{MILESTONE_TITLES[milestones.length - 1]}</span>
        </div>
      )}
      {lastActs.length > 0 ? (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontSize: 14.2,
            color: "#789262",
            lineHeight: 1.41
          }}
        >
          {lastActs.map((ev, idx) => (
            <li key={idx}>
              <span style={{ fontWeight: 600 }}>{ev.category}:</span>{" "}
              <span>{ev.activity}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div
          style={{
            color: "#B2BEC3",
            fontStyle: "italic",
            fontSize: 14
          }}
        >
          Complete an event to start your badge streak!
        </div>
      )}
    </div>
  );
}
