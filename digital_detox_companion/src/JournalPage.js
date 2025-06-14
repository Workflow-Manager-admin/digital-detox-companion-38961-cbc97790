import React, { useState } from "react";

/**
 * JournalPage - AI-Powered Reflection & Habit Journal Page
 * Minimal, light UI supporting reflection, habit journaling, and playful encouragement.
 * @param {function} showToast - Toast display callback (feedback)
 */
// PUBLIC_INTERFACE
function JournalPage({ showToast }) {
  // AI prompt generator: random playful prompts
  const prompts = [
    "What offline moment made you smile recently?",
    "Describe a fun activity you did instead of scrolling.",
    "How do you feel right now, unplugged from your device?",
    "Share one small win from today’s digital detox.",
    "What’s one thing you’re grateful for, offline?",
    "Who or what inspired you to stay off screens today?",
  ];

  const [prompt, setPrompt] = useState(
    prompts[Math.floor(Math.random() * prompts.length)]
  );

  const [entry, setEntry] = useState("");
  const [journal, setJournal] = useState([]);

  // Change to a new playful prompt
  const handleNewPrompt = () => {
    let newPrompt;
    while (true) {
      newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      if (newPrompt !== prompt) break;
    }
    setPrompt(newPrompt);
  };

  // Simple save, playful feedback
  const handleSave = () => {
    if (!entry.trim()) {
      showToast &&
        showToast("Jot something down to save your progress!", "warning");
      return;
    }
    setJournal((j) => [{ date: new Date(), text: entry }, ...j]);
    setEntry("");
    showToast &&
      showToast("Entry added! Reflection = growth 🌼", "success");
    handleNewPrompt();
  };

  return (
    <div style={{ marginTop: 18 }}>
      <h2 style={{ color: "#2E7D32", fontWeight: 600 }}>Habit Journal</h2>
      <div
        style={{
          background: "#F2F6F5",
          borderRadius: 14,
          border: "1.2px solid #E7F6EC",
          padding: 18,
          marginBottom: 12,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 5, color: "#FFD600" }}>
          AI Prompt:
        </div>
        <div style={{ fontStyle: "italic", color: "#4A613E", fontSize: 15 }}>
          "{prompt}"
        </div>
        <button
          className="btn"
          style={{
            background: "#B2DFDB",
            color: "#2E7D32",
            marginTop: 7,
            fontSize: 14,
            padding: "4px 14px",
            border: "1px solid #FFD600",
            borderRadius: 7,
            fontWeight: 500,
            cursor: "pointer",
          }}
          onClick={handleNewPrompt}
        >
          New Prompt
        </button>
      </div>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows={3}
        maxLength={360}
        placeholder="Reflect on your progress, then save below..."
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: 11,
          border: "1.3px solid #B2DFDB",
          fontSize: 16,
          marginBottom: 7,
          background: "#F9FFF6",
          color: "#2E7D32",
          transition: "border 0.15s",
          resize: "vertical",
        }}
      />
      <br />
      <button
        className="btn"
        style={{
          background: "#FFD600",
          color: "#2E7D32",
          fontWeight: 600,
          fontSize: "1rem",
          border: "none",
          borderRadius: 8,
          padding: "9px 29px",
          marginBottom: 9,
          marginTop: 6,
          cursor: "pointer",
        }}
        onClick={handleSave}
      >
        Save Entry
      </button>
      <div style={{ color: "#789262", fontSize: 14 }}>
        The less you journal here, the more you're living out there! 🦋
      </div>
      {journal.length > 0 && (
        <div
          style={{
            marginTop: 24,
            background: "#fffbe5",
            borderRadius: 13,
            border: "1.1px solid #E7F6EC",
            padding: "16px 17px",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              marginBottom: 6,
              color: "#2E7D32",
              fontSize: 15,
            }}
          >
            Past Reflections
          </div>
          <ul
            style={{
              listStyle: "none",
              paddingLeft: 0,
              marginBottom: 0,
            }}
          >
            {journal.map((j, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: 11,
                  background: "#E7F6EC",
                  borderRadius: 7,
                  padding: "7px 12px",
                  fontSize: 15,
                  color: "#1A1A1A",
                  opacity: 0.96,
                }}
              >
                <span style={{ color: "#FFD600", fontWeight: 700 }}>
                  {j.date.toLocaleString
                    ? new Date(j.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                  :
                </span>{" "}
                {j.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default JournalPage;
