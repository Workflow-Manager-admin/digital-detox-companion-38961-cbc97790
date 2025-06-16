import React, { useState, useEffect } from "react";

/**
 * Gamified, adaptive event generator for digital detox.
 * - Suggests engaging real-world events ("quests") with increasing challenge and milestone logic
 * - Tracks achievements, adaptive feedback, and gamifies "offline time" as progress
 * - Offers badges, streak encouragement, and randomized user experience
 */

// EVENT TIERS and BADGES
const MILESTONES = [
  { name: "First Step!", threshold: 1, icon: "🥾", desc: "You completed your very first offline quest!" },
  { name: "Explorer", threshold: 3, icon: "⛺", desc: "Completed 3 unique activities." },
  { name: "Habit Gainer", threshold: 7, icon: "🏆", desc: "A week of consistent offline fun!" },
  { name: "Master of Offline", threshold: 15, icon: "🌲", desc: "15 events—real-life is your new digital!" },
  { name: "Social Pioneer", threshold: 25, icon: "🎉", desc: "Shared or co-hosted 25 offline events." }
];

// Event QUESTS (mix of easy, social, active, challenge)
const EVENT_LIBRARY = [
  {
    cat: "Active", icon: "🚶", label: "Nature Walk",
    description: "Take a 30-minute walk outdoors—phone-free. If possible, invite a friend."
  },
  {
    cat: "Mindful", icon: "🧘", label: "Silent Hour",
    description: "Set aside an hour for quiet reflection, journaling, or meditation. No screens!"
  },
  {
    cat: "Social", icon: "🎲", label: "Offline Game",
    description: "Play a board or card game with someone in-person, even if it's just Tic-Tac-Toe."
  },
  {
    cat: "Creative", icon: "🎨", label: "Art Burst",
    description: "Draw, sketch, or craft something with your hands. Show off your creation later!"
  },
  {
    cat: "Discovery", icon: "🌳", label: "Explore a Nearby Park",
    description: "Visit a local green space and take note of three things you've never observed before."
  },
  {
    cat: "Kindness", icon: "🤝", label: "Mini Good Deed",
    description: "Do a simple kind act for someone in person, then enjoy the boost!"
  },
  {
    cat: "Challenge", icon: "🧗", label: "2-Hour Challenge",
    description: "Go two full hours without touching your device. If you succeed, reward yourself."
  },
  {
    cat: "Fun", icon: "🎵", label: "Analog Music Jam",
    description: "Listen to music (radio/records/CDs) with no visual component, or make your own!"
  },
  {
    cat: "Social", icon: "🍽️", label: "Offline Meal",
    description: "Eat with someone you care about—no devices at the table."
  },
  {
    cat: "Wellbeing", icon: "🛁", label: "Pamper Time",
    description: "Treat yourself to a bath, spa-style face mask, or relaxing unwind. Devices out of reach!"
  },
];

// DYNAMIC ENCOURAGEMENT MESSAGES
const ENCOURAGEMENT=[
  "Offline legend! Want a new quest?",
  "Keep the streak going! 📅",
  "You’re unlocking real-world rewards!",
  "Every quest makes you stronger 💪",
  "Remember: The best stories happen away from screens.",
  "Another milestone is just around the corner!",
  "Impressive! How about a different type of quest next?",
  "Achieved a badge? Go flex it in real life!",
  "Small steps or big leaps—progress is progress."
];

// Helper functions
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function pickRandom(arr) {
  return arr[getRandomInt(arr.length)];
}

