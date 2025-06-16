import React, { useState, useRef, useEffect } from "react";

/**
 * Navigation/feature grouping (for dropdowns or sections)
 * - home: Home
 * - detox: Journey + Plan + Reallocation
 * - connect: Buddy + Circles + Family + Community (circles)
 * - rewards: Rewards + Check-In + Journal
 * - features: Budget + Games + Modes + Events + Integrations
 * 
 * @param {string} tab
 * @param {function} setTab
 * @param {object} COLORS
 */
const NAV_GROUPS = [
  {
    label: "My Detox",
    icon: "🧭",
    id: "detox",
    children: [
      { id: "journey", label: "Journey Map", icon: "🗺️" },
      { id: "plan", label: "Detox Plan", icon: "📝" },
      { id: "reallocation", label: "Reallocation", icon: "⏳" },
    ]
  },
  {
    label: "Connect",
    icon: "🤝",
    id: "connect",
    children: [
      { id: "buddy", label: "Buddy System", icon: "🤝" },
      { id: "circles", label: "Circles", icon: "👥" },
      { id: "family", label: "Family", icon: "👪" },
    ]
  },
  {
    label: "Rewards",
    icon: "🎁",
    id: "rewardsgrp",
    children: [
      { id: "rewards", label: "Rewards", icon: "🎁" },
      { id: "checkin", label: "Check-In", icon: "✅" },
      { id: "journal", label: "Journal", icon: "📖" },
    ]
  },
  {
    label: "Features",
    icon: "🛠️",
    id: "features",
    children: [
      { id: "budget", label: "Digital Budget", icon: "💸" },
      { id: "games", label: "Mini Games", icon: "🎮" },
      { id: "modes", label: "Modes", icon: "🔄" },
      { id: "events", label: "Events", icon: "📅" },
      { id: "integrations", label: "Integrations", icon: "🔌" },
    ]
  },
];

// Home has its own shortcut in navbar area.
const NAV_ROOTS = [
  { id: "home", label: "Home", icon: "🏠" },
];

/**
 * EnhancedNavigationBar component - Responsive, grouped, accessible navbar and collapsible sidebar.
 * Collapsible sidebar appears in mobile layouts and can be toggled.
 * Dropdowns for group navigation; keyboard accessible and ARIA aware.
 */
