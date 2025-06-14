import React, { useState } from "react";

// Reflection prompts can be enhanced or replaced with offline AI in future
const PROMPTS = [
  "What's one thing you enjoyed away from a screen today?",
  "How did you feel after spending time offline?",
  "Was it hard to resist digital distractions? Why or why not?",
  "What small thing will you try tomorrow to reduce screen time?",
];

// PUBLIC_INTERFACE
/**
 * JournalPage - Daily reflection and habit journal.
 * Users answer 1 prompt per day, get playful feedback upon submission.
 * @param {function} showToast - toast for visible optimist feedback
 */
function JournalPage({ showToast }) {
  const [entry, setEntry] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Choose randomly for now
  const todaysPrompt = PROMPTS[new Date().getDate() % PROMPTS.length];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry.trim()) return;
    setSubmitted(true);
    showToast && showToast("🌟 Entry saved! Your reflection matters.", "success");
    setTimeout(() => {
      setSubmitted(false);
      setEntry("");
    }, 2100);
  };

  return (
    <div style={{
      background: "#fafcfb",
      borderRadius: 13,
      boxShadow: "0 2px 14px #e7f6ec60,0 1px 0 #fff2",
      padding: 24, maxWidth: 520, margin: "18px auto"
    }}>
      <h2 style={{ color: "#2E7D32", marginBottom: 5, fontWeight: 700 }}>Reflection Journal 📖</h2>
      <div style={{ color: "#3F6140", marginBottom: 16 }}>
        <b>Today's Prompt:</b> <span>{todaysPrompt}</span>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={entry}
          onChange={e => setEntry(e.target.value)}
          placeholder="Type your thoughts and feelings here..."
          maxLength={380}
          style={{
            width: "100%",
            minHeight: 95,
            border: "1px solid #b2dfdb",
            borderRadius: 7,
            padding: "12px 13px",
            fontSize: 15,
            color: "#3f5c29",
          }}
          disabled={submitted}
        />
        <button
          className="btn"
          style={{
            background: "#2E7D32",
            color: "#fff",
            border: "none", borderRadius: 6,
            padding: "12px 22px",
            fontWeight: 600, fontSize: 16, marginTop: 14,
            cursor: submitted ? "not-allowed" : "pointer",
            opacity: submitted ? 0.8 : 1
          }}
          type="submit"
          disabled={submitted}
        >
          {submitted ? "Entry Submitted ✔️" : "Submit Entry"}
        </button>
        <div style={{marginTop:16, color: "#FFD600", fontWeight:500, fontSize:15, minHeight: 22}}>
          {submitted ? "Thanks for reflecting! 🌟" : "Reflect, grow, and enjoy the real world!"}
        </div>
      </form>
    </div>
  );
}

export default JournalPage;
