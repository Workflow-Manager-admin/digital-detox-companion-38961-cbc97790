import React, { useState } from "react";

/**
 * CommunityCircles
 * Modular page for anonymous, topic-based circles (5–10 users each) with supportive, non-addictive, sharing UI.
 * - User joins/selects a topic/group ("circle")
 * - Display circle membership (anonymous), group messages ("supportive statements" only)
 * - Minimal, non-like, non-addictive layout; emphasis on reflection, sharing, encouragement (no feeds, likes, counters, or endless scroll)
 * - Demo: local state, no backend or realtime sync (future upgrade)
 *
 * PUBLIC_INTERFACE
 */
function CommunityCircles() {
  // Demo topics/circles
  const TOPICS = [
    { id: "stress", name: "Managing Stress", emoji: "🧘" },
    { id: "focus", name: "Boosting Focus", emoji: "🎯" },
    { id: "social", name: "Social Media Boundaries", emoji: "🙅‍♂️" },
    { id: "creativity", name: "Creative Hobbies", emoji: "🎨" },
    { id: "sleep", name: "Better Sleep", emoji: "💤" }
  ];
  // Simulated user state
  const [joinedCircle, setJoinedCircle] = useState(null);
  // Simulated "circle" members (anonymous: random handles)
  const demoMembers = [
    "anon1286", "anon3415", "anon2078", "anon4902", "anon6693",
    "anon3577", "anon3117", "anon2104", "anon8750", "anon9221"
  ];

  // Simulate 5–10 members per group
  const [members] = useState(
    () => shuffleArray(demoMembers).slice(0, Math.floor(Math.random() * 6) + 5)
  );

  // Supportive messages per circle, held in local state per topic
  const initialMessages = {
    stress: [
      { from: "anon1286", text: "Slow deep breaths helped me today.", time: "12m ago" },
      { from: "anon3415", text: "You’re not alone! We can get through this 🌱", time: "4h ago" }
    ],
    focus: [
      { from: "anon4902", text: "Turning off notifications improved my focus.", time: "1h ago" }
    ],
    social: [
      { from: "anon6693", text: "Logged off Instagram early—feeling lighter!", time: "2d ago" }
    ],
    creativity: [
      { from: "anon3577", text: "Did a quick sketch before bed & felt relaxed.", time: "35m ago" }
    ],
    sleep: [
      { from: "anon3117", text: "Wind-down routine: book, not phone. Slept better.", time: "6h ago" }
    ]
  };
  const [messagesByCircle, setMessagesByCircle] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  // Color vars/brand
  const COLORS = {
    primary: "var(--primary, #2E7D32)",
    accent: "var(--accent, #FFD600)",
    secondary: "var(--secondary, #B2DFDB)"
  };

  function handleJoinCircle(topic) {
    setJoinedCircle(topic);
    setDraft("");
  }

  // Share a supportive statement (add to messages; demo: no backend, no feed refresh)
  function handleShare() {
    if (!draft.trim()) return;
    setMessagesByCircle(prev => {
      const list = (prev[joinedCircle.id] || []).slice(-19); // Limit visual clutter
      return {
        ...prev,
        [joinedCircle.id]: [
          ...list,
          { from: "You", text: draft.trim(), time: "just now" }
        ]
      };
    });
    setDraft("");
  }

  // User can switch circles (can only join one for demo)
  function handleLeaveCircle() {
    setJoinedCircle(null);
  }

  // Render join interface or circle/room view
  if (!joinedCircle) {
    return (
      <section style={{ marginTop: 28, marginBottom: 23 }}>
        <h2 style={{
          color: COLORS.primary,
          fontSize: "2.1rem",
          fontWeight: 700,
          marginBottom: 10
        }}>
          Community Circles
        </h2>
        <div style={{
          color: "#6A816B",
          fontWeight: 500,
          fontSize: "1.09rem",
          marginBottom: 17,
          maxWidth: 530
        }}>
          Join an anonymous, supportive circle (5–10 members) based on a topic relevant to your digital detox journey.
          Share encouragement, helpful experiences, and kind statements—no likes, no endless feeds.
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 18
        }}>
          {TOPICS.map(t => (
            <button
              key={t.id}
              onClick={() => handleJoinCircle(t)}
              style={{
                background: "#f7fbec",
                border: `1.3px solid ${COLORS.secondary}`,
                borderRadius: 12,
                padding: "20px 16px",
                minWidth: 180,
                minHeight: 80,
                fontWeight: 600,
                color: COLORS.primary,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 3px 11px #B2DFDB10"
              }}
            >
              <span style={{
                fontSize: 28,
                marginBottom: 5,
                display: "block"
              }}>{t.emoji}</span>
              {t.name}
              <div style={{
                color: "#A3A678",
                fontWeight: 400,
                fontSize: 13,
                marginTop: 7,
                letterSpacing: 0.02
              }}>
                {Math.floor(Math.random()*6)+5} members
              </div>
            </button>
          ))}
        </div>
        <div style={{
          color: "#B49A26",
          fontSize: 15,
          marginTop: 22,
          fontWeight: 500
        }}>
          Find your tribe, share support, then return to offline life!
        </div>
      </section>
    );
  }

  // Joined a circle ("room") view
  const topicId = joinedCircle.id;
  const topicName = joinedCircle.name;
  const currentMessages = (messagesByCircle[topicId] || []).slice(-20);

  return (
    <section style={{ marginTop: 28, marginBottom: 23 }}>
      <h2 style={{ color: COLORS.primary, fontSize: "2.08rem", fontWeight: 700 }}>
        <span style={{ fontSize: 25, marginRight: 8 }}>{joinedCircle.emoji}</span>
        {topicName} Circle
      </h2>
      <div style={{
        color: "#6A816B", fontWeight: 500, fontSize: "1.07rem", marginBottom: 13
      }}>
        You and {members.length - 1} others are supporting each other anonymously.
      </div>
      <div style={{
        background: "#F8FBF8",
        borderRadius: 13,
        border: `1.2px solid ${COLORS.secondary}`,
        padding: "18px 19px 11px 18px",
        boxShadow: "0 0.5px 10px #B2DFDB13",
        marginBottom: 14,
        maxWidth: 510
      }}>
        <div style={{ marginBottom: 7, color: COLORS.primary, fontWeight: 600, fontSize: 15 }}>
          Circle Members:
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          fontSize: 14
        }}>
          {members.map((m, i) => (
            <span key={m + i} style={{
              background: "#EFFBFC",
              border: "1.2px solid #B2DFDB",
              borderRadius: 9,
              padding: "4px 10px",
              color: m === "You" ? COLORS.accent : COLORS.primary,
              fontWeight: m === "You" ? 700 : 500,
              fontStyle: m === "You" ? "italic" : "normal"
            }}>{m === "You" ? "You" : m}</span>
          ))}
        </div>
      </div>
      <div style={{
        background: "#fffde7",
        borderRadius: 12,
        border: `1.4px solid #FFD60077`,
        padding: "13px 13px 12px 13px",
        minHeight: 60,
        marginBottom: 9,
        maxWidth: 510
      }}>
        <div style={{
          color: "#CFA813",
          fontWeight: 600,
          fontSize: 15.2,
          marginBottom: 6
        }}>
          Share a supportive thought (max 160 characters):
        </div>
        <textarea
          rows={2}
          maxLength={160}
          placeholder="Encourage, inspire, or share a helpful offline habit. No venting or judgment. Just support!"
          style={{
            width: "100%",
            borderRadius: 7,
            border: "1.2px solid #B2DFDB",
            fontSize: 15,
            padding: "8px 11px",
            minHeight: 45,
            marginBottom: 6,
            outlineColor: COLORS.primary
          }}
          value={draft}
          onChange={e => setDraft(e.target.value)}
        />
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <button
            onClick={handleShare}
            disabled={draft.trim().length === 0}
            style={{
              background: COLORS.primary,
              color: "#fff",
              border: "none",
              borderRadius: 7,
              fontWeight: 600,
              fontSize: 15,
              padding: "7px 21px",
              opacity: draft.trim().length === 0 ? 0.6 : 1,
              cursor: draft.trim().length === 0 ? "not-allowed" : "pointer"
            }}
          >Share</button>
          <span style={{
            color: "#AAAB80",
            fontWeight: 400,
            fontSize: 13,
            marginLeft: 10
          }}>
            {160 - draft.length} characters left
          </span>
        </div>
      </div>
      {/* Supportive Statements/messages (reverse chronological, no likes, minimal formatting) */}
      <div style={{
        background: "#EFFBFC",
        borderRadius: 10,
        border: `1.2px solid #B2DFDB55`,
        padding: "14px 13px 8px 13px",
        marginBottom: 13,
        maxWidth: 510,
        minHeight: 60
      }}>
        <div style={{
          color: COLORS.primary,
          fontWeight: 600,
          fontSize: 15.2,
          marginBottom: 7
        }}>Circle Statements</div>
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          minHeight: 36
        }}>
          {currentMessages.length === 0 && <li style={{ color: "#AAA868", fontSize: 14 }}>No messages yet—be the first to share!</li>}
          {currentMessages.map((m, idx) => (
            <li key={idx} style={{
              marginBottom: 7,
              background: "#fff",
              borderRadius: 7,
              padding: "8px 13px 7px 12px",
              color: m.from === "You" ? COLORS.accent : COLORS.primary,
              fontWeight: m.from === "You" ? 700 : 500,
              fontStyle: m.from === "You" ? "italic" : "normal",
              border: m.from === "You" ? `1.3px solid ${COLORS.accent}` : "none",
              fontSize: 15,
              boxShadow: "0 1px 5px #b2dfdb07"
            }}>
              “{m.text}”
              <span style={{ color: "#8d8b7d", fontWeight: 400, fontSize: 12, marginLeft: 10 }}>
                • {m.from}
                {m.time && (
                  <span style={{ marginLeft: 7, color: "#CCDCAC", fontWeight: 400, fontSize: 11 }}>
                    {m.time}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button
        style={{
          marginTop: 7,
          background: "none",
          color: COLORS.primary,
          border: `1.1px solid ${COLORS.secondary}`,
          borderRadius: 8,
          padding: "8px 18px",
          fontWeight: 600,
          fontSize: 15,
          cursor: "pointer"
        }}
        onClick={handleLeaveCircle}
      >Leave Circle</button>
      <div style={{
        color: "#B49A26",
        fontSize: 15,
        marginTop: 16,
        fontWeight: 500
      }}>
        Visit once a day to support others, then focus on your own journey offline.
      </div>
    </section>
  );
}

// Shuffle utility for randomized demo member selection
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default CommunityCircles;
