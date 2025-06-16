import React, { useState, useEffect } from "react";

// Gamified asset/emoji pool (lightweight, given constraints)
const GAME_ICONS = ["🪴", "🏆", "🦸", "🐢", "🚲", "⛰️", "🥇", "💡", "🎯", "🔥", "🎉", "🌅"];

// Micro-habits library (stacking and adaptivity built in)
const BASE_HABIT_STACKS = [
  {
    name: "Morning Micro-Boost",
    habits: [
      { id: "water", label: "Drink a glass of water", icon: "💧" },
      { id: "stretch", label: "Do a 2-min stretch", icon: "🤸" },
      { id: "plan", label: "Write 1 thing for the day", icon: "📝" },
      { id: "detox", label: "10 min offline", icon: "⏰" },
    ],
    baseXP: 10,
    stackBenefit: "Unlocks daily burst challenge"
  },
  {
    name: "Offline Power-Up",
    habits: [
      { id: "offwalk", label: "Take a 5-min phone-free walk", icon: "🚶" },
      { id: "gratitude", label: "Write 1 gratitude", icon: "✍️" },
      { id: "deepbreathe", label: "3 deep breaths", icon: "🌬️" },
      { id: "random", label: "Random act of kindness", icon: "🤝" }
    ],
    baseXP: 12,
    stackBenefit: "Unlocks streak multiplier"
  },
  {
    name: "Evening Reset",
    habits: [
      { id: "journaltwo", label: "Journal 2 lines", icon: "📓" },
      { id: "nofeed", label: "No social feed for 20 mins", icon: "🚫" },
      { id: "relax", label: "1 min mindful relaxation", icon: "🧘" },
      { id: "planoffline", label: "Plan tomorrow's offline highlight", icon: "🗓️" }
    ],
    baseXP: 14,
    stackBenefit: "Unlocks bonus mini-game"
  }
];

// Milestones, streaks, and unlock schema
const MILESTONES = [
  { level: 1, label: "Small Start", emoji: "🌱", neededXP: 0 },
  { level: 2, label: "Steady Grower", emoji: "🌿", neededXP: 30 },
  { level: 3, label: "Momentum Maker", emoji: "🌳", neededXP: 70 },
  { level: 4, label: "Detox Hero", emoji: "🦸", neededXP: 135 },
  { level: 5, label: "Streak Sage", emoji: "🦉", neededXP: 220 }
];

// Adaptive micro-challenges pool for variety/engagement
const MICRO_CHALLENGES = [
  { id: "offlineDance", text: "Dance for 2min with zero screens 🎵💃", type: "fun" },
  { id: "gratitudeMsg", text: "Send a thank-you to someone IRL 📬", type: "social" },
  { id: "natureNote", text: "Notice 3 things in nature out loud 🌲🌞", type: "observation" },
  { id: "skipFeed", text: "Skip social feeds for 30min ⏳", type: "detox" },
  { id: "waterPlant", text: "Water any (real or imaginary) plant 🌵", type: "caring" },
  { id: "jumpingJacks", text: "Do 10 jumping jacks 🏋️", type: "movement" },
  { id: "paperDoodle", text: "Draw a doodle on paper ✏️", type: "creativity" }
];

const STARTING_UNLOCKS = {
  burstChallenge: false,
  streakMultiplier: false,
  bonusMiniGame: false
};

// Encouraging, adaptive feedback text
const FEEDBACK = {
  streak: [
    "🔥 Streak on! Consistency is your superpower.",
    "👏 Habit streak growing—keep stacking those wins!",
    "🌞 You're on fire! Another day, another brain-boost."
  ],
  levelup: [
    "🆙 Level up! New milestone reached.",
    "📈 Nice progress! You're unlocking new potential.",
    "🏆 Milestone unlocked—enjoy your new challenge."
  ],
  completedStack: [
    "🎉 Stack completed! Progress multiplied!",
    "✨ All habits done—you’re getting unstoppable.",
    "🙌 That’s the spirit of habit stacking!"
  ],
  challenge: [
    "🎲 Try this micro-challenge! Adapt and conquer.",
    "🌟 New challenge for you—let’s make it fun.",
    "💪 Adaptive quest: Are you game?"
  ]
};

