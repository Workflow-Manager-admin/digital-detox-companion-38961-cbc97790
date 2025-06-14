import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import HomePage from "./HomePage";

import BuddySystemPage from "./BuddySystemPage";
import RewardsPage from "./RewardsPage";
import CheckInPage from "./CheckInPage";

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

import { useNavigate, useLocation } from "react-router-dom";

// PUBLIC_INTERFACE
function App() {
  // For "tab" active state, use URL path to determine the tab.
  const navTabs = [
    {
      id: "home",
      label: "Home",
      icon: "🏡",
      path: "/"
    },
    {
      id: "journey",
      label: "Journey Map",
      icon: "🛤️",
      path: "/journey"
    },
    {
      id: "plan",
      label: "Detox Plan",
      icon: "🗓️",
      path: "/plan"
    },
    {
      id: "budget",
      label: "Budget Mode",
      icon: "🎛️",
      path: "/budget"
    },
    {
      id: "games",
      label: "Mini Games",
      icon: "🕹️",
      path: "/games"
    },
    {
      id: "modes",
      label: "Detox Modes",
      icon: "🎯",
      path: "/modes"
    },
    {
      id: "events",
      label: "Events",
      icon: "🗺️",
      path: "/events"
    },
    {
      id: "reallocation",
      label: "Reallocation",
      icon: "⏳",
      path: "/reallocation"
    },
    {
      id: "journal",
      label: "Journal",
      icon: "📖",
      path: "/journal"
    }
  ];

  // Use hooks inside the Router tree, so inner abstraction:
  const AppInner = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
                    active={
                      t.path === "/"
                        ? location.pathname === "/"
                        : location.pathname.startsWith(t.path)
                    }
                    onClick={() => navigate(t.path)}
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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/buddy-system" element={<BuddySystemPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/checkin" element={<CheckInPage />} />
              <Route path="/journey" element={<DetoxJourneyMap />} />
              <Route path="/plan" element={<DetoxPlanPage />} />
              <Route path="/budget" element={<DigitalBudgetMode />} />
              <Route path="/games" element={<MiniDetoxGames />} />
              <Route path="/modes" element={<DetoxModes />} />
              <Route path="/events" element={<OfflineEventGenerator />} />
              <Route path="/reallocation" element={<TimeReallocationTracker />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
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
  };

  return (
    <Router>
      <AppInner />
    </Router>
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
