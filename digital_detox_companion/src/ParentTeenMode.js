import React, { useState } from "react";

/**
 * ParentTeenMode
 * Modular entry point for the Parent-Teen shared/family mode.
 * Includes family switch (parent/teen), shared progress, encouragement messages,
 * family-specific offline challenges, and mutual encouragement.
 * Use as a full-page component (e.g., as a nav tab or route).
 * 
 * PUBLIC_INTERFACE
 */
export default function ParentTeenMode() {
  // Switch between "Parent" and "Teen" roles
  const [role, setRole] = useState("teen"); // Default demo as "teen"
  // Toy shared state — demo only, no backend.
  const [messages, setMessages] = useState([
    { from: "parent", text: "Proud of how you stuck to your goals this week! 💚", time: "1d ago" },
    { from: "teen", text: "Thanks, working on my streak!", time: "2h ago" }
  ]);
  // Toy family progress (shared challenge completion)
  const familyProgress = {
    "Offline Dinner": { done: true, by: "parent", who: ["parent", "teen"] },
    "Park Walk": { done: false, who: ["teen"] },
    "Game Night": { done: false, who: [] },
    "Unplugged Sunday": { done: false, who: ["parent", "teen"] }
  };

  // UI elements
  const COLORS = {
    primary: "var(--primary, #2E7D32)",
    accent: "var(--accent, #FFD600)",
    secondary: "var(--secondary, #B2DFDB)"
  };

  // Encouragement message input (demo: append to chat)
  const [draft, setDraft] = useState("");
  function sendMessage() {
    if (!draft.trim()) return;
    setMessages([
      ...messages,
      { from: role, text: draft.trim(), time: "now" }
    ]);
    setDraft("");
  }

  // For challenge completion (demo toggle only)
  function toggleChallenge(challenge) {
    // Not persisted, demo only: toggles done/undone
    familyProgress[challenge].done = !familyProgress[challenge].done;
    if (!familyProgress[challenge].who.includes(role)) {
      familyProgress[challenge].who.push(role);
    } else {
      const idx = familyProgress[challenge].who.indexOf(role);
      if (idx !== -1) familyProgress[challenge].who.splice(idx, 1);
    }
    // Force re-render; in real app, use state
  }

  // Render a prompt for parents/teens
  const rolePrompt =
    role === "parent"
      ? "Help encourage your teen's healthy habits. Invite them to join you for offline family moments!"
      : "Team up with your parent for family challenges. Celebrate each other's progress!";

  // Simple offline family challenges
  const FAMILY_CHALLENGES = [
    {
      name: "Offline Dinner",
      desc: "Share one uninterrupted meal together with all devices away."
    },
    {
      name: "Park Walk",
      desc: "Take a 20 min walk outdoors as a family."
    },
    {
      name: "Game Night",
      desc: "Have an unplugged game night—no screens, just fun."
    },
    {
      name: "Unplugged Sunday",
      desc: "Spend a full day offline, together!"
    }
  ];

  return (
    <section style={{ marginTop: 30, marginBottom: 30 }}>
      <h2 style={{
        color: COLORS.primary, fontSize: "2.1rem", fontWeight: 700, marginBottom: 7
      }}>
        Parent-Teen Mode <span style={{ fontSize: 22, color: COLORS.accent, marginLeft: 9 }}>🏠</span>
      </h2>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginBottom: 16
      }}>
        <b style={{ color: "#6E9D60", fontWeight: 500, fontSize: 15 }}>Viewing as:</b>
        <RoleSwitch role={role} setRole={setRole} />
      </div>
      <div style={{
        background: "#F8FBF8", borderRadius: 13, padding: "15px 18px", boxShadow: "0 2px 10px #B2DFDB13", marginBottom: 19,
        color: "#6c8b68", fontWeight: 600, fontSize: 15, maxWidth: 410
      }}>
        {rolePrompt}
      </div>
      {/* Shared Progress */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: COLORS.primary, fontWeight: 600, fontSize: 17, marginBottom: 8 }}>
          Shared Family Progress
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 15 }}>
          {FAMILY_CHALLENGES.map(ch => {
            const prog = familyProgress[ch.name];
            const done = prog.done;
            return (
              <div
                key={ch.name}
                style={{
                  background: done ? "#fffbde" : "#fff",
                  border: done
                    ? `2px solid ${COLORS.accent}`
                    : "1px solid #E2EFE4",
                  borderRadius: 11,
                  padding: "15px 18px",
                  minWidth: 190,
                  fontWeight: 500,
                  color: COLORS.primary,
                  boxShadow: done ? "0 2px 7px #FFD60022" : "none",
                  opacity: done ? 1 : 0.82
                }}
              >
                <span style={{
                  fontSize: 18,
                  marginRight: 6
                }}>{done ? "✔️" : "👨‍👩‍👧‍👦"}</span>
                {ch.name}
                <div style={{
                  color: "#7c867b",
                  fontWeight: 400,
                  fontSize: 13,
                  marginTop: 5,
                  marginBottom: 8
                }}>
                  {ch.desc}
                </div>
                <div style={{
                  color: done ? COLORS.accent : "#B1BAA8",
                  fontSize: 13
                }}>
                  {done
                    ? `Completed by: ${prog.who.join(" & ")}`
                    : prog.who.length > 0
                    ? `In progress by: ${prog.who.join(" & ")}`
                    : "Not started"}
                </div>
                <button
                  style={{
                    background: done ? "#FFD600" : "#B2DFDB",
                    color: done ? "#644C10" : "#20502C",
                    border: "none",
                    borderRadius: 7,
                    fontWeight: 500,
                    fontSize: 14,
                    padding: "5px 19px",
                    marginTop: 9,
                    cursor: "pointer"
                  }}
                  onClick={() => toggleChallenge(ch.name)}
                  title="Toggle completion (demo)"
                >{done ? "Mark as Incomplete" : "Mark as Done"}</button>
              </div>
            );
          })}
        </div>
      </div>
      {/* Family Encouragement Chat */}
      <div style={{
        background: "#EFFBFC",
        borderRadius: 11,
        padding: "15px 16px",
        marginBottom: 21,
        maxWidth: 400,
        minHeight: 90
      }}>
        <div style={{
          color: COLORS.primary,
          fontWeight: 600,
          fontSize: 16,
          marginBottom: 6
        }}>
          Encouragement Board
        </div>
        <FamilyMessages role={role} messages={messages} COLORS={COLORS} />
        <form
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }}
          style={{
            display: "flex",
            gap: 7,
            marginTop: 9
          }}
        >
          <input
            value={draft}
            placeholder={
              role === "parent"
                ? "Encourage your teen..."
                : "Send a note to your parent..."
            }
            onChange={e => setDraft(e.target.value)}
            style={{
              flex: 1,
              border: "1px solid #B2DFDB",
              borderRadius: 7,
              fontSize: 14,
              padding: "7px 10px"
            }}
          />
          <button
            type="submit"
            style={{
              background: COLORS.primary,
              color: "#fff",
              border: "none",
              borderRadius: 7,
              fontWeight: 500,
              fontSize: 14,
              padding: "7px 18px",
              cursor: draft.length === 0 ? "not-allowed" : "pointer",
              opacity: draft.length === 0 ? 0.65 : 1
            }}
            disabled={draft.length === 0}
          >Send</button>
        </form>
      </div>
      <div style={{
        color: "#BDAC31",
        fontWeight: 500,
        fontSize: 15,
        marginTop: 13,
        fontStyle: "italic"
      }}>
        Family goals = stronger habits, together!
      </div>
    </section>
  );
}

