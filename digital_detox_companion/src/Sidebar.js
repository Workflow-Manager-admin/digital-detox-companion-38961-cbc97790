import React from "react";

/**
 * Sidebar component - navigation for main features.
 * Expanded to include new screens for Features 3–10.
 */
// PUBLIC_INTERFACE
export default function Sidebar({
  activeTab,
  onTabChange,
  accentColor = "#FFD600",
  primaryColor = "#2E7D32"
}) {
  // Modular groupings; ensures scalability and maintainability if more features are added.
  // Only show a subset in sidebar; only one navigation surface per feature!
  // Sidebar = Core navigation, essential journeys. (No Rewards, Check-in, Journal, Journey Map, Integrations—those go to top navbar/tabs only.)
  const navGroups = [
    {
      title: "Plan & Progress",
      tabs: [
        { id: "plan", label: "Detox Plan", icon: "🗺️" },
        { id: "buddy", label: "Buddy", icon: "🤝" },
        { id: "reallocation", label: "Time Gained", icon: "⏳" },
        { id: "modes", label: "Detox Modes", icon: "🔄" }
      ]
    },
    {
      title: "Explore",
      tabs: [
        { id: "events", label: "Offline Events", icon: "🎟️" },
        { id: "games", label: "Mini Games", icon: "🎮" },
        { id: "family", label: "Parent Teen", icon: "👨‍👩‍👧" },
        { id: "budget", label: "Digital Budget", icon: "💡" },
        { id: "circles", label: "Circles", icon: "🫂" }
      ]
    }
    // No "More" group here; all secondary/auxiliary features will be accessible from the top navigation bar only.
  ];

  return (
    <aside
      className="sidebar"
      style={{
        background: "#F4FFFA",
        color: "#283E29",
        minWidth: 94,
        width: 94,
        maxWidth: 94,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 18,
        borderRight: "1px solid #E3F0EA",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "18px 0 0",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <div
        className="sidebar-logo"
        style={{
          fontWeight: 700,
          color: accentColor,
          fontSize: 29,
          marginBottom: 18,
        }}
      >
        💡
      </div>
      <nav style={{ width: "100%" }}>
        {navGroups.map((group, idx) => (
          <section key={group.title + idx} style={{ marginBottom: 6 }}>
            {group.title && (
              <div
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "#B9CEB5",
                  margin: "10px 0 7px 18px",
                  letterSpacing: "0.07em"
                }}
              >{group.title}</div>
            )}
            {group.tabs.map((tab) => (
              <SideTab
                key={tab.id}
                label={tab.label}
                icon={tab.icon}
                active={activeTab === tab.id}
                onClick={() => onTabChange(tab.id)}
                accentColor={accentColor}
                primaryColor={primaryColor}
              />
            ))}
          </section>
        ))}
      </nav>
    </aside>
  );
}

// PUBLIC_INTERFACE
function SideTab({ label, icon, active, onClick, accentColor, primaryColor }) {
  return (
    <button
      aria-current={active ? "page" : undefined}
      className="sidebar-tab-btn"
      style={{
        width: "100%",
        background: "none",
        border: "none",
        outline: "none",
        color: active ? primaryColor : "#789262",
        borderLeft: active
          ? `5px solid ${accentColor}`
          : "5px solid transparent",
        fontSize: 15,
        fontWeight: active ? 600 : 400,
        padding: "11px 0 10px 3px",
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        cursor: "pointer",
        transition: "border-left 0.18s"
      }}
      onClick={onClick}
      tabIndex={0}
    >
      <span style={{ fontSize: 19, marginRight: 7, minWidth: 18 }}>{icon}</span>
      <span
        style={{
          fontSize: 13.5,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontWeight: active ? 600 : 400
        }}
      >
        {label}
      </span>
    </button>
  );
}
