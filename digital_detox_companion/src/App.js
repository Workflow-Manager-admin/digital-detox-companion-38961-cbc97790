import React, { useState } from "react";
import "./App.css";
import DetoxJourneyMap from "./DetoxJourneyMap";
import TimeReallocationTracker from "./TimeReallocationTracker";
import BuddyStreakSystem from "./BuddyStreakSystem";
import DetoxModes from "./DetoxModes";
import OfflineEventGenerator from "./OfflineEventGenerator";
import MiniDetoxGames from "./MiniDetoxGames";
import ParentTeenMode from "./ParentTeenMode";
import DigitalBudgetMode from "./DigitalBudgetMode";
import CommunityCircles from "./CommunityCircles";
import IntegrationsHub from "./IntegrationsHub";

// Color variables (from requirements)
const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  bg: "#fff",
  text: "#1A1A1A",
};

// Minimal inline styles for theme and layout
const minimalTheme = {
  "--primary": COLORS.primary,
  "--secondary": COLORS.secondary,
  "--accent": COLORS.accent,
  "--bg": COLORS.bg,
  "--text": COLORS.text,
};

// PUBLIC_INTERFACE
function App() {
  const [tab, setTab] = useState("plan");

  // Navigation tabs, now including Community Circles and Digital Budget Mode
  const navTabs = [
    {
      id: "journey",
      label: "Journey Map",
      icon: "🛤️"
    },
    {
      id: "plan",
      label: "Detox Plan",
      icon: "🗓️"
    },
    {
      id: "circles",
      label: "Circles",
      icon: "🫂"
    },
    {
      id: "budget",
      label: "Budget Mode",
      icon: "🎛️"
    },
    {
      id: "games",
      label: "Mini Games",
      icon: "🕹️"
    },
    {
      id: "modes",
      label: "Detox Modes",
      icon: "🎯"
    },
    {
      id: "family",
      label: "Parent-Teen",
      icon: "🏠"
    },
    {
      id: "events",
      label: "Events",
      icon: "🗺️"
    },
    {
      id: "reallocation",
      label: "Reallocation",
      icon: "⏳"
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: "🔗"
    },
    {
      id: "buddy",
      label: "Buddy System",
      icon: "🤝"
    },
    {
      id: "rewards",
      label: "Rewards",
      icon: "🎁"
    },
    {
      id: "checkin",
      label: "Check-In",
      icon: "📍"
    },
    {
      id: "journal",
      label: "Journal",
      icon: "📖"
    }
  ];

  // Renders the currently active page/component
  function renderPage() {
    switch (tab) {
      case "journey":
        return <DetoxJourneyMap />;
      case "plan":
        return <DetoxPlanPage />;
      case "circles":
        return <CommunityCircles />;
      case "budget":
        return <DigitalBudgetMode />;
      case "games":
        return <MiniDetoxGames />;
      case "modes":
        return <DetoxModes />;
      case "family":
        return <ParentTeenMode />;
      case "events":
        return <OfflineEventGenerator />;
      case "reallocation":
        return <TimeReallocationTracker />;
      case "integrations":
        return <IntegrationsHub />;
      case "buddy":
        return <BuddySystemPage />;
      case "rewards":
        return <RewardsPage />;
      case "checkin":
        return <CheckInPage />;
      case "journal":
        return <JournalPage />;
      default:
        return <DetoxPlanPage />;
    }
  }

  return (
    <div
      className="app"
      style={{
        background: minimalTheme["--bg"],
        color: minimalTheme["--text"],
        minHeight: "100vh",
        fontFamily: "Inter, Roboto, Arial, sans-serif"
      }}
    >
      <nav
        className="navbar"
        style={{
          background: "#fff",
          borderBottom: "1px solid #eee",
          color: COLORS.primary,
          padding: "0",
          boxShadow: "0 2px 6px rgba(44,127,67,0.03)",
          zIndex: 20
        }}
      >
        <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            height: 56,
            justifyContent: "space-between"
          }}>
            <div className="logo" style={{ fontWeight: 600, color: COLORS.primary, fontSize: 20 }}>
              <span
                className="logo-symbol"
                style={{
                  color: COLORS.accent,
                  fontWeight: 700,
                  fontSize: 24,
                  verticalAlign: "middle"
                }}
              >
                💡
              </span>
              Digital Detox Companion
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {navTabs.map((t) => (
                <NavTab
                  key={t.id}
                  label={t.label}
                  icon={t.icon}
                  active={tab === t.id}
                  onClick={() => setTab(t.id)}
                  accentColor={COLORS.accent}
                  primaryColor={COLORS.primary}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main style={{ marginTop: 76 }}>
        <div className="container" style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          {renderPage()}
        </div>
      </main>
      <footer
        style={{
          padding: "24px 0 8px",
          color: COLORS.primary,
          background: "#fafcfb",
          borderTop: "1px solid #E7F6EC",
          textAlign: "center",
          fontWeight: 500,
          fontSize: "1.05rem",
          marginTop: 32,
          letterSpacing: 0.1
        }}
      >
        Enjoy the world beyond the screen. 🌳 
      </footer>
    </div>
  );
}

// ----------- NAV TAB COMPONENT -----------
// PUBLIC_INTERFACE
function NavTab({ label, icon, active, onClick, accentColor, primaryColor }) {
  return (
    <button
      className="tab-btn"
      aria-current={active ? "page" : undefined}
      style={{
        background: "none",
        border: "none",
        color: active ? primaryColor : "#789262",
        borderBottom: active ? `3px solid ${accentColor}` : "3px solid transparent",
        fontSize: 16,
        fontWeight: active ? 600 : 400,
        padding: "12px 10px 7px",
        margin: "0 2px",
        cursor: "pointer",
        outline: "none",
        position: "relative"
      }}
      onClick={onClick}
    >
      <span style={{ fontSize: 18, marginRight: 5 }}>{icon}</span>
      {label}
    </button>
  );
}

// ----------- DETOX PLAN PAGE -----------
function DetoxPlanPage() {
  const plan = {
    steps: [
      { id: 1, text: "Limit social media to 90 min/day (Week 1)", done: true },
      { id: 2, text: "Add 30-min offline activity daily (Week 1)", done: true },
      { id: 3, text: "Reduce social media to 60 min/day (Week 2)", done: false },
      { id: 4, text: "Try 1 'off-grid' block (2 hrs online-free) (Week 2)", done: false },
    ],
    currentGoal: "60 minutes/day • Week 2",
    progress: 0.5,
  };

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ color: COLORS.primary, fontSize: '2.1rem', marginBottom: 6 }}>
        Your Digital Detox Plan
      </h2>
      <p style={{
        color: COLORS.secondary,
        fontWeight: 500,
        fontSize: "1.1rem"
      }}>
        Current goal: <span style={{ color: COLORS.primary }}>{plan.currentGoal}</span>
      </p>
      <ProgressBar progress={plan.progress} />
      <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
        {plan.steps.map((step) => (
          <li key={step.id} style={{
            marginBottom: 12,
            padding: "12px 18px",
            borderRadius: 8,
            background: step.done ? "#F3FCF9" : "#EFFBFC",
            color: COLORS.text,
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: step.done ? "0 2px 4px 0 rgba(46,125,50,0.03)" : "none"
          }}>
            <span style={{
              fontSize: 19,
              color: step.done ? COLORS.primary : "#bdbdbd"
            }}>
              {step.done ? "✔️" : "⏳"}
            </span>
            <span style={{ textDecoration: step.done ? "line-through" : "none" }}>
              {step.text}
            </span>
          </li>
        ))}
      </ul>
      <div style={{
        marginTop: 28,
        background: COLORS.secondary,
        borderRadius: 14,
        padding: "18px 24px",
        color: COLORS.primary,
        fontWeight: 500,
      }}>
        Detox Tip: <span style={{ color: COLORS.primary }}>Plan offline fun after your check-in!</span>
      </div>
    </section>
  );
}

