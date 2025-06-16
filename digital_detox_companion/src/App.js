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
import HomePage from "./HomePage";
import Toast from "./Toast";
import Sidebar from "./Sidebar";
import OnboardingSlides from "./OnboardingSlides";
import { rewardsList } from "./rewardsData";
import EmergencyBypassModal from "./EmergencyBypassModal"; // NEW


// Dynamic/fallback page assignments to avoid runtime/render errors for missing modules
let DetoxPlanPage = (props) => <div>DetoxPlanPage is missing.</div>;
let BuddySystemPage = (props) => <div>BuddySystemPage is missing.</div>;
let RewardsPage = (props) => <div>RewardsPage is missing.</div>;
let CheckInPage = (props) => <div>CheckInPage is missing.</div>;
let JournalPage = (props) => <div>JournalPage is missing.</div>;
try {
  DetoxPlanPage = require("./DetoxPlanPage").default || DetoxPlanPage;
} catch {}
try {
  BuddySystemPage = require("./BuddySystemPage").default || BuddySystemPage;
} catch {}
try {
  RewardsPage = require("./RewardsPage").default || RewardsPage;
} catch {}
try {
  CheckInPage = require("./CheckInPage").default || CheckInPage;
} catch {}
try {
  JournalPage = require("./JournalPage").default || JournalPage;
} catch {}

/* 
 * NOTE: All feedback and responses are implemented inline or with toasts only;
 * All pop-ups, alerts, window.alert, confirm, overlays, and modal feedback removed per requirements.
 */
// Color variables (from requirements)
const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  bg: "#fff",
  text: "#1A1A1A",
};

/**
 * Minimal inline styles for theme and layout
 */
const minimalTheme = {
  "--primary": COLORS.primary,
  "--secondary": COLORS.secondary,
  "--accent": COLORS.accent,
  "--bg": COLORS.bg,
  "--text": COLORS.text
};

/**
 * App root component - main site shell
 */
