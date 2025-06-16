import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * Detox strategy options as objects for clarity and UI rendering.
 */
const DETOX_MODES = [
  {
    key: "gradual-decline",
    label: "Gradual Decline",
    emoji: "📉",
    description:
      "Slowly reduces your allowed daily time each week to help you sustainably break free from habits. Enables easing into digital-free routines.",
    configComponent: GradualDeclineConfig,
  },
  {
    key: "weekend-retreat",
    label: "Weekend Retreat",
    emoji: "🏕️",
    description:
      "Total detox for chosen hours or days on weekends. Go completely offline during your selected times and rediscover the real world.",
    configComponent: WeekendRetreatConfig,
  },
  {
    key: "focus-burst",
    label: "Focus Burst",
    emoji: "⏱️",
    description:
      "Commit to a distraction-free block (e.g., 3–4 hours) each day. Useful for study, work, or creative periods.",
    configComponent: FocusBurstConfig,
  },
];

/**
 * Key used for storing mode/settings in localStorage.
 */
const STORAGE_KEY = "detoxModeSettings";

/**
 * Loads mode settings from localStorage.
 */
function loadSettings() {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : {};
  } catch {
    return {};
  }
}

/**
 * Persists mode settings to localStorage.
 */
function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Fail silently
  }
}

/**
 * DetoxModes main export: holds selector, description, and configuration for modes.
 */
// PUBLIC_INTERFACE
function DetoxModes() {
  // On load, retrieve user's previously selected mode/settings.
  const [settings, setSettings] = useState(() => loadSettings());
  const [selectedKey, setSelectedKey] = useState(
    () =>
      settings.selectedKey ||
      DETOX_MODES[0].key // default to Gradual Decline
  );

  useEffect(() => {
    setSettings((prev) => {
      // Ensure settings record for the current mode exists
      if (!prev[selectedKey]) {
        return { ...prev, [selectedKey]: defaultConfig(selectedKey) };
      }
      return prev;
    });
  }, [selectedKey]);

  useEffect(() => {
    saveSettings({ ...settings, selectedKey });
  }, [settings, selectedKey]);

  // Handle mode selection from user
  const handleModeChange = (key) => {
    setSelectedKey(key);
  };

  // Handle config change from config component
  const handleConfigChange = (config) => {
    setSettings((prev) => ({ ...prev, [selectedKey]: config }));
  };

  const activeMode = DETOX_MODES.find((m) => m.key === selectedKey);
  const ModeConfigComponent = activeMode?.configComponent || null;
  const modeConfig = settings[selectedKey] || defaultConfig(selectedKey);

  return (
    <div className="detox-modes-main" style={{ padding: "32px 0" }}>
      <h2
        style={{
          color: "var(--primary, #2E7D32)",
          fontWeight: 700,
          fontSize: "1.55rem",
          marginBottom: 20,
        }}
      >
        Flexible Detox Modes
      </h2>
      <p style={{ color: "#5f705b", fontSize: 17, marginBottom: 20 }}>
        Select a digital detox strategy that best fits your lifestyle. Each mode can be customized.
      </p>
      <DetoxModeSelector
        modes={DETOX_MODES}
        selectedKey={selectedKey}
        onChange={handleModeChange}
      />
      <div
        style={{
          border: "1px solid #e9eded",
          borderRadius: 10,
          margin: "28px 0",
          background: "#f8faf9",
          padding: 24,
        }}
      >
        <h3 style={{ fontSize: "1.22rem", fontWeight: 600 }}>
          {activeMode.emoji} {activeMode.label}
        </h3>
        <p style={{ color: "#355c3a", fontSize: 16, margin: "8px 0 14px" }}>
          {activeMode.description}
        </p>
        {ModeConfigComponent && (
          <ModeConfigComponent config={modeConfig} onChange={handleConfigChange} />
        )}
      </div>
      <div style={{ marginTop: 16, color: "#948", fontSize: 14 }}>
        <b>Tip:</b> Your detox mode is saved automatically. Adjust settings anytime to match your goals!
      </div>
    </div>
  );
}

/**
 * DetoxModeSelector: radio-style card selector UI for modes.
 */