// PUBLIC_INTERFACE
function EnhancedNavigationBar({ tab, setTab, COLORS }) {
  // Control sidebar open/close for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Track which dropdown is open (only one at a time for keyboard nav)
  const [openDropdown, setOpenDropdown] = useState(null);

  // Auto-close dropdowns on outside click
  const navRef = useRef();

  useEffect(() => {
    function handleClick(evt) {
      if (navRef.current && !navRef.current.contains(evt.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Helper: Go to tab (and close)
  const handleNav = (id) => {
    setTab(id);
    setSidebarOpen(false);
    setOpenDropdown(null);
  };

  // ARIA label per tab
  const ariaLabel = (item) =>
    item.label + (item.icon ? ` (${item.icon})` : "");

  return (
    <>
      {/* Collapsible Hamburger for mobile */}
      <button
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        onClick={() => setSidebarOpen(v => !v)}
        style={{
          position: "fixed",
          left: 10,
          top: 11,
          background: "#F7F7F7",
          border: "none",
          borderRadius: 7,
          width: 35,
          height: 35,
          zIndex: 105,
          boxShadow: sidebarOpen ? "0 2px 8px #2e7d322c" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {/* Hamburger/close icon */}
        {sidebarOpen ? (
          <span style={{ fontSize: 21, color: COLORS.primary }}>✖️</span>
        ) : (
          <span style={{ fontSize: 23, color: COLORS.primary }}>
            &#9776;
            <span style={{ position: "absolute", left: "-9000px" }}>
              Navigation menu
            </span>
          </span>
        )}
      </button>
      {/* Overlay sidebar, mobile */}
      {sidebarOpen && (
        <nav
          aria-label="Sidebar"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            height: "100vh",
            width: 225,
            background: "#fff",
            color: COLORS.primary,
            borderRight: "1px solid #eee",
            zIndex: 110,
            padding: "20px 0 0 0",
            boxShadow: "2px 0 8px #2e7d3210",
            transition: "width 0.27s"
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 18, padding: "8px 22px 26px 22px", color: COLORS.primary }}>
            <span style={{ color: COLORS.accent, fontSize: 22, marginRight: 7 }}>💡</span>
            Digital Detox
          </div>
          {[...NAV_ROOTS, ...NAV_GROUPS.flatMap(g => g.children)].map((item) => (
            <button
              key={item.id}
              aria-label={ariaLabel(item)}
              className="sidebar-nav-btn"
              onClick={() => handleNav(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 20px",
                width: "100%",
                color: tab === item.id ? COLORS.primary : "#789262",
                background: tab === item.id ? COLORS.secondary : "none",
                fontWeight: tab === item.id ? 600 : 400,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                outline: "none",
                whiteSpace: "nowrap",
                borderLeft: tab === item.id ? `4px solid ${COLORS.accent}` : "4px solid transparent",
                minHeight: 44
              }}
              tabIndex={0}
            >
              <span style={{ fontSize: 17, minWidth: 18, marginRight: 11 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      )}
      {/* Main navbar with dropdown categories */}
      <nav
        className="navbar"
        ref={navRef}
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
          {/* Logo and title */}
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
            >💡</span>
            Digital Detox Companion
          </div>
          {/* Main, grouped navigation area */}
          <div
            style={{
              display: "flex",
              flex: 1,
              marginLeft: "auto",
              gap: 2,
              justifyContent: "flex-end",
              alignItems: "center",
              minWidth: 0,
            }}
          >
            {/* Single Home icon/tab */}
            <button
              className="tab-btn"
              aria-current={tab === "home" ? "page" : undefined}
              onClick={() => handleNav("home")}
              aria-label={ariaLabel(NAV_ROOTS[0])}
              style={{
                background: "none",
                border: "none",
                color: tab === "home" ? COLORS.primary : "#789262",
                borderBottom: tab === "home"
                  ? `3px solid ${COLORS.accent}`
                  : "3px solid transparent",
                fontSize: 15,
                fontWeight: tab === "home" ? 600 : 400,
                padding: "10px 7px 6px",
                margin: "0 2px",
                minWidth: 81,
                maxWidth: 125,
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
              tabIndex={0}
            >
              <span style={{ fontSize: 17, marginRight: 7, minWidth: 15 }}>
                {NAV_ROOTS[0].icon}
              </span>
              <span style={{ fontSize: 14, overflow: "hidden", textOverflow: "ellipsis" }}>
                {NAV_ROOTS[0].label}
              </span>
            </button>
            {/* Grouped dropdowns for navigation */}
            {NAV_GROUPS.map(group => (
              <NavDropdown
                key={group.id}
                group={group}
                activeTab={tab}
                onTabChange={handleNav}
                open={openDropdown === group.id}
                setOpen={(open) => setOpenDropdown(open ? group.id : null)}
                COLORS={COLORS}
              />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

/**
 * Dropdown menu for a group of navigation links.
 * Handles keyboard access, ARIA roles, and accessibility.
 */
function NavDropdown({ group, activeTab, onTabChange, open, setOpen, COLORS }) {
  // Keyboard nav support
  const btnRef = useRef();
  const listRef = useRef();

  // Open on Enter/ArrowDown; Close on Escape
  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      setOpen(true);
      setTimeout(() => {
        if (listRef.current) listRef.current.focus();
      }, 10);
      e.preventDefault();
    } else if (e.key === "ArrowUp" && open) {
      setOpen(false);
      btnRef.current?.focus();
      e.preventDefault();
    } else if (e.key === "Escape") {
      setOpen(false);
      btnRef.current?.focus();
      e.preventDefault();
    }
  }

  // Focus on first dropdown item if activated
  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.focus();
    }
  }, [open]);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        marginRight: 9,
      }}
    >
      <button
        ref={btnRef}
        className="tab-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={group.id + "-dropdown"}
        aria-label={group.label + " menu"}
        style={{
          background: "none",
          border: "none",
          color: group.children.some(item => activeTab === item.id)
            ? COLORS.primary
            : "#789262",
          borderBottom: group.children.some(item => activeTab === item.id)
            ? `3px solid ${COLORS.accent}`
            : "3px solid transparent",
          fontSize: 15,
          fontWeight: group.children.some(item => activeTab === item.id) ? 600 : 400,
          padding: "10px 7px 6px",
          margin: "0 2px",
          minWidth: 90,
          maxWidth: 168,
          textOverflow: "ellipsis",
          overflow: "hidden",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
        }}
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
      >
        {/* Group icon and label */}
        <span style={{ fontSize: 17, marginRight: 7, minWidth: 15 }}>{group.icon}</span>
        <span style={{ fontSize: 13.7, overflow: "hidden", textOverflow: "ellipsis" }}>
          {group.label}
        </span>
        <span style={{
          marginLeft: 4,
          fontSize: 11,
          color: "#ccc",
          userSelect: "none"
        }}>▼</span>
      </button>
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          id={group.id + "-dropdown"}
          aria-label={group.label + " navigation"}
          style={{
            position: "absolute",
            top: "103%",
            left: 0,
            minWidth: 161,
            background: "#fff",
            border: `1px solid ${COLORS.primary}18`,
            boxShadow: "0 2px 18px #bbb6",
            zIndex: 55,
            listStyle: "none",
            padding: 0,
            margin: 0,
            borderRadius: 8,
            overflow: "hidden"
          }}
        >
          {group.children.map((item) => (
            <li key={item.id}>
              <button
                className="dropdown-item"
                aria-selected={activeTab === item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 19px",
                  width: "100%",
                  color: activeTab === item.id ? COLORS.primary : "#2e7d327c",
                  background: activeTab === item.id ? COLORS.secondary : "#fff",
                  fontWeight: activeTab === item.id ? 600 : 400,
                  fontSize: 14,
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                  whiteSpace: "nowrap",
                  transition: "background 0.13s"
                }}
                onClick={() => {
                  onTabChange(item.id);
                  setOpen(false);
                }}
                tabIndex={0}
              >
                <span style={{ fontSize: 17, minWidth: 15 }}>{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EnhancedNavigationBar;