// PUBLIC_INTERFACE
function App() {
  // Now defaults to "home" tab on first load
  const [tab, setTab] = useState("home");
  // Toast management for visible non-modal feedback
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "info",
  });
  // Onboarding overlay visibility (show onboarding if "onboarded" !== "yes" in localStorage)
  const [onboardingDone, setOnboardingDone] = useState(() => {
    try {
      return localStorage.getItem("onboarded") === "yes";
    } catch {
      return false;
    }
  });

  // Handles completion of onboarding: update state AND localStorage for permanent skip
  const handleOnboardingComplete = () => {
    try {
      localStorage.setItem("onboarded", "yes");
    } catch {
      /* Ignore storage errors gracefully */
    }
    setOnboardingDone(true);
  };

  // Toast helper
  const showToast = (msg, type = "info") => {
    setToast({ open: true, message: msg, type });
    setTimeout(() => setToast((prev) =>
      ({ ...prev, open: false })), 3300);
  };

  // Demo/Prototype: Emergency Modal logic (replace with actual blocked app trigger)
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [bypassAppName, setBypassAppName] = useState("Instagram");

  // Handler to simulate a blocked app access (for demonstration)
  const handleBlockedAppDemo = () => {
    setBypassAppName("Instagram");
    setShowEmergencyModal(true);
  };

  // Seven main features for Digital Detox Companion (for nav):
  // (same as before)

  // Renders the currently active page/component
  function renderPage() {
    // Example: button to trigger modal (REPLACE this demo in production)
    // In a real integration, this modal trigger would be connected to the logic that detects a blocked app is being accessed.
    return (
      <div>
        {tab === "home" && (
          <button
            style={{
              margin: "18px 0 32px", padding: "12px 22px", fontSize: 15,
              color: "#fff", background: "#E87A41", border: "none", borderRadius: 8,
              cursor: "pointer", fontWeight: 500
            }}
            onClick={handleBlockedAppDemo}
            aria-label="Try blocked app modal"
          >
            Try opening a blocked app (demo)
          </button>
        )}
        <div>
          {/* Existing main page switch */}
          {(() => {
            switch (tab) {
              case "home":
                return <HomePage />;
              case "journey":
                return <DetoxJourneyMap />;
              case "plan":
                return <DetoxPlanPage showToast={showToast} />;
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
                return <BuddySystemPage showToast={showToast} />;
              case "rewards":
                return <RewardsPage />;
              case "checkin":
                return <CheckInPage showToast={showToast} />;
              case "journal":
                return <JournalPage showToast={showToast} />;
              default:
                return <HomePage />;
            }
          })()}
        </div>
      </div>
    );
  }


  // If onboarding is not complete, show only the onboarding slides until finished
  if (!onboardingDone) {
    return (
      <div
        className="app"
        style={{
          background: minimalTheme["--bg"],
          color: minimalTheme["--text"],
          minHeight: "100vh",
          fontFamily: "Inter, Roboto, Arial, sans-serif",
          boxSizing: "border-box",
        }}
      >
        <OnboardingSlides onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  // Otherwise, show the main app
  return (
    <div
      className="app"
      style={{
        background: minimalTheme["--bg"],
        color: minimalTheme["--text"],
        minHeight: "100vh",
        fontFamily: "Inter, Roboto, Arial, sans-serif",
        paddingLeft: 94, // Reserve sidebar width
        boxSizing: "border-box",
      }}
    >
      {/* Persistent global sidebar on left */}
      <Sidebar
        activeTab={tab}
        onTabChange={setTab}
        accentColor={COLORS.accent}
        primaryColor={COLORS.primary}
      />

      {/* Navbar (now without Detox Plan, Parent Teen, Events, Rewards, Check-In) */}
      <nav
        className="navbar"
        style={{
          background: "#fff",
          borderBottom: "1px solid #eee",
          color: COLORS.primary,
          padding: 0,
          boxShadow: "0 2px 6px rgba(44,127,67,0.03)",
          zIndex: 20,
          width: "100%",
          left: 0,
          display: "flex",
          justifyContent: "center",
          position: "sticky",
          top: 0,
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: 950,
            width: "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            minHeight: 60,
            position: "relative"
          }}
        >
          <div
            className="logo"
            style={{
              fontWeight: 600,
              color: COLORS.primary,
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              minWidth: 220,
              justifyContent: "flex-start",
              letterSpacing: "0.01em",
              flexShrink: 0,
              paddingRight: 12,
            }}
          >
            <span
              className="logo-symbol"
              style={{
                color: COLORS.accent,
                fontWeight: 700,
                fontSize: 24,
                verticalAlign: "middle",
                marginRight: 10,
              }}
            >
              💡
            </span>
            Digital Detox Companion
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              overflowX: "auto",
              marginLeft: "auto",
              gap: 2,
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0 0 0 4px",
              scrollbarWidth: "thin",
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none"
            }}
          >
            <div
              className="navtab-scroll"
              style={{
                display: "flex",
                gap: 2,
                flexWrap: "nowrap",
                minWidth: 0,
                width: "100%",
                overflowX: "auto"
              }}
            >
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

      {/* Modal overlay for Emergency Bypass (block trigger) */}
      <EmergencyBypassModal
        open={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        appName={bypassAppName}
      />

      {/* Main: extra left margin to avoid sidebar overlap, remove excess top margin */}
      <main style={{ marginTop: 64, marginLeft: 0 }}>
        {/* Toast at App root for cross-page notifications */}
        <Toast
          message={toast.message}
          visible={toast.open}
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          type={toast.type}
        />
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
          letterSpacing: 0.1,
          marginLeft: 0,
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
        fontSize: 15,
        fontWeight: active ? 600 : 400,
        padding: "10px 7px 6px",
        margin: "0 2px",
        minWidth: 80,
        maxWidth: 124,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        outline: "none",
        position: "relative",
        transition: "border-bottom 0.22s"
      }}
      onClick={onClick}
      tabIndex={0}
    >
      <span style={{ fontSize: 17, marginRight: 6, minWidth: 15 }}>{icon}</span>
      <span style={{ fontSize: 14, overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
    </button>
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

export default App;