function DetoxModeSelector({ modes, selectedKey, onChange }) {
  return (
    <div
      className="detox-mode-selector"
      style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        marginBottom: 4,
        marginLeft: 2,
      }}
    >
      {modes.map((mode) => (
        <button
          key={mode.key}
          className="mode-card"
          aria-pressed={selectedKey === mode.key}
          onClick={() => onChange(mode.key)}
          style={{
            border: selectedKey === mode.key
              ? "2px solid var(--primary, #2E7D32)"
              : "1px solid #c7dec2",
            background: selectedKey === mode.key ? "#e5fadd" : "#fff",
            borderRadius: 13,
            padding: "16px 20px",
            minWidth: 148,
            cursor: "pointer",
            fontWeight: selectedKey === mode.key ? 700 : 500,
            color: "#24562b",
            fontSize: 16,
            boxShadow: selectedKey === mode.key
              ? "0 3px 8px rgba(44,127,67,0.08)"
              : "0 1px 4px rgba(44,127,67,0.03)",
            outline: selectedKey === mode.key ? "3px solid #ffd60040" : "none",
            transition: "box-shadow .19s, border .19s, background .15s"
          }}
        >
          <span style={{ fontSize: 25, marginRight: 10 }}>{mode.emoji}</span>
          {mode.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Default config/state used for each mode.
 */
function defaultConfig(key) {
  switch (key) {
    case "gradual-decline":
      return { startMinutes: 120, endMinutes: 45, weeks: 4 }; // by default, 120→45 min in 4 weeks
    case "weekend-retreat":
      return {
        days: ["Saturday", "Sunday"],
        start: "10:00",
        end: "18:00",
      };
    case "focus-burst":
      return { blockStart: "17:00", blockEnd: "20:00", enabled: true };
    default:
      return {};
  }
}

/**
 * GRADUAL DECLINE CONFIG UI
 */
function GradualDeclineConfig({ config, onChange }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ marginTop: 16, marginBottom: 4 }}
    >
      <label style={{ display: "block", color: "#376146" }}>
        Start Daily Limit:
        <input
          type="number"
          min={15}
          max={480}
          value={config.startMinutes}
          onChange={(e) =>
            onChange({ ...config, startMinutes: parseInt(e.target.value, 10) })
          }
          style={{
            margin: "0 9px 0 12px",
            width: 70,
            padding: "2px 6px",
            borderRadius: 5,
            border: "1px solid #aacdae"
          }}
        />
        minutes/day
      </label>
      <label style={{ display: "block", color: "#376146", marginTop: 10 }}>
        End Goal Limit:
        <input
          type="number"
          min={10}
          max={240}
          value={config.endMinutes}
          onChange={(e) =>
            onChange({ ...config, endMinutes: parseInt(e.target.value, 10) })
          }
          style={{
            margin: "0 9px 0 12px",
            width: 70,
            padding: "2px 6px",
            borderRadius: 5,
            border: "1px solid #aacdae"
          }}
        />
        minutes/day
      </label>
      <label style={{ display: "block", color: "#376146", marginTop: 10 }}>
        Reduction Period:
        <input
          type="number"
          min={2}
          max={12}
          value={config.weeks}
          onChange={(e) =>
            onChange({ ...config, weeks: parseInt(e.target.value, 10) })
          }
          style={{
            margin: "0 9px 0 12px",
            width: 50,
            padding: "2px 6px",
            borderRadius: 5,
            border: "1px solid #aacdae"
          }}
        />
        weeks
      </label>
    </form>
  );
}

/**
 * WEEKEND RETREAT CONFIG UI
 */
function WeekendRetreatConfig({ config, onChange }) {
  const ALL_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const toggleDay = (day) => {
    const next =
      config.days.includes(day)
        ? config.days.filter((d) => d !== day)
        : [...config.days, day];
    onChange({ ...config, days: next });
  };
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ marginBottom: 8, color: "#376146" }}>
        <b>Retreat Days:</b>
        <div style={{ display: "flex", gap: 5, margin: "8px 0" }}>
          {ALL_DAYS.map((day) => (
            <label
              key={day}
              style={{
                background: config.days.includes(day)
                  ? "var(--primary, #2E7D32)"
                  : "rgba(160,220,167,0.21)",
                color: config.days.includes(day) ? "#fff" : "#23552b",
                borderRadius: 7,
                padding: "3px 10px",
                fontWeight: config.days.includes(day) ? 600 : 500,
                fontSize: 15,
                cursor: "pointer"
              }}
            >
              <input
                type="checkbox"
                checked={config.days.includes(day)}
                onChange={() => toggleDay(day)}
                style={{ marginRight: 6 }}
              />
              {day.slice(0, 3)}
            </label>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 18, color: "#376146" }}>
        <label>
          Start Time:
          <input
            type="time"
            value={config.start}
            onChange={(e) => onChange({ ...config, start: e.target.value })}
            style={{
              margin: "0 8px 0 10px",
              border: "1px solid #aacdae",
              borderRadius: 5,
              padding: "2px 7px"
            }}
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={config.end}
            onChange={(e) => onChange({ ...config, end: e.target.value })}
            style={{
              margin: "0 8px 0 10px",
              border: "1px solid #aacdae",
              borderRadius: 5,
              padding: "2px 7px"
            }}
          />
        </label>
      </div>
    </div>
  );
}

/**
 * FOCUS BURST CONFIG UI
 */
function FocusBurstConfig({ config, onChange }) {
  return (
    <div style={{ marginTop: 16 }}>
      <label style={{ color: "#376146", display: "block" }}>
        <input
          type="checkbox"
          checked={config.enabled}
          onChange={(e) => onChange({ ...config, enabled: e.target.checked })}
          style={{ marginRight: 9, accentColor: "#2E7D32" }}
        />
        Enable Focus Burst block each day
      </label>
      <div style={{ marginLeft: 20, marginTop: 8, display: config.enabled ? "block" : "none" }}>
        <span style={{ fontSize: 15 }}>Detox Time: </span>
        <input
          type="time"
          value={config.blockStart}
          onChange={(e) => onChange({ ...config, blockStart: e.target.value })}
          style={{
            margin: "0 6px 0 9px",
            border: "1px solid #aacdae",
            borderRadius: 5,
            padding: "2px 7px"
          }}
        />
        to
        <input
          type="time"
          value={config.blockEnd}
          onChange={(e) => onChange({ ...config, blockEnd: e.target.value })}
          style={{
            margin: "0 8px 0 13px",
            border: "1px solid #aacdae",
            borderRadius: 5,
            padding: "2px 7px"
          }}
        />
        hours
      </div>
    </div>
  );
}

export default DetoxModes;