// ----------- PROGRESS BAR -----------
// PUBLIC_INTERFACE
function ProgressBar({ progress }) {
  return (
    <div style={{ marginTop: 16, marginBottom: 0, width: "100%" }}>
      <div style={{
        background: "#F2F6F5",
        borderRadius: 8,
        overflow: "hidden",
        height: 14,
        position: "relative"
      }}>
        <div style={{
          width: `${Math.round(progress * 100)}%`,
          background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
          height: "100%",
          transition: "width 0.8s cubic-bezier(.4,0,.2,1)"
        }} />
      </div>
      <div style={{
        marginTop: 3,
        fontSize: 13,
        color: "#789262"
      }}>
        {Math.round(progress * 100)}% completed
      </div>
    </div>
  );
}

// ----------- ACCOUNTABILITY BUDDY PAGE -----------
// PUBLIC_INTERFACE
function BuddySystemPage() {
  const paired = true;
  const buddy = { id: "anonbuddy14", status: "active", streak: 4 };

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ color: COLORS.primary, fontSize: '2.1rem', marginBottom: 7 }}>
        Accountability Buddy
      </h2>
      {paired ? (
        <>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            background: "#EFFBFC",
            padding: "18px 18px 15px",
            borderRadius: 14,
            marginBottom: 16
          }}>
            <span style={{
              fontSize: 36,
              color: COLORS.primary,
              marginRight: 9
            }}>
              🤝
            </span>
            <div>
              <div style={{ color: COLORS.primary, fontWeight: 600, fontSize: "1.1rem" }}>
                Paired with: {buddy.id} &bull; <span style={{ fontWeight: 400, color: "#7a8875" }}>anonymous</span>
              </div>
              <div style={{ color: "#82B571", fontWeight: 500, fontSize: "1.06rem" }}>
                Streak: {buddy.streak} days
              </div>
            </div>
          </div>
          <BuddyStreakSystem
            streakDays={buddy.streak}
            buddyName={buddy.id}
            buddyStatus={buddy.status}
            showBuddy={true}
            onBreakReflection={(reflection) => {
              alert("Reflection sent to buddy!\n\n" + reflection);
            }}
          />
          <BuddyMessagePane />
        </>
      ) : (
        <div>
          <div style={{
            padding: 18,
            background: "#f8fbe9",
            borderRadius: 12,
            color: COLORS.primary,
            marginBottom: 10
          }}>
            You are currently not paired.<br />
            <button
              style={{
                marginTop: 8,
                padding: "9px 20px",
                borderRadius: 5,
                background: COLORS.primary,
                color: "white",
                border: "none",
                fontWeight: 500,
                cursor: "pointer"
              }}
              onClick={() => null}
            >
              Find Buddy
            </button>
          </div>
          <p style={{ color: "#787e7a" }}>
            Pairing is anonymous for focused support!
          </p>
        </div>
      )}
    </section>
  );
}

