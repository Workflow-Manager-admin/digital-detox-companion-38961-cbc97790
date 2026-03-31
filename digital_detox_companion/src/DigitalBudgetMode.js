import React, { useState } from "react";

/**
 * DigitalBudgetMode
 * Modular UI for weekly screen time budgeting—set a weekly limit,
 * allocate time across apps/categories, track usage, and handle reset/rollover logic.
 * Optimized for minimal and branded integration (KAVIA color scheme).
 *
 * PUBLIC_INTERFACE
 */
export default function DigitalBudgetMode() {
  // State for weekly budget (minutes) and allocations
  const [weeklyBudget, setWeeklyBudget] = useState(840); // Default: 2hrs/day × 7
  const [allocations, setAllocations] = useState([
    { category: "Social Media", minutes: 350 },
    { category: "Entertainment", minutes: 210 },
    { category: "Productivity", minutes: 140 },
    { category: "Other", minutes: 140 }
  ]);
  const [usage, setUsage] = useState([
    { category: "Social Media", minutes: 120 },
    { category: "Entertainment", minutes: 88 },
    { category: "Productivity", minutes: 77 },
    { category: "Other", minutes: 62 }
  ]);
  const [showResetModal, setShowResetModal] = useState(false);
  const [rolloverMode, setRolloverMode] = useState("none"); // or 'carryover'

  // Color variables for theme
  const COLORS = {
    primary: "var(--primary, #2E7D32)",
    accent: "var(--accent, #FFD600)",
    secondary: "var(--secondary, #B2DFDB)"
  };

  // Helper totals
  const totalAllocated = allocations.reduce((sum, a) => sum + Number(a.minutes), 0);
  const totalUsed = usage.reduce((sum, u) => sum + Number(u.minutes), 0);

  // Track minute allocation changes
  function updateAllocation(idx, val) {
    const newAlloc = [...allocations];
    newAlloc[idx].minutes = Number(val);
    setAllocations(newAlloc);
  }

  // Reset logic (at week end)
  function handleReset() {
    setShowResetModal(false);
    if (rolloverMode === "carryover") {
      // Carry over unused time to next week
      const unused = Math.max(0, weeklyBudget - totalUsed);
      setWeeklyBudget(840 + unused);
    } else {
      // Fresh week: reset to default or previous budget
      setWeeklyBudget(840);
    }
    setUsage(usage.map(u => ({ ...u, minutes: 0 })));
  }

  // Minutes pretty format
  function minToHrs(min) {
    return `${Math.floor(min / 60)}h ${min % 60}m`;
  }

  // Progress for each category
  function categoryProgress(cat) {
    const alloc = allocations.find(a => a.category === cat);
    const use = usage.find(u => u.category === cat) || { minutes: 0 };
    return alloc ? Math.min(1, use.minutes / alloc.minutes || 0) : 0;
  }

  // --- RENDER ---
  return (
    <section style={{ marginTop: 30, marginBottom: 25 }}>
      <h2 style={{ color: COLORS.primary, fontSize: "2.08rem", fontWeight: 700 }}>
        🎛️ Digital Budget Mode
      </h2>
      <div style={{ color: "#678964", fontWeight: 500, fontSize: "1.07rem", marginBottom: 14 }}>
        Set your weekly screen time budget, allocate time by app/category, and track your digital spending.
      </div>
      {/* Budget Section */}
      <div style={{
        background: "#F8FBF8",
        borderRadius: 13,
        padding: "17px 22px 16px",
        marginBottom: 20,
        color: COLORS.primary,
        fontWeight: 600,
        boxShadow: "0 2px 7px #B2DFDB12"
      }}>
        <div style={{ fontSize: 16.5, marginBottom: 4 }}>Weekly Screen Time Budget:</div>
        <div style={{
          fontWeight: 700, fontSize: 27, color: COLORS.accent, marginBottom: 7
        }}>
          {minToHrs(weeklyBudget)}
        </div>
        <div>
          <label style={{ fontWeight: 500, marginRight: 7 }}>
            Adjust budget:{" "}
            <input
              style={{
                borderRadius: 7,
                border: "1.2px solid #B2DFDB",
                padding: "7px 10px",
                fontSize: 15,
                width: 80
              }}
              type="number"
              min={120}
              max={2800}
              value={weeklyBudget}
              onChange={e => setWeeklyBudget(Number(e.target.value))}
            />{" "}
            min / week
          </label>
        </div>
        <div style={{ fontSize: 13.8, color: "#7c8c81", marginTop: 2 }}>
          Example: 14hrs = 2hr/day; Design your digital allowance for a healthier week!
        </div>
      </div>
      {/* Allocation */}
      <div style={{
        padding: "16px 20px 12px", background: "#EFFBFC",
        borderRadius: 12, marginBottom: 16
      }}>
        <div style={{
          fontWeight: 600, color: COLORS.primary, fontSize: 15.8, marginBottom: 7
        }}>
          Allocate your time:
        </div>
        {allocations.map((a, i) => (
          <div key={a.category} style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 7
          }}>
            <span style={{ minWidth: 120 }}>{a.category}</span>
            <input
              type="number"
              min={0}
              max={weeklyBudget}
              value={a.minutes}
              style={{
                borderRadius: 7, border: "1.1px solid #B2DFDB",
                width: 70, padding: "7px 8px", fontSize: 15
              }}
              onChange={e => updateAllocation(i, e.target.value)}
            />{" "}
            <span style={{ color: "#A29B70", fontWeight: 500 }}>
              ({minToHrs(a.minutes)})
            </span>
            <span style={{
              marginLeft: 14, color: a.minutes > 0 ? COLORS.primary : "#bbb",
              fontWeight: 600
            }}>
              {usage[i]?.minutes || 0} min used
              <span style={{ marginLeft: 6, fontWeight: 400, color: "#aaa", fontSize: 13 }}>
                [{Math.round(categoryProgress(a.category) * 100)}%]
              </span>
            </span>
            <div style={{
              flex: 1, marginLeft: 8, maxWidth: 160, minWidth: 50
            }}>
              <BudgetBar
                percent={categoryProgress(a.category)}
                color={COLORS.accent}
                secondaryColor={COLORS.secondary}
              />
            </div>
          </div>
        ))}
        <div style={{
          fontSize: 13.5,
          marginTop: 4,
          color: totalAllocated > weeklyBudget ? "#E8652A" : COLORS.primary,
          fontWeight: 500
        }}>
          {totalAllocated > weeklyBudget
            ? `⚠️ Over-allocated! Reduce sums to <= ${weeklyBudget} min.`
            : `Allocated: ${totalAllocated} min / ${weeklyBudget} min`
          }
        </div>
      </div>
      {/* Usage Tracking */}
      <div style={{
        background: "#fffde7",
        borderRadius: 10,
        border: `1.6px solid ${COLORS.accent}55`,
        padding: "13px 13px 10px 13px",
        marginBottom: 19
      }}>
        <b style={{ color: COLORS.primary, fontSize: 15.5 }}>Usage This Week:</b>
        <div style={{
          marginTop: 4,
          fontSize: 14.4,
          color: totalUsed > weeklyBudget ? "#b84a3a" : COLORS.primary,
          fontWeight: 500
        }}>
          Total used: {totalUsed} min • Remaining: {Math.max(0, weeklyBudget - totalUsed)} min
        </div>
        <div style={{
          fontSize: 13.4, color: "#8d8b7d", marginTop: 2
        }}>
          Keep an eye on your spend—check yourself before mindless scrolling!
        </div>
      </div>
      {/* Reset/Rollover Logic */}
      <div style={{
        background: "#F8FBF8",
        borderRadius: 11,
        padding: "12px 15px 12px",
        marginBottom: 15
      }}>
        <b style={{ color: COLORS.primary }}>Reset/Rollover:</b>
        <div style={{ marginTop: 5, fontSize: 14 }}>
          <span style={{ marginRight: 9 }}>
            <label>
              <input
                type="radio"
                name="rollover"
                checked={rolloverMode === "none"}
                onChange={() => setRolloverMode("none")}
              />
              &nbsp; Reset to fresh budget weekly
            </label>
          </span>
          <span>
            <label>
              <input
                type="radio"
                name="rollover"
                checked={rolloverMode === "carryover"}
                onChange={() => setRolloverMode("carryover")}
              />
              &nbsp; Carry over unused time to next week
            </label>
          </span>
        </div>
        <button
          style={{
            marginTop: 9,
            background: COLORS.accent,
            color: "#244e24",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 15,
            padding: "7px 23px",
            cursor: "pointer"
          }}
          onClick={() => setShowResetModal(true)}
        >
          Reset/Rollover Week
        </button>
      </div>
      {/* Modal for confirmation */}
      {showResetModal &&
        <Modal onClose={() => setShowResetModal(false)}>
          <h3 style={{ color: COLORS.primary, marginTop: 0 }}>Confirm Week Reset</h3>
          <p style={{
            color: "#78848F",
            fontWeight: 500,
            fontSize: "1.01rem"
          }}>
            Are you sure you want to reset this week? {rolloverMode === "carryover" ? (
              <span>
                Unused time (<b>{Math.max(0, weeklyBudget - totalUsed)} min</b>) will be added to your next week!
              </span>
            ) : (
              <span>Your budget will reset to <b>14 hours</b> (840 min).</span>
            )}
          </p>
          <div>
            <button
              style={{
                background: COLORS.primary,
                color: "#fff",
                border: "none",
                borderRadius: 5,
                padding: "9px 22px",
                fontWeight: 500,
                fontSize: 15,
                marginRight: 7,
                cursor: "pointer"
              }}
              onClick={handleReset}
            >Confirm</button>
            <button
              style={{
                background: "none",
                color: COLORS.primary,
                border: "1.2px solid #B2DFDB",
                borderRadius: 5,
                padding: "8px 14px",
                fontWeight: 500,
                fontSize: 15,
                cursor: "pointer"
              }}
              onClick={() => setShowResetModal(false)}
            >Cancel</button>
          </div>
        </Modal>
      }
      <div style={{
        marginTop: 18,
        color: COLORS.primary,
        fontSize: 14.1,
        fontWeight: 500
      }}>
        Digital budgeting helps your intentional screen use!
      </div>
    </section>
  );
}

// Simple Budget Progress Bar
function BudgetBar({ percent, color, secondaryColor }) {
  return (
    <div style={{
      width: "100%",
      height: 13,
      background: secondaryColor,
      borderRadius: 5,
      overflow: "hidden"
    }}>
      <div style={{
        width: `${Math.round(percent * 100)}%`,
        height: "100%",
        background: color,
        transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
        borderRadius: "5px"
      }} />
    </div>
  );
}

// Minimal Modal
function Modal({ children, onClose }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(44,60,46,0.13)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 10001
    }}>
      <div style={{
        background: "#fff",
        padding: "30px 28px 22px",
        borderRadius: 11,
        boxShadow: "0 3px 30px #B2DFDB22",
        minWidth: 270,
        minHeight: 120,
        maxWidth: 390
      }}>
        {children}
      </div>
    </div>
  );
}