// PUBLIC_INTERFACE
function OfflineEventGenerator() {
  // Persistent state: completed, streak, and milestones (all in localStorage to persist "game" progress)
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("offlineEventCompleted") || "[]");
    } catch { return []; }
  });
  const [streak, setStreak] = useState(() => {
    try {
      return Number(localStorage.getItem("offlineStreak") || 0);
    } catch { return 0; }
  });
  const [lastCompleteDate, setLastCompleteDate] = useState(() => {
    try {
      return localStorage.getItem("offlineLastComplete") || null;
    } catch { return null; }
  });
  const [currentEvent, setCurrentEvent] = useState(() => pickAdaptiveEvent([], 0));
  const [milestoneIndex, setMilestoneIndex] = useState(() => {
    const count = completed.length;
    let idx = 0;
    while (idx+1 < MILESTONES.length && count>=MILESTONES[idx+1].threshold) idx++;
    return idx;
  });
  const [showBadge, setShowBadge] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // On mount: check streak logic (daily streaks)
  useEffect(() => {
    if (!lastCompleteDate) return;
    const last = new Date(lastCompleteDate);
    const today = new Date();
    const diff = Math.floor((today - last) / (1000*60*60*24));
    if (diff === 1) {
      // Consecutive day
      setStreak(s => s+1);
    } else if (diff > 1) {
      setStreak(1); // Reset
    }
    // persist streak
    try { localStorage.setItem("offlineStreak", streak); } catch {}
    // eslint-disable-next-line
  }, []);

  // Save on change
  useEffect(() => {
    try { localStorage.setItem("offlineEventCompleted", JSON.stringify(completed)); } catch {}
    try { localStorage.setItem("offlineStreak", streak); } catch {}
    // Check for new milestone unlocks
    let idx = milestoneIndex;
    while (idx+1 < MILESTONES.length && completed.length >= MILESTONES[idx+1].threshold) idx++;
    if (idx !== milestoneIndex) {
      setMilestoneIndex(idx);
      setShowBadge(true);
      setFeedbackMsg(`🏅 New Milestone: "${MILESTONES[idx].name}" unlocked!`);
    }
    // eslint-disable-next-line
  }, [completed, streak]);

  // Adaptive event choice: prefer not to repeat last 3, escalate challenge every few events
  function pickAdaptiveEvent(prevs, nCompleted) {
    let eligible = EVENT_LIBRARY.filter(ev =>
      !prevs.slice(-3).includes(ev.label)
      // Filter out those just completed recently
    );
    // Every 5th event, ~challenge mode
    if ((nCompleted+1)%5===0) {
      const challengeEvts = EVENT_LIBRARY.filter(ev=>ev.cat==='Challenge');
      if (challengeEvts.length) eligible = challengeEvts;
    }
    return pickRandom(eligible.length?eligible:EVENT_LIBRARY);
  }

  // Complete event handler
  function handleCompleteEvent() {
    if (loading) return;
    setLoading(true);

    // Update completed list
    const prevs = [...completed, currentEvent.label];
    setCompleted(prevs);

    // Update lastCompleteDate to ISO
    const today = new Date().toISOString();
    setLastCompleteDate(today);
    try { localStorage.setItem("offlineLastComplete", today); } catch {}

    // Streak logic handled in useEffect on mount if needed

    // Show feedback, encouragement, and possibly milestone
    let msg = pickRandom(ENCOURAGEMENT);
    // If new milestone, force the message
    let idx = milestoneIndex;
    while (idx+1 < MILESTONES.length && prevs.length >= MILESTONES[idx+1].threshold) idx++;
    if (idx !== milestoneIndex) {
      msg = `🏅 Milestone reached: ${MILESTONES[idx].name}! Keep going.`;
      setShowBadge(true);
      setMilestoneIndex(idx);
    }

    setFeedbackMsg(msg);

    // Adaptive: Next event
    setTimeout(()=>{
      setCurrentEvent(pickAdaptiveEvent(prevs, prevs.length));
      setShowBadge(false);
      setLoading(false);
    }, 2100); // Show badge/feedback briefly
  }

  // Shuffle to new event
  function handleSkip() {
    if (loading) return;
    setCurrentEvent(pickAdaptiveEvent(completed, completed.length));
    setFeedbackMsg("Here's a different quest. Mix it up!");
    setShowBadge(false);
  }

  // Reset achievements for demo/testing (not exposed in UI unless user triple-clicks a 'secret' area)
  function handleResetProgress() {
    setCompleted([]);
    setStreak(0);
    setLastCompleteDate(null);
    setMilestoneIndex(0);
    setShowBadge(false);
    setFeedbackMsg("Progress reset! Ready for a new challenge?");
    try {
      localStorage.removeItem("offlineEventCompleted");
      localStorage.removeItem("offlineStreak");
      localStorage.removeItem("offlineLastComplete");
    } catch {}
    setCurrentEvent(pickAdaptiveEvent([], 0));
  }

  // Component rendering
  return (
    <div className="offline-event-gen"
         style={{
            background: "#fcfbe4",
            borderRadius: 20,
            boxShadow: "0 2px 12px rgba(44,127,67,0.07)",
            padding: "36px 28px 28px",
            margin: "24px 0 0",
            minHeight: 350,
            maxWidth: 508,
            marginLeft: "auto", marginRight: "auto"
         }}>
      <h2 style={{marginTop:0, marginBottom:16, color:"#2E7D32", fontWeight:700, letterSpacing:0.1, fontSize:"2rem"}}>
        🕹️ Offline Quests
      </h2>
      <ProgressBar progress={completed.length / MILESTONES[MILESTONES.length-1].threshold} />
      <div style={{minHeight:90, margin:"30px 0 17px", position:"relative"}}>
        <EventCard event={currentEvent} />
      </div>
      <div style={{display:"flex",gap:13}}>
        <button
          className="btn"
          onClick={handleCompleteEvent}
          disabled={loading}
          style={{
            background: "#2E7D32",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1.08rem",
            padding: "10px 26px",
            borderRadius: 8,
            outline: "none",
            border: "none",
            cursor: "pointer",
            opacity: loading ? .7 : 1,
            boxShadow:"0 1px 4px #dbecd4"
          }}
          aria-label="Mark quest as complete"
        >
          {loading ? "Completing..." : "Complete"}
        </button>
        <button
          className="btn"
          onClick={handleSkip}
          disabled={loading}
          style={{
            background: "#FFD600",
            color: "#644003",
            fontWeight: 500,
            fontSize: "1.0rem",
            padding: "10px 21px",
            borderRadius: 8,
            border: "none",
            outline: "none",
            cursor: "pointer",
            opacity: loading ? .55 : 1,
            boxShadow:"0 1px 4px #ede9d0"
          }}
          aria-label="Show another quest"
        >
          {loading ? "..." : "New Quest"}
        </button>
        {/* Secret triple-click for reset */}
        <button
          className="btn"
          style={{
            background: "transparent",
            color: "#bbc6bb",
            border: "none",
            marginLeft: 33,
            fontSize: "1.04rem",
            display: "inline", minWidth: 0
          }}
          aria-label="Reset achievements"
          tabIndex={-1}
          onClick={e=>{
            if (e.detail===3) handleResetProgress(); // triple click
          }}
        >⭮</button>
      </div>
      <div style={{minHeight:42, margin:"12px 0 0", color:"#2E7D32", fontWeight:500, fontSize:"1.07rem"}}>
        {feedbackMsg ? <span style={{
          background: "#EEEBC4", borderRadius: 8, padding: "8px 22px", display:"inline-block"
        }}>{showBadge
          ? <span style={{fontWeight:600, fontSize:"1.08em"}}>{feedbackMsg}</span>
          : feedbackMsg
        }</span> : ""}
      </div>
      <Achievements
        completed={completed}
        streak={streak}
        milestoneIndex={milestoneIndex}
        showBadge={showBadge}
      />
    </div>
  );
}