// Simulated buddy chat pane
function BuddyMessagePane() {
  const lastMessage = {
    fromBuddy: true,
    time: "2h ago",
    text: "How did your check-in go today? Stay strong! 💪"
  };
  return (
    <div style={{
      padding: "18px 20px",
      background: "#fff",
      border: "1px solid #E0EFE4",
      borderRadius: 9,
      marginBottom: 8,
      minHeight: 50
    }}>
      <div style={{
        marginBottom: 8,
        color: "#A1ACAE",
        fontSize: 13
      }}>
        Latest from your buddy:
      </div>
      <div style={{ color: COLORS.primary, fontWeight: 500, fontSize: "1.04rem" }}>
        "{lastMessage.text}"
      </div>
      <div style={{ textAlign: "right", color: "#9abcb9", fontSize: 11 }}>
        {lastMessage.time}
      </div>
      <button
        style={{
          marginTop: 10,
          background: COLORS.accent,
          color: "#313619",
          border: "none",
          borderRadius: 5,
          padding: "7px 22px",
          fontWeight: 500,
          fontSize: 15,
          cursor: "pointer"
        }}
        onClick={() => alert("Message your buddy! (Demo only)")}
      >
        Send Encouragement
      </button>
    </div>
  );
}

// ----------- REWARDS PAGE -----------
// PUBLIC_INTERFACE
function RewardsPage() {
  const rewards = [
    { id: 1, name: "Coffee voucher", unlocked: true, desc: "Earned at 3-day streak", icon: "☕" },
    { id: 2, name: "Gift card", unlocked: false, desc: "7 days offline streak", icon: "🎟️" },
    { id: 3, name: "Outdoor Yoga Pass", unlocked: false, desc: "Try 2 off-grid activities", icon: "🧘" },
  ];

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ color: COLORS.primary, fontSize: "2.1rem", marginBottom: 7 }}>
        Milestone Rewards
      </h2>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 18,
        marginTop: 12
      }}>
        {rewards.map((r, idx) => (
          <div
            key={r.id}
            style={{
              background: r.unlocked ? "#fafbe4" : "#F2F6F5",
              border: r.unlocked ? `2px solid ${COLORS.accent}` : "1px solid #e2efe6",
              borderRadius: 14,
              padding: "22px 26px",
              fontWeight: 500,
              fontSize: 16,
              minWidth: 180,
              boxShadow: "0 2px 4px 0 rgba(46,125,50,0.02)",
              opacity: r.unlocked ? 1 : 0.65,
              color: r.unlocked ? COLORS.primary : "#888"
            }}
          >
            <div style={{
              fontSize: 32,
              marginBottom: 6,
              filter: r.unlocked ? "none" : "grayscale(0.7)"
            }}>
              {r.icon}
            </div>
            <div>{r.name}</div>
            <div style={{
              color: r.unlocked ? COLORS.accent : "#A7C5B1",
              marginTop: 4,
              fontWeight: 400,
              fontSize: 14
            }}>
              {r.desc}
            </div>
            {r.unlocked && (
              <span style={{
                color: COLORS.accent,
                background: "#fcfded",
                borderRadius: 6,
                fontWeight: 700,
                padding: "2px 9px",
                marginTop: 5,
                fontSize: 12,
                display: "inline-block"
              }}>
                Unlocked!
              </span>
            )}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 30,
        textAlign: "center",
        color: "#999D86",
        fontSize: 15
      }}>
        <span>
          Rewards promote real-life experiences. <br />
          Celebrate your milestones offline!
        </span>
      </div>
    </section>
  );
}

