import React, { useState } from "react";

/**
 * TimeReallocationTracker
 * Modular tracker for logging offline activities and visualizing weekly "What You Gained" reports.
 * - Users log time spent on various offline activities (reading, walking, social).
 * - Recent logs and a weekly summary chart (pure-React, no charts lib).
 * - "What You Gained" summary interprets hours reclaimed, offers motivational text.
 * 
 * PUBLIC_INTERFACE
 */
export default function TimeReallocationTracker() {
  // Demo, no backend: keep logs in local state, one week of demo data
  const initialLogs = [
    { id: 1, date: getDateNDaysAgo(0), activity: "Read in the park", duration: 1.0, category: "Learning" },
    { id: 2, date: getDateNDaysAgo(1), activity: "Nature walk", duration: 0.8, category: "Health" },
    { id: 3, date: getDateNDaysAgo(2), activity: "Cooked meal", duration: 1.2, category: "Wellness" },
    { id: 4, date: getDateNDaysAgo(3), activity: "Visited museum", duration: 2.0, category: "Social" }
  ];
  const [logs, setLogs] = useState(initialLogs);
  const [draft, setDraft] = useState({ activity: "", duration: "", category: "Learning" });

  // Handle log submission
  function handleAddLog(e) {
    e.preventDefault();
    if (!draft.activity || !draft.duration) return;
    setLogs([
      { 
        id: Date.now(), 
        date: getDateNDaysAgo(0), 
        activity: draft.activity, 
        duration: parseFloat(draft.duration), 
        category: draft.category
      },
      ...logs
    ]);
    setDraft({ activity: "", duration: "", category: "Learning" });
  }

  // Prepare weekly breakdown: aggregate time per day and per category
  const daysOfWeek = getPast7Days();
  const logsThisWeek = logs.filter(x => daysOfWeek.includes(x.date));
  const totalTime = logsThisWeek.reduce((sum, l) => sum + l.duration, 0);

  // Per day bar: sum each day's duration
  const dailyTotals = daysOfWeek.map(day =>
    logs
      .filter((log) => log.date === day)
      .reduce((sum, log) => sum + log.duration, 0)
  );
  // Per category
  const categoryTotals = {};
  logsThisWeek.forEach(l => {
    categoryTotals[l.category] = (categoryTotals[l.category] || 0) + l.duration;
  });

  // Motivational text based on new time
  const motivationalText = getMotivationalText(totalTime);

  // CSS colors (branded vars)
  const COLORS = {
    primary: "var(--primary, #2E7D32)",
    accent: "var(--accent, #FFD600)",
    secondary: "var(--secondary, #B2DFDB)"
  };
  const chartColors = ["#FFB300", "#66BB6A", "#4FC3F7", "#BA68C8", "#ab9696", "#FFD700", "#43A047"];

  return (
    <section style={{ marginTop: 28, marginBottom: 16 }}>
      <h2 style={{ color: COLORS.primary, fontSize: "2.1rem", fontWeight: 700, marginBottom: 9 }}>
        Time Reallocation Tracker
      </h2>
      <div style={{ color: "#789262", fontWeight: 500, fontSize: "1.07rem", marginBottom: 19 }}>
        Log your offline activities and discover what you gained beyond the screen.
      </div>
      {/* LOG FORM */}
      <form onSubmit={handleAddLog} 
        style={{
          background: "#F4F8E9", padding: "19px 20px 10px 20px", marginBottom: 21, borderRadius: 12,
          display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 13, boxShadow: "0 1.5px 9px 0 #a7ebab10"
        }}>
        <div style={{ flex: "1 1 200px", minWidth: 130 }}>
          <label style={{ fontWeight: 700, color: COLORS.primary, fontSize: 15 }}>
            Activity
            <input
              type="text"
              value={draft.activity}
              onChange={e => setDraft({ ...draft, activity: e.target.value })}
              placeholder="e.g. Painting, Jogging…"
              style={{
                width: "100%", borderRadius: 6, border: "1.2px solid #B2DFDB",
                fontSize: 15, padding: "8px 7px", marginTop: 5
              }}
            />
          </label>
        </div>
        <div>
          <label style={{ fontWeight: 700, color: COLORS.primary, fontSize: 15 }}>
            Duration (hrs)
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={draft.duration}
              onChange={e => setDraft({ ...draft, duration: e.target.value })}
              placeholder="1.5"
              style={{
                width: 67, borderRadius: 6, border: "1.2px solid #B2DFDB",
                fontSize: 15, padding: "8px 7px", marginTop: 5
              }}
            />
          </label>
        </div>
        <div>
          <label style={{ fontWeight: 700, color: COLORS.primary, fontSize: 15 }}>
            Category
            <select
              value={draft.category}
              onChange={e => setDraft({ ...draft, category: e.target.value })}
              style={{
                minWidth: 80,
                borderRadius: 6, border: "1.2px solid #B2DFDB",
                fontSize: 15, padding: "9px 7px", marginTop: 5
              }}
            >
              <option>Learning</option>
              <option>Health</option>
              <option>Wellness</option>
              <option>Social</option>
              <option>Productivity</option>
              <option>Nature</option>
              <option>Other</option>
            </select>
          </label>
        </div>
        <button type="submit" style={{
          background: COLORS.primary, color: "#fff", border: "none", borderRadius: 7,
          padding: "10px 25px", fontWeight: 600, fontSize: 15, marginLeft: 7,
          cursor: draft.activity && draft.duration ? "pointer" : "not-allowed", opacity: draft.activity && draft.duration ? 1 : 0.65
        }}
        disabled={!draft.activity || !draft.duration}
        >Log</button>
      </form>

      {/* WEEKLY SUMMARY - MINI BAR CHART */}
      <div style={{ padding: "16px 18px 14px 18px", background: "#F8FBF8", borderRadius: 12, marginBottom: 18 }}>
        <div style={{ color: COLORS.primary, fontWeight: 600, fontSize: 16, marginBottom: 5 }}>
          "What You Gained" This Week
        </div>
        <MiniBarChart bars={dailyTotals} days={daysOfWeek} color={COLORS.accent} />
        <div style={{ marginTop: 12, fontSize: 14.2, color: "#6e7c6c" }}>
          Total time spent offline: <span style={{ color: COLORS.primary, fontWeight: 600 }}>{totalTime.toFixed(1)}</span> hours.
          <br />
          {motivationalText}
        </div>
      </div>

      {/* CATEGORY SUMMARY AS PIE/ROW */}
      <div style={{
        background: "#EAF4F8", borderRadius: 10, padding: "10px 13px 6px 13px",
        fontSize: 14.5, marginBottom: 15
      }}>
        <b style={{ color: COLORS.primary }}>Time Breakdown by Category:</b>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 6 }}>
          {Object.keys(categoryTotals).length === 0 && <span style={{ color: "#aaa", fontSize: 13 }}>—</span>}
          {Object.entries(categoryTotals).map(([cat, val], idx) =>
            <span key={cat}
              style={{
                fontWeight: 500,
                color: chartColors[idx % chartColors.length],
                padding: "3px 12px", background: "#fff", borderRadius: 7,
                border: `1.2px solid #b8beb6`, minWidth: 62, textAlign: "center"
              }}>
              {cat}: {val.toFixed(1)}h
            </span>
          )}
        </div>
      </div>

      {/* RECENT LOGS */}
      <div style={{ marginTop: 7 }}>
        <div style={{ color: COLORS.primary, fontSize: 15, fontWeight: 500, marginBottom: 8 }}>
          Recent Activity
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {logs.slice(0, 6).map((log) =>
            <li key={log.id} style={{
              marginBottom: 10,
              background: "#fff", border: "1px solid #E2EFE4", borderRadius: 7,
              padding: "10px 15px", color: "#496E44", display: "flex",
              alignItems: "center", fontSize: 15
            }}>
              <span style={{
                fontWeight: 600, color: COLORS.primary, marginRight: 14,
                fontSize: 16, minWidth: 92, textAlign: "left"
              }}>
                {log.date}
              </span>
              <span style={{ flexGrow: 1 }}>{log.activity}</span>
              <span style={{ marginLeft: 18, fontWeight: 500, color: "#B49A26" }}>
                {log.duration}h
              </span>
              <span style={{
                marginLeft: 12, fontSize: 12.1, color: "#678964",
                background: "#EFFBFC", padding: "3px 10px", borderRadius: 8
              }}>
                {log.category}
              </span>
            </li>
          )}
        </ul>
      </div>
      <div style={{ marginTop: 22, color: "#739c7a", fontSize: 13.5 }}>
        Reclaiming your hours fuels real-world growth!
      </div>
    </section>
  );
}

