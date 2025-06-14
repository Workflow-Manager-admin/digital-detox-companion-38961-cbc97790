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
import Dashboard from "./Dashboard"; // New Dashboard import
import Toast from "./Toast";
import Sidebar from "./Sidebar";
import OnboardingSlides from "./OnboardingSlides";
import { rewardsList } from "./rewardsData";

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
  "--text": COLORS.text,
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
    setTimeout(
      () =>
        setToast((prev) => ({
          ...prev,
          open: false,
        })),
      3300
    );
  };

  // === Digital Detox Companion feature navigation: all 12 features represented ===
  // Primary nav tabs:
  const navPrimaryTabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "plan", label: "Current Plan", icon: "🗺️" },
    { id: "buddy", label: "Buddy System", icon: "🤝" },
    { id: "rewards", label: "Rewards", icon: "🎁" },
    { id: "journal", label: "Journal", icon: "📖" },
  ];
  // Secondary tabs (move to 'More' dropdown/collapsible menu):
  const navSecondaryGroups = [
    {
      label: "Modes",
      icon: "🛡️",
      items: [
        { id: "modes", label: "Detox Modes", icon: "🛡️" },
        { id: "budget", label: "Budget Mode", icon: "💰" },
        { id: "family", label: "Family/Teen", icon: "👨‍👩‍👧" },
      ],
    },
    {
      label: "Activities",
      icon: "🎮",
      items: [
        { id: "games", label: "Mini Games", icon: "🎮" },
        { id: "events", label: "Offline Events", icon: "🌲" },
      ],
    },
    {
      label: "Community",
      icon: "🫂",
      items: [
        { id: "circles", label: "Community", icon: "🫂" },
        { id: "reallocation", label: "Time Reallocation", icon: "⏳" },
        { id: "journey", label: "Journey", icon: "🛤️" },
      ],
    },
  ];

  // Renders the currently active page/component
  function renderPage() {
    switch (tab) {
      case "home":
        return <Dashboard />;
      case "plan":
        return <DetoxPlanPage showToast={showToast} />;
      case "buddy":
        return <BuddySystemPage showToast={showToast} />;
      case "rewards":
        return <RewardsPage />;
      case "checkin":
        return <CheckInPage showToast={showToast} />;
      case "journal":
        return <JournalPage showToast={showToast} />;
      case "journey":
        return <DetoxJourneyMap />;
      case "circles":
        return <CommunityCircles />;
      case "reallocation":
        return <TimeReallocationTracker />;
      case "modes":
        return <DetoxModes />;
      case "events":
        return <OfflineEventGenerator />;
      case "games":
        return <MiniDetoxGames />;
      case "family":
        return <ParentTeenMode />;
      case "budget":
        return <DigitalBudgetMode />;
      // If feature unimplemented: show stub.
      // (Future-proofing: better than blank)
      case "integrations":
        return (
          <div style={{ padding: 48, textAlign: "center", opacity: 0.75 }}>
            <h2>Integrations Hub (Coming Soon)</h2>
            <p>Third-party integrations for health, fitness, and productivity platforms will appear here.</p>
          </div>
        );
      default:
        return (
          <div style={{ padding: 48, textAlign: "center", opacity: 0.75 }}>
            <h2>Feature Not Implemented</h2>
            <p>This section is a placeholder for an upcoming feature.</p>
          </div>
        );
    }
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

      {/* NAV BAR: Primary tabs + "More" dropdown for secondary features */}
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
            position: "relative",
          }}
        >
          {/* Logo */}
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
          {/* Main navigation bar: Primary tabs + overflow dropdown */}
          <div
            style={{
              display: "flex",
              flex: 1,
              marginLeft: "auto",
              gap: 4,
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "0 0 0 4px",
            }}
          >
            <div
              className="navtab-bar"
              style={{
                display: "flex",
                gap: 2,
                flexWrap: "nowrap",
                minWidth: 0,
                width: "100%",
                alignItems: "center",
              }}
            >
              {/* Primary features as top-level tabs */}
              {navPrimaryTabs.map((t) => (
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
              {/* Overflow menu ("More" dropdown) for secondary features */}
              <NavOverflowMenu
                groups={navSecondaryGroups}
                onSelectTab={setTab}
                activeTab={tab}
                accentColor={COLORS.accent}
                primaryColor={COLORS.primary}
              />
            </div>
          </div>
        </div>
      </nav>

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

/**
 * OVERFLOW MENU/DROPDOWN FOR SECONDARY FEATURES
 * Always uses a dropdown overlay, no scroll bar in nav, accessible, can show on click or hover, and fully overlays any content below.
 */
// PUBLIC_INTERFACE
function NavOverflowMenu({ groups, onSelectTab, activeTab, accentColor, primaryColor }) {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(""); // for group expansion mobile only
  const [isHovering, setIsHovering] = React.useState(false);

  // Always close dropdown if clicking outside
  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (!e.target.closest(".nav-overflow-menu, .nav-overflow-dropdown")) {
        setOpen(false);
        setExpanded("");
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [open]);

  // Responsive check (mobile: width < 680px)
  const isMobile = window.innerWidth < 680;

  // Menu open/close behavior – open on click (mobile/desktop), also on hover (non-touch screens)
  const openDropdown = () => setOpen(true);
  const closeDropdown = () => {
    setOpen(false);
    setExpanded("");
    setIsHovering(false);
  };

  return (
    <div
      className="nav-overflow-menu"
      style={{
        position: "relative",
        minWidth: isMobile ? 54 : 110,
        marginLeft: 3,
        zIndex: 100,
      }}
      tabIndex={0}
      onMouseEnter={() => { if (!isMobile) { setIsHovering(true); setOpen(true); } }}
      onMouseLeave={() => { if (!isMobile) { setIsHovering(false); setOpen(false); setExpanded(""); } }}
      aria-haspopup="true"
    >
      <button
        className="tab-btn"
        style={{
          background: "none",
          border: "none",
          color: "#789262",
          borderBottom: open ? `3px solid ${accentColor}` : "3px solid transparent",
          fontSize: 15,
          fontWeight: open ? 600 : 400,
          padding: "10px 10px 6px 9px",
          margin: "0 2px",
          minWidth: isMobile ? 44 : 90,
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          outline: "none",
          position: "relative",
          transition: "border-bottom 0.22s",
          borderRadius: 7,
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="More features"
        onClick={() => setOpen((v) => !v)}
        onBlur={(e) => {
          // Only close if the newly focused element is outside menu dropdown.
          if (!e.relatedTarget?.closest(".nav-overflow-dropdown")) closeDropdown();
        }}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === "Escape") closeDropdown();
        }}
      >
        <span style={{ fontSize: 19, marginRight: isMobile ? 2 : 6 }}>☰</span>
        <span style={{
          fontSize: 13,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: isMobile ? "none" : "inline"
        }}>
          More
        </span>
      </button>
      {/* Dropdown content */}
      {open && (
        <div
          className="nav-overflow-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            minWidth: isMobile ? 171 : 240,
            background: "#fff",
            border: "1px solid #dedede",
            borderRadius: 10,
            boxShadow: "0 6px 24px rgba(40,70,40,0.13)",
            padding: isMobile ? 5 : 9,
            marginTop: 2,
            zIndex: 9999,
            fontSize: 15,
            minHeight: 44,
            pointerEvents: "auto"
          }}
          tabIndex={0}
        >
          {groups.map((group) => (
            <div key={group.label} style={{ marginBottom: 2, width: "100%" }}>
              <button
                type="button"
                onClick={() =>
                  isMobile
                    ? setExpanded(expanded === group.label ? "" : group.label)
                    : undefined
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                  color: "#20542d",
                  width: "100%",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  fontSize: 15.5,
                  padding: "6px 4px 3px 0",
                  cursor: "pointer",
                  borderRadius: 6,
                  outline: "none",
                  marginBottom: 1,
                  transition: "background 0.15s"
                }}
                tabIndex={0}
                aria-expanded={isMobile ? expanded === group.label : true}
                aria-controls={group.label + "-submenu"}
                onFocus={() => { if (!isMobile) setExpanded(group.label); }}
                onMouseEnter={() => { if (!isMobile) setExpanded(group.label); }}
              >
                <span style={{ fontSize: 17, marginRight: 7 }}>{group.icon}</span>
                {group.label}
                {isMobile && (
                  <span style={{ marginLeft: 5, fontSize: 16 }}>
                    {expanded === group.label ? "▲" : "▼"}
                  </span>
                )}
              </button>
              {/* Grouped links: show as vertical list. On desktop always visible, on mobile only if expanded */}
              <div
                id={group.label + "-submenu"}
                className="overflow-submenu"
                style={{
                  display:
                    !isMobile || expanded === group.label ? "block" : "none",
                  marginLeft: isMobile ? 5 : 13,
                  marginTop: 2,
                  marginBottom: 2,
                  width: "100%"
                }}
              >
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      closeDropdown();
                    }}
                    className="tab-btn"
                    style={{
                      background: "none",
                      border: "none",
                      color: activeTab === item.id ? primaryColor : "#647950",
                      borderBottom: activeTab === item.id ? `2.5px solid ${accentColor}` : "2.5px solid transparent",
                      fontWeight: activeTab === item.id ? 600 : 400,
                      fontSize: 14.3,
                      padding: "7px 5px 4px 2px",
                      margin: 0,
                      minWidth: 70,
                      maxWidth: 162,
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 5,
                      transition: "border-bottom 0.18s, background 0.18s"
                    }}
                    aria-current={activeTab === item.id ? "page" : undefined}
                    tabIndex={0}
                  >
                    <span style={{ fontSize: 16, marginRight: 8 }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
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