/**
 * Compact event display card
 */
function EventCard({ event }) {
  if (!event) return null;
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "21px 14px 14px",
        boxShadow: "0 2px 10px #e3eed9",
        textAlign: "center",
        minHeight: 70,
        position: "relative"
      }}
    >
      <div style={{ fontSize: 34, marginBottom: 6 }}>{event.icon}</div>
      <div style={{ fontWeight: 600, color: "#2E7D32", fontSize: "1.2rem" }}>{event.label}</div>
      <div style={{ color: "#6c8e44", fontWeight: 400, fontSize: 15, marginTop: 5 }}>
        {event.description}
      </div>
      <div style={{
        position:"absolute", right:10, top:12, fontSize: 14, color:"#b5b98e", fontWeight:400
      }}>
        {event.cat}
      </div>
    </div>
  );
}

/**
 * Shows streak progress and milestone badges
 */
function Achievements({ completed, streak, milestoneIndex, showBadge }) {
  return (
    <div style={{marginTop:26}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div>
          <span style={{fontWeight:600, color:"#2E7D32"}}>Streak: </span>
          <span style={{
            fontWeight:600,
            fontSize: "1.04em",
            color: streak >= 3 ? "#FFD600" : "#bbb",
            textShadow: streak >= 7 ? "1px 2.5px 4px #ffeead55" : ""
          }}>
            {streak || 0} days
          </span>
        </div>
        <div>
          <span style={{fontWeight:600, color:"#2E7D32"}}>Achievements: </span>
          {MILESTONES.slice(0,milestoneIndex+1).map(b=>(
            <span key={b.name} title={b.desc}
              style={{
                fontSize: "1.1em",
                marginRight: 9,
                filter: "drop-shadow(0 1.4px 3px #e9f5d6)",
                fontWeight: 600,
                opacity: showBadge && b===MILESTONES[milestoneIndex] ? 1 : 0.875,
                transition: "opacity 0.7s"
              }}
            >
              {b.icon}
            </span>
          ))}
        </div>
      </div>
      <div style={{marginTop:8, color:"#bfae61", fontSize:13, fontWeight:400}}>
        {milestoneIndex===0
          ? "Complete events to unlock your first badge."
          : `Next: "${ (MILESTONES[milestoneIndex+1]||{}).name || "You've unlocked all!" }"`
        }
      </div>
    </div>
  );
}

/**
 * Minimal progress bar (reuses DetoxModes style)
 */
function ProgressBar({ progress }) {
  return (
    <div style={{ marginTop: 16, width: "100%", marginBottom:8 }}>
      <div style={{
        background: "#F2F6F5",
        borderRadius: 8,
        overflow: "hidden",
        height: 13,
        position: "relative"
      }}>
        <div style={{
          width: `${Math.min(Math.round(progress * 100),100)}%`,
          background: "linear-gradient(90deg, #2E7D32, #FFD600)",
          height: "100%",
          transition: "width 0.8s cubic-bezier(.4,0,.2,1)"
        }} />
      </div>
      <div style={{
        marginTop: 2,
        fontSize: 12,
        color: "#789262"
      }}>
        {Math.min(Math.round(progress * 100),100)}% complete to next milestone
      </div>
    </div>
  );
}

export default OfflineEventGenerator;