/**
 * MiniBarChart component - no external libs, pure react
 * Props:
 *   bars: array of number (height, e.g. hours)
 *   days: array of string (labels, e.g. "Mon", "Tue")
 *   color: bar color
 * PUBLIC_INTERFACE
 */
function MiniBarChart({ bars, days, color }) {
  // Normalize to max height 56px (approx), avoid 0 bars for small values
  const max = Math.max(...bars, 2.5);
  return (
    <div style={{ width: "100%", maxWidth: 390, margin: "0 0 0 0", display: "flex", alignItems: "flex-end", gap: 13, height: 70 }}>
      {bars.map((v, idx) => (
        <div key={days[idx]} style={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
          <div style={{
            height: 8 + (v / max) * 48,
            width: 17,
            background: v > 0.05 ? color : "#e4ebd1",
            borderRadius: 5,
            marginBottom: 3,
            boxShadow: v > 0 ? "0 1px 6px #2e7d3212" : "none",
            transition: "height 0.5s"
          }} />
          <div style={{ fontSize: 12.5, color: "#6f7715", opacity: 0.82 }}>{days[idx].slice(0, 2)}</div>
        </div>
      ))}
    </div>
  );
}

// --- UTILS ---

/**
 * Returns list of past 7 days as YYYY-MM-DD strings, newest first.
 */
function getPast7Days() {
  const arr = [];
  for (let d = 0; d < 7; ++d) arr.push(getDateNDaysAgo(d));
  return arr;
}
/**
 * Returns date string in YYYY-MM-DD for n days ago (0=today).
 */
function getDateNDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}
/**
 * Given total hours, returns a motivational string.
 */
function getMotivationalText(hours) {
  if (hours === 0) return "Tip: Log an offline activity now to start gaining your time back!";
  if (hours < 2) return "Small changes add up — try one offline hour per day!";
  if (hours < 4.5) return "Nice! Every hour offline means more real-world experiences.";
  if (hours < 8) return "Great effort! Notice how you use reclaimed time — learning, rest, joy.";
  return "Awesome! You're investing serious time in yourself beyond the screen!";
}