// ----------- CHECK IN PAGE -----------
// PUBLIC_INTERFACE
function CheckInPage() {
  const checkinHistory = [
    { id: 1, text: "Nature walk (Central Park)", date: "Yesterday", icon: "🌳" },
    { id: 2, text: "Offline dinner with friends", date: "2 days ago", icon: "🍽️" }
  ];

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ color: COLORS.primary, fontSize: "2.1rem", marginBottom: 7 }}>
        Off-Grid Check-In
      </h2>
      <div style={{
        padding: "19px 24px 14px",
        background: "#EFFBFC",
        borderRadius: 12,
        marginBottom: 16,
        color: "#20502C"
      }}>
        Log an offline activity to boost your progress!
      </div>
      <button
        style={{
          background: COLORS.primary,
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "10px 24px",
          fontWeight: 500,
          fontSize: 16,
          marginBottom: 18,
          cursor: "pointer"
        }}
        onClick={() =>
          alert("Demo: Check-in! In a full app, log activities here.")
        }
      >
        New Check-In
      </button>
      <div style={{ marginTop: 8 }}>
        <div style={{
          color: COLORS.primary,
          marginBottom: 7,
          fontWeight: 500
        }}>
          Recent Check-Ins
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {checkinHistory.map((c) => (
            <li key={c.id} style={{
              marginBottom: 11,
              padding: "10px 18px",
              background: "#fff",
              borderRadius: 9,
              border: "1px solid #cbe0d2",
              color: "#426046",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 13,
              fontSize: 15
            }}>
              <span style={{ fontSize: 19 }}>{c.icon}</span>
              <span>{c.text}</span>
              <span style={{ marginLeft: "auto", color: "#B3B5A9", fontWeight: 400, fontSize: 14 }}>
                {c.date}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{
        marginTop: 22,
        color: "#9AADA6",
        fontSize: 14
      }}>
        More check-ins, more progress!
      </div>
    </section>
  );
}