// Role Switcher toggle UI
// PUBLIC_INTERFACE
function RoleSwitch({ role, setRole }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      background: "#F2F6F5",
      borderRadius: 19,
      border: "1.2px solid #B2DFDB",
      fontWeight: 600
    }}>
      <button
        style={{
          background: role === "teen" ? "#FFD600" : "none",
          color: role === "teen" ? "#2E7D32" : "#7b8d7c",
          borderRadius: 19,
          border: "none",
          fontWeight: 600,
          fontSize: 15,
          padding: "6px 13px",
          cursor: "pointer"
        }}
        aria-pressed={role === "teen"}
        onClick={() => setRole("teen")}
      >Teen</button>
      <button
        style={{
          background: role === "parent" ? "#FFD600" : "none",
          color: role === "parent" ? "#2E7D32" : "#7b8d7c",
          borderRadius: 19,
          border: "none",
          fontWeight: 600,
          fontSize: 15,
          padding: "6px 12px",
          cursor: "pointer"
        }}
        aria-pressed={role === "parent"}
        onClick={() => setRole("parent")}
      >Parent</button>
    </div>
  );
}

// PUBLIC_INTERFACE
function FamilyMessages({ role, messages, COLORS }) {
  // Show most recent last
  return (
    <div style={{ marginBottom: 4, minHeight: 39 }}>
      {messages.map((m, i) => (
        <div key={i} style={{
          display: "flex",
          justifyContent: m.from === role ? "flex-end" : "flex-start",
          marginBottom: 2
        }}>
          <span style={{
            background: m.from === role ? "#B2DFDB55" : "#FFD60022",
            color: m.from === "parent" ? "#B49A26" : COLORS.primary,
            borderRadius: 11,
            padding: "4px 12px",
            fontSize: 14,
            fontWeight: 500,
            maxWidth: 220,
            wordBreak: "break-word"
          }}>
            {m.text}
            <span style={{
              marginLeft: 9,
              color: "#BDBDBD",
              fontWeight: 400,
              fontSize: 11
            }}>· {m.time}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
