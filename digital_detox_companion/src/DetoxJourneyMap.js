import React, { useState } from "react";

/**
 * DetoxJourneyMap Component
 * Modular, minimal, and branded timeline for digital detox journey.
 * - Visual timeline with milestones, reflections, and emotion check-ins (mood, focus, anxiety).
 * - Story-based, motivational UI.
 * - Minimal, distraction-free styles that leverage app's CSS variables.
 * - Ready for navigation/data integration.
 * 
 * Props:
 *   journey: Journey data object (optional, demo data as fallback)
 * 
 * PUBLIC_INTERFACE
 */
function DetoxJourneyMap({ journey = defaultJourney }) {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionDraft, setReflectionDraft] = useState("");
  const [emotionCheckIn, setEmotionCheckIn] = useState("");
  const [emotionModalOpen, setEmotionModalOpen] = useState(false);

  // Add a new reflection (prototype: no backend/integration)
  function handleAddReflection(milestoneId) {
    setSelectedMilestone(milestoneId);
    setShowReflection(true);
    setReflectionDraft("");
  }
  function handleSaveReflection() {
    setShowReflection(false);
    setSelectedMilestone(null);
    setReflectionDraft("");
    // No backend: Show alert for demo.
    alert("Reflection saved (demo)");
  }
  function openEmotionModal() {
    setEmotionModalOpen(true);
    setEmotionCheckIn("");
  }
  function saveEmotionCheckIn() {
    setEmotionModalOpen(false);
    alert("Emotion check-in saved (demo)");
  }

  // Colors (use CSS vars for direct integration, fallback for demo)
  const COLORS = {
    primary: "var(--primary, #2E7D32)",
    secondary: "var(--secondary, #B2DFDB)",
    accent: "var(--accent, #FFD600)",
    bg: "var(--bg, #fff)",
    text: "var(--text, #1A1A1A)"
  };

  return (
    <section style={{ marginTop: 28, marginBottom: 30 }}>
      <h2 style={{
        color: COLORS.primary, fontSize: "2.15rem", fontWeight: 700, marginBottom: 9
      }}>
        Detox Journey Map
      </h2>
      <p style={{
        color: "#719A8B", fontWeight: 500, fontSize: "1.08rem", marginBottom: 22
      }}>
        Track your digital detox story—see your goals, key milestones, and how you felt along the way!
      </p>
      {/* Timeline Axis */}
      <div style={{
        position: "relative", margin: "0 auto", padding: "24px 0", minHeight: 260, maxWidth: 810
      }}>
        {/* Vertical line for timeline */}
        <div style={{
          position: "absolute", left: 34, top: 16, bottom: 12,
          width: 4, background: "linear-gradient(180deg, #B2DFDBcc 3%, #FFD60066 97%)",
          borderRadius: 6, zIndex: 0
        }} />
        {/* Milestones */}
        <ol style={{
          listStyle: "none", margin: 0, padding: 0,
          display: "flex", flexDirection: "column", gap: 34, position: "relative"
        }}>
          {journey.milestones.map((milestone, idx) => (
            <li key={milestone.id} style={{
              position: "relative", display: "flex", alignItems: "flex-start", zIndex: 2
            }}>
              {/* Timeline dot */}
              <span style={{
                display: "inline-block",
                width: 22, height: 22,
                borderRadius: "50%",
                background:
                  milestone.completed
                    ? `linear-gradient(145deg, ${COLORS.primary} 65%, ${COLORS.accent})`
                    : "#dbeee0",
                boxShadow: milestone.completed && "0 2px 14px #2E7D3216",
                border: milestone.completed ? "2.5px solid #FFD600" : "2.5px solid #B2DFDB",
                marginRight: 22, marginLeft: 16,
                transition: "background 0.2s"
              }} />
              {/* Milestone Content Box */}
              <div style={{
                flexGrow: 1,
                background: "#fff",
                border: milestone.completed
                  ? `1.5px solid ${COLORS.accent}`
                  : "1.5px solid #E2EFE4",
                borderRadius: 11,
                boxShadow: "0 2px 8px 0 rgba(44,127,67,0.05)",
                padding: "21px 18px 15px 18px",
                marginBottom: 0,
                minWidth: 160, position: "relative"
              }}>
                <div style={{
                  color: milestone.completed ? COLORS.primary : "#A2AF9A",
                  fontWeight: 600, fontSize: "1.13rem", marginBottom: 6
                }}>
                  {milestone.title}
                  {milestone.completed &&
                    <span style={{
                      marginLeft: 8, fontSize: 16, color: COLORS.accent, verticalAlign: -3
                    }}>✔️</span>
                  }
                </div>
                <div style={{
                  color: "#82777A", fontWeight: 400, fontSize: 15, marginBottom: 4,
                  lineHeight: "1.4"
                }}>
                  {milestone.desc}
                </div>
                <div style={{ color: "#B1BAA8", fontSize: 13 }}>
                  {milestone.date}
                </div>

                {/* User reflection (if any, static in demo) */}
                {milestone.reflection &&
                  <blockquote style={{
                    borderLeft: `3px solid ${COLORS.primary}`,
                    background: "#F8FBF9", color: "#426046",
                    margin: "16px 0 0 0", padding: "10px 12px", fontSize: 14,
                    borderRadius: 4, fontStyle: "italic"
                  }}>
                    “{milestone.reflection}”
                  </blockquote>
                }

                {/* Add Reflection demo button */}
                <button
                  style={{
                    marginTop: 9,
                    background: "none", color: COLORS.accent,
                    border: "1px solid #FCE490", borderRadius: 6,
                    fontWeight: 500, fontSize: 14,
                    padding: "5px 13px",
                    cursor: "pointer"
                  }}
                  onClick={() => handleAddReflection(milestone.id)}
                >
                  {milestone.reflection ? "Edit Reflection" : "Add Reflection"}
                </button>
                {/* Emotion check-in */}
                <button
                  style={{
                    marginLeft: 12, marginTop: 9,
                    background: "none", color: "#E29756",
                    border: "1px solid #FFD60033", borderRadius: 6,
                    fontWeight: 500, fontSize: 14,
                    padding: "5px 13px",
                    cursor: "pointer"
                  }}
                  onClick={openEmotionModal}
                  title="Add Emotion Check-In"
                >
                  {milestone.emotion ? (
                    <span>
                      Mood: {emotionEmoji(milestone.emotion)}
                    </span>
                  ) : "Emotion Check-In"}
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {/* Add Reflection editor modal (minimal) */}
      {showReflection &&
        <div style={modalStyle}>
          <div style={modalInnerStyle}>
            <h3 style={{ color: COLORS.primary, marginTop: 0 }}>Add Reflection</h3>
            <textarea
              rows={4}
              value={reflectionDraft}
              placeholder="Write a reflection about your experience, feelings, or progress…"
              style={{
                width: "100%", borderRadius: 8, padding: "11px", border: "1.5px solid #E5E5CD",
                fontSize: 15, marginBottom: 12, resize: "vertical", minHeight: 60,
                outlineColor: COLORS.primary
              }}
              onChange={e => setReflectionDraft(e.target.value)}
            />
            <div style={{ marginBottom: 7 }}>
              <button
                onClick={handleSaveReflection}
                disabled={reflectionDraft.length === 0}
                style={{
                  background: COLORS.primary, color: "#fff",
                  border: "none", borderRadius: 5, padding: "9px 22px", fontWeight: 500,
                  fontSize: 15, opacity: reflectionDraft.length === 0 ? 0.62 : 1,
                  cursor: reflectionDraft.length === 0 ? "not-allowed" : "pointer", marginRight: 8
                }}>
                Save
              </button>
              <button
                style={{
                  background: "none", color: COLORS.primary,
                  border: "1px solid #CADCD9", borderRadius: 5,
                  padding: "9px 16px", fontWeight: 500, fontSize: 15, cursor: "pointer"
                }}
                onClick={() => setShowReflection(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      }
      {/* Emotion modal */}
      {emotionModalOpen &&
        <div style={modalStyle}>
          <div style={modalInnerStyle}>
            <h3 style={{ color: COLORS.primary, marginTop: 0 }}>
              Emotion Check-In
            </h3>
            {/* Mood options */}
            <div style={{ fontSize: 30, marginBottom: 7, marginTop: 7 }}>
              {[ "happy", "calm", "neutral", "anxious", "frustrated" ].map(mood =>
                <span
                  key={mood}
                  style={{
                    cursor: "pointer", margin: "0 8px",
                    opacity: emotionCheckIn === mood ? 1 : 0.58,
                    transition: "opacity 0.16s"
                  }}
                  onClick={() => setEmotionCheckIn(mood)}
                  title={mood[0].toUpperCase() + mood.slice(1)}
                >
                  {emotionEmoji(mood)}
                </span>
              )}
            </div>
            {/* Simplified: focus/anxiety mood only, can expand */}
            <button
              onClick={saveEmotionCheckIn}
              disabled={!emotionCheckIn}
              style={{
                background: COLORS.accent, color: "#32311a",
                border: "none", borderRadius: 5, padding: "9px 18px",
                fontWeight: 500, fontSize: 15,
                opacity: !emotionCheckIn ? 0.62 : 1,
                cursor: !emotionCheckIn ? "not-allowed" : "pointer"
              }}
            >
              Save
            </button>
            <button
              style={{
                marginLeft: 9,
                background: "none", color: COLORS.primary,
                border: "1px solid #CADCD9", borderRadius: 5,
                padding: "8px 14px", fontWeight: 500,
                fontSize: 15, cursor: "pointer"
              }}
              onClick={() => setEmotionModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      }
      <div style={{
        marginTop: 30, color: COLORS.primary, fontSize: 15, fontWeight: 500, textAlign: "center"
      }}>
        Your story inspires progress. Reviewing your growth helps build lasting, healthy habits.
      </div>
    </section>
  );
}

// Demo Data for standalone prototype
const defaultJourney = {
  milestones: [
    {
      id: 1,
      title: "Set First Goal",
      desc: "Start with reducing social media to 90 min/day for a week.",
      date: "2024-05-28",
      completed: true,
      reflection: "I realized how much free time I have during my commute.",
      emotion: "happy"
    },
    {
      id: 2,
      title: "Try 30-Min Offline Activity",
      desc: "Add a daily offline activity (walk, book, hobby).",
      date: "2024-05-30",
      completed: true,
      reflection: "Felt relaxed painting in the park.",
      emotion: "calm"
    },
    {
      id: 3,
      title: "Reduce to 60 Min/Day",
      desc: "Limit screen time to 60 min/day. Try one off-grid block for 2hrs.",
      date: "2024-06-04",
      completed: false,
      // no reflection for demo
    },
    {
      id: 4,
      title: "Offline Friends Meetup",
      desc: "Socialize off-screen—dinner or outdoor fun.",
      date: "2024-06-08",
      completed: false
    },
    {
      id: 5,
      title: "Final Check & Reflect",
      desc: "Review mood & focus. Celebrate your progress!",
      date: "2024-06-10",
      completed: false
    }
  ]
};

// Utility for emoji given mood
function emotionEmoji(mood) {
  switch (mood) {
    case "happy": return "😃";
    case "calm": return "😌";
    case "neutral": return "😐";
    case "anxious": return "😬";
    case "frustrated": return "😠";
    default: return "🙂";
  }
}

// Minimal modal styling (not using external libs)
const modalStyle = {
  position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
  background: "rgba(90,112,101,0.16)", display: "flex", alignItems: "center",
  justifyContent: "center", zIndex: 3000
};
const modalInnerStyle = {
  background: "#fff", padding: "30px 26px 18px", borderRadius: 12, boxShadow: "0 3px 30px #B2DFDB22",
  minWidth: 280, minHeight: 140, maxWidth: 400
};

export default DetoxJourneyMap;