// MiniDetoxGames main component
// PUBLIC_INTERFACE
function MiniDetoxGames() {
  // XP/streak/progress state
  const [xp, setXP] = useState(() => parseInt(localStorage.getItem("miniDetox_xp") || "0", 10));
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem("miniDetox_streak") || "0", 10));
  const [lastPlayed, setLastPlayed] = useState(() => localStorage.getItem("miniDetox_lastPlayed") || "");
  const [currentMilestone, setMilestone] = useState(1);

  // Which stack is active, per day
  const [selectedStack, setSelectedStack] = useState(0);
  // Completed microhabits in current stack for today
  const [completedHabits, setCompletedHabits] = useState({});
  // Track which unlocks/milestones are reached
  const [unlocks, setUnlocks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("miniDetox_unlocks")) || { ...STARTING_UNLOCKS };
    } catch {
      return { ...STARTING_UNLOCKS };
    }
  });

  // Feedback/encouragement shown after actions
  const [feedback, setFeedback] = useState("");
  // Adaptive micro-challenge for engagement
  const [currentChallenge, setCurrentChallenge] = useState(null);
  // Time/context awareness for streak resets (1 play per day)
  const todayKey = new Date().toISOString().slice(0, 10);

  // Update localStorage on relevant state changes
  useEffect(() => {
    localStorage.setItem("miniDetox_xp", xp);
    localStorage.setItem("miniDetox_streak", streak);
    localStorage.setItem("miniDetox_lastPlayed", lastPlayed);
    localStorage.setItem("miniDetox_unlocks", JSON.stringify(unlocks));
  }, [xp, streak, lastPlayed, unlocks]);

  // Advance milestone if XP threshold is reached
  useEffect(() => {
    const nextMilestone = MILESTONES.filter(m => xp >= m.neededXP).pop();
    if (nextMilestone && currentMilestone !== nextMilestone.level) {
      setMilestone(nextMilestone.level);
      setFeedback(FEEDBACK.levelup[Math.floor(Math.random()*FEEDBACK.levelup.length)]);
      // Unlock feature if milestone unlocks one
      if (nextMilestone.level === 2 && !unlocks.burstChallenge) {
        setUnlocks(u => ({ ...u, burstChallenge: true }));
      } else if (nextMilestone.level === 3 && !unlocks.streakMultiplier) {
        setUnlocks(u => ({ ...u, streakMultiplier: true }));
      } else if (nextMilestone.level === 4 && !unlocks.bonusMiniGame) {
        setUnlocks(u => ({ ...u, bonusMiniGame: true }));
      }
    }
    // eslint-disable-next-line
  }, [xp]);

  // Reset completedHabits on stack/day change
  useEffect(() => {
    if (lastPlayed !== todayKey) {
      setCompletedHabits({});
    }
    // eslint-disable-next-line
  }, [selectedStack, todayKey]);

  // Track streaks with day-switching logic
  useEffect(() => {
    if (lastPlayed && lastPlayed !== todayKey) {
      const prevDate = new Date(lastPlayed);
      const currDate = new Date(todayKey);
      const diff = (currDate - prevDate) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        setStreak(prev => prev + 1);
        setFeedback(FEEDBACK.streak[Math.floor(Math.random()*FEEDBACK.streak.length)]);
      } else if (diff > 1) {
        setStreak(1); // Reset streak
      }
    }
    // eslint-disable-next-line
  }, [todayKey, lastPlayed]);

  // Handle adaptive, randomized micro-challenge on habit stack complete
  useEffect(() => {
    if (
      Object.keys(completedHabits).length === BASE_HABIT_STACKS[selectedStack].habits.length &&
      Object.values(completedHabits).every(Boolean)
    ) {
      // Trigger adaptive micro-challenge (different each time)
      setTimeout(() => {
        const newChallenge = MICRO_CHALLENGES[Math.floor(Math.random() * MICRO_CHALLENGES.length)];
        setCurrentChallenge(newChallenge);
        setFeedback(FEEDBACK.challenge[Math.floor(Math.random()*FEEDBACK.challenge.length)]);
      }, 520);
    }
  // eslint-disable-next-line
  }, [completedHabits, selectedStack]);

  // Complete a micro-habit in the stack
  function completeHabit(habitId) {
    // No double-tap for completed today
    if (completedHabits[habitId]) return;
    const updated = { ...completedHabits, [habitId]: true };
    setCompletedHabits(updated);

    // Reward XP, more if all habits completed
    let gainedXP = BASE_HABIT_STACKS[selectedStack].baseXP;
    let allDone = false;
    if (
      Object.keys(updated).length === BASE_HABIT_STACKS[selectedStack].habits.length &&
      Object.values(updated).every(v => v)
    ) {
      // Max bonus if streakMultiplier is unlocked and streak >= 3
      allDone = true;
      let bonus = 0;
      if (unlocks.streakMultiplier && streak >= 3) bonus = gainedXP;
      gainedXP = gainedXP * 2 + bonus;
      setFeedback(FEEDBACK.completedStack[Math.floor(Math.random()*FEEDBACK.completedStack.length)]);
      setLastPlayed(todayKey);
      // Optionally reset currentChallenge here for next day
    }
    setXP(prev => prev + gainedXP);
    // Mark day played to prevent multiple full-stacks per day
    if (allDone) setLastPlayed(todayKey);
  }

  // Handle completing adaptive challenge
  function completeChallenge() {
    if (!currentChallenge) return;
    // 10 XP for adaptive challenge
    setXP(prev => prev + 10);
    setFeedback("🏅 Adaptive quest conquered! Great job.");
    setCurrentChallenge(null);
    // Optionally: unlock bonus reward if bonusMiniGame is active
  }

  // Reset progress if user wants (for testing/demo)
  function resetProgress() {
    setXP(0);
    setStreak(0);
    setMilestone(1);
    setLastPlayed("");
    setCompletedHabits({});
    setUnlocks({ ...STARTING_UNLOCKS });
    setCurrentChallenge(null);
    setFeedback("Progress reset! Ready for a fresh journey.");
    localStorage.removeItem("miniDetox_xp");
    localStorage.removeItem("miniDetox_streak");
    localStorage.removeItem("miniDetox_lastPlayed");
    localStorage.removeItem("miniDetox_unlocks");
  }

  // Helper for showing milestone as progress bar % (max level is 5)
  function milestoneProgress() {
    const current = MILESTONES.find(m => m.level === currentMilestone) || MILESTONES[0];
    const next = MILESTONES.find(m => m.level === currentMilestone + 1);
    if (!next) return 1.0;
    const range = next.neededXP - current.neededXP;
    return Math.min(1, (xp - current.neededXP) / range);
  }

  // UI Block: Render Habits (within stack)
  function HabitsList({ habits, done }) {
    return (
      <ul style={{
        listStyle: "none",
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 12
      }}>
        {habits.map(h =>
          <li
            key={h.id}
            style={{
              minWidth: 138,
              background: done[h.id] ? "#E7F6EC" : "#fff",
              color: done[h.id] ? "#2E7D32" : "#1A1A1A",
              border: "1px solid #B2DFDB",
              borderRadius: 8,
              padding: "12px 10px",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              boxShadow: done[h.id] ? "0 2px 8px #a7dab434": "0 1px 4px #eaeaea14",
              cursor: done[h.id] ? "not-allowed":"pointer",
              opacity: done[h.id] ? 0.7 : 1,
              fontWeight: done[h.id] ? 600 : 400,
              transition: "background 0.22s"
            }}
            onClick={() => completeHabit(h.id)}
            aria-disabled={done[h.id]}
          >
            <span style={{
              fontSize: 22, marginRight: 12, minWidth: 20
            }}>{h.icon}</span>
            {h.label}
            {done[h.id] && (
              <span style={{
                marginLeft: 8,
                fontSize: 18,
                color: "#FFD600"
              }}>✔️</span>
            )}
          </li>
        )}
      </ul>
    );
  }

  // UI Block: Adaptive Challenge
  function MicroChallengeBlock({ challenge, onComplete }) {
    if (!challenge) return null;
    return (
      <div style={{
        background: "#f9fbf8",
        border: "1px dashed #FFD600",
        borderRadius: 10,
        margin: "14px 0",
        padding: "15px",
        textAlign: "center",
        fontSize: 16,
        color: "#2E7D32"
      }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
          <span style={{marginRight: 6}}>🎲</span>
          Adaptive Challenge!
        </div>
        <div style={{ marginBottom: 9 }}>{challenge.text}</div>
        <button
          onClick={onComplete}
          className="btn"
          style={{
            background: "#FFD600",
            color: "#234921",
            border: "none",
            borderRadius: 7,
            fontSize: 15,
            fontWeight: 600,
            padding: "6px 20px",
            marginTop: 4,
            cursor: "pointer",
            boxShadow: "0 2px 8px #ffe47859"
          }}
        >
          Mark Complete
        </button>
      </div>
    );
  }

  // UI Block: Gamified Progress Bar
  function ProgressBar({ progress, milestone }) {
    return (
      <div style={{ marginTop: 14, marginBottom: 0, width: "100%" }}>
        <div style={{
          background: "#F2F6F5",
          borderRadius: 8,
          overflow: "hidden",
          height: 16,
          position: "relative"
        }}>
          <div style={{
            width: `${Math.round(progress * 100)}%`,
            background: `linear-gradient(90deg,#2E7D32,#FFD600)`,
            height: "100%",
            transition: "width 0.8s cubic-bezier(.4,0,.2,1)"
          }}/>
        </div>
        <div style={{
          marginTop: 3,
          fontSize: 13,
          color: "#6b994a",
          display: "flex",
          alignItems: "center"
        }}>
          <span style={{marginRight: 7}}>{MILESTONES[milestone-1].emoji}</span>
          {Math.round(progress * 100)}% to next milestone
        </div>
      </div>
    );
  }

  // UI Block: Streak counter
  function StreakDisplay({ streak }) {
    return (
      <div style={{
        fontSize: 15,
        color: streak >= 3 ? "#FFD600":"#2E7D32",
        fontWeight: streak >= 3 ? 700 : 500,
        background: "#fffbe7",
        border: "1px solid #FFD600",
        borderRadius: 8,
        padding: "2px 16px",
        margin: "0 0 10px 0",
        display: "inline-block",
        lineHeight: "2rem"
      }}>
        🔥 {streak} {streak === 1 ? "day":"days"} streak!
      </div>
    );
  }

  // UI Block: Unlocks
  function UnlocksBlock({ unlocks }) {
    return (
      <div style={{ margin: "10px 0 10px", display: "flex", gap:12, flexWrap: "wrap" }}>
        {unlocks.burstChallenge && (
          <span style={{
            padding: "3px 10px", background: "#fffbe9", borderRadius: 8,
            color: "#FF9400", border: "1px solid #FFD600", fontWeight: 600
          }}>
            🚀 Burst Challenge Unlocked!
          </span>
        )}
        {unlocks.streakMultiplier && (
          <span style={{
            padding: "3px 10px", background: "#e6ffef", borderRadius: 8,
            color: "#2E7D32", border: "1px solid #B2DFDB", fontWeight: 600
          }}>
            ✨ Streak Multiplier!
          </span>
        )}
        {unlocks.bonusMiniGame && (
          <span style={{
            padding: "3px 10px", background: "#e9e5ff", borderRadius: 8,
            color: "#5d3a9c", border: "1px solid #C4B9FB", fontWeight: 600
          }}>
            🎮 Bonus Mini-Game!
          </span>
        )}
      </div>
    );
  }

  // UI Block: Feedback encouragement
  function FeedbackBlock({ text }) {
    if (!text) return null;
    return (
      <div style={{
        background: "#fafcfb",
        color: "#2E7D32",
        border: "1px dashed #FFD600",
        borderRadius: 9,
        margin: "10px 0 6px 0",
        padding: "6px 13px",
        fontSize: 15,
        fontWeight: 600
      }}>
        {text}
      </div>
    );
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 16px #E7F6EC22",
      padding: "18px 22px 30px",
      maxWidth: 480,
      margin: "18px auto",
      minHeight: 340
    }}>
      <h2
        style={{
          textAlign: "center",
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: 0,
          color: "#2E7D32",
          marginTop: 0
        }}
      >
        Mini Detox Games {GAME_ICONS[currentMilestone % GAME_ICONS.length]}
      </h2>

      <div style={{textAlign: "center", fontSize: 12, color: "#789262", marginBottom: 10}}>
        Progress gamified: Stack healthy habits, hit milestones, conquer adaptive challenges, earn rewards!
      </div>

      <ProgressBar progress={milestoneProgress()} milestone={currentMilestone} />

      <div style={{ marginTop: 16, marginBottom: 10 }}>
        <StreakDisplay streak={streak} />
        <UnlocksBlock unlocks={unlocks} />
        <FeedbackBlock text={feedback} />
      </div>

      {/* Habit Stack selection (days can try a different one mid-day for fun) */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 10,
        marginTop: 3,
        marginBottom: 10
      }}>
        {BASE_HABIT_STACKS.map((stack, idx) => (
          <button
            key={stack.name}
            onClick={() => setSelectedStack(idx)}
            className={selectedStack === idx ? "btn" : ""}
            style={{
              background: selectedStack === idx ? "#B2DFDB":"#F2F6F5",
              color: "#1A1A1A",
              fontWeight: selectedStack === idx ? 700 : 600,
              border: selectedStack === idx ? "2px solid #2E7D32":"1px solid #B2DFDB",
              borderRadius: 9,
              padding: "8px 14px",
              cursor: "pointer",
              marginBottom: 0,
              fontSize: 15
            }}
            aria-current={selectedStack === idx}
          >
            {stack.name}
          </button>
        ))}
      </div>

      <div style={{
        background: "#F2F6F5",
        borderRadius: 14,
        padding: "8px 0 8px 0",
        margin: "8px 0 10px 0"
      }}>
        <HabitsList
          habits={BASE_HABIT_STACKS[selectedStack].habits}
          done={completedHabits}
        />
      </div>

      <div style={{
        fontSize: 12,
        color: "#789262",
        margin: "0px 0 5px 2px"
      }}>
        Finish all {BASE_HABIT_STACKS[selectedStack].habits.length} for bonus XP and an adaptive challenge!
      </div>

      <MicroChallengeBlock
        challenge={currentChallenge}
        onComplete={completeChallenge}
      />

      <button
        onClick={resetProgress}
        style={{
          background: "#eaeaea",
          color: "#555",
          border: "none",
          outline: "none",
          borderRadius: 7,
          fontWeight: 600,
          fontSize: 13,
          padding: "2px 13px",
          marginTop: 20,
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          cursor: "pointer",
          opacity: 0.70
        }}>
        Reset Progress
      </button>
    </div>
  );
}

export default MiniDetoxGames;