// ----------- JOURNAL PAGE -----------
// PUBLIC_INTERFACE
function JournalPage() {
  const entries = [
    {
      id: 2,
      text: "Felt refreshed after spending two hours reading in the park.",
      date: "2024-06-08"
    },
    {
      id: 1,
      text: "Managed to reduce screen time. Noticed feeling less distracted.",
      date: "2024-06-07"
    }
  ];

  const aiPrompt = "Reflect on your experience: How did going offline today impact your mood or focus?";

  const [draft, setDraft] = useState("");

  function handleSave() {
    alert("Entry saved! (Demo)");
    setDraft("");
  }

  return (
    <section style={{ marginTop: 24, marginBottom: 34 }}>
      <h2 style={{ color: COLORS.primary, fontSize: "2.1rem", marginBottom: 3 }}>
        Reflection & Habit Journal
      </h2>
      <div style={{
        background: "#fffde7",
        color: "#AF9B27",
        padding: "13px 19px",
        borderRadius: 9,
        fontWeight: 500,
        marginBottom: 13,
        fontSize: 15,
        border: `1px solid ${COLORS.accent}44`
      }}>
        <span role="img" aria-label="ai" style={{ marginRight: 7 }}>🤖</span>
        AI Prompt: {aiPrompt}
      </div>
      <textarea
        rows={3}
        placeholder="Write your reflection..."
        value={draft}
        onChange={e => setDraft(e.target.value)}
        style={{
          width: "100%",
          borderRadius: 7,
          border: "1px solid #E5E5CD",
          fontSize: 15,
          padding: "10px 13px",
          resize: "vertical",
          marginBottom: 10,
          minHeight: 70,
          outlineColor: COLORS.primary
        }}
      />
      <div>
        <button
          onClick={handleSave}
          disabled={draft.length === 0}
          style={{
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            borderRadius: 5,
            padding: "9px 22px",
            fontWeight: 500,
            fontSize: 15,
            opacity: draft.length === 0 ? 0.55 : 1,
            cursor: draft.length === 0 ? "not-allowed" : "pointer"
          }}
        >
          Save Entry
        </button>
      </div>
      <div style={{
        marginTop: 25,
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: 500,
        marginBottom: 8
      }}>
        Previous Reflections
      </div>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: 0 }}>
        {entries.map((e) => (
          <li key={e.id} style={{
            padding: "13px 13px 9px",
            background: "#EFFBFC",
            borderRadius: 8,
            color: "#466464",
            marginBottom: 13
          }}>
            <div style={{ fontSize: 15, marginBottom: 4 }}>{e.text}</div>
            <div style={{ color: "#B4BAAD", fontSize: 12, marginTop: 0 }}>
              {e.date}
            </div>
          </li>
        ))}
      </ul>
      <div style={{
        marginTop: 13,
        color: "#8E9478",
        fontSize: 13
      }}>
        Journaling helps build lasting habits.
      </div>
    </section>
  );
}

export default App;
