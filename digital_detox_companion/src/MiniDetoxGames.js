import React, { useState } from "react";

// Utility random helper
function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ===== MEDITATION TIMER GAME =====
function MeditationTimer({ onDone }) {
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 min = 600 sec
  const [running, setRunning] = useState(false);
  React.useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0) {
      setRunning(false);
      setTimeout(() => onDone && onDone(), 1200);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, secondsLeft]);
  const min = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const sec = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 48,
          letterSpacing: 2,
          fontFamily: "monospace",
          marginTop: 12,
          marginBottom: 28,
        }}
        aria-live="polite"
      >
        {min}:{sec}
      </div>
      {!running && secondsLeft === 600 && (
        <button
          className="btn"
          style={btnStyle}
          onClick={() => setRunning(true)}
        >
          Start 10-Minute Timer
        </button>
      )}
      {!running && secondsLeft !== 600 && secondsLeft > 0 && (
        <button className="btn" style={btnStyle} onClick={() => setRunning(true)}>
          Resume
        </button>
      )}
      {running && (
        <button
          className="btn"
          style={{ ...btnStyle, background: "#789262", color: "#fff" }}
          onClick={() => setRunning(false)}
        >
          Pause
        </button>
      )}
      {!running && secondsLeft < 600 && (
        <button
          className="btn"
          style={{ ...btnStyle, background: "#E87A41", color: "#fff" }}
          onClick={() => {
            setSecondsLeft(600);
            setRunning(false);
          }}
        >
          Reset
        </button>
      )}
      {secondsLeft === 0 && (
        <div style={{ marginTop: 26, fontSize: 20, color: "#2E7D32" }}>
          🎉 Time's up! Thank yourself for a mindful break.
        </div>
      )}
      <div style={{ marginTop: 16, color: "#888", fontSize: 15 }}>
        Try to simply sit, breathe, and notice your surroundings. (Put down your phone!)
      </div>
    </div>
  );
}

// ===== DRAWING PROMPT GAME =====
const drawingPrompts = [
  "Draw your favorite animal from memory.",
  "Sketch something you can see outside your window.",
  "Draw with your non-dominant hand.",
  "Create a quick doodle representing 'calm'.",
  "Draw a map of your ideal relaxing place.",
  "Draw a tree or plant you remember seeing.",
  "Doodle your current mood as a shape.",
  "Draw a relaxing path—real or imagined.",
  "Draw a tiny comic of a happy moment.",
];

function DrawingPrompt({ onDone }) {
  const [prompt, setPrompt] = useState(randomFromArray(drawingPrompts));
  const [accepted, setAccepted] = useState(false);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 22,
          fontWeight: 600,
          margin: "16px 0 18px",
          color: "#2E7D32",
        }}
      >
        Drawing Prompt Challenge
      </div>
      <div style={{ fontSize: 18, minHeight: 54, margin: "0 auto 18px", maxWidth: 400 }}>
        <span>{prompt}</span>
      </div>
      {!accepted ? (
        <button className="btn" style={btnStyle}
          onClick={() => setAccepted(true)}
        >
          I'll Draw This (go offline!)
        </button>
      ) : (
        <>
          <div style={{ margin: "18px 0 16px", color: "#048", fontWeight: 500 }}>
            Go! Close this, put your device away, and draw for a few minutes.
          </div>
          <button
            className="btn"
            style={btnStyle}
            onClick={onDone}
          >
            Done! Back to Main
          </button>
        </>
      )}
      <div style={{ marginTop: 18, fontSize: 14, color: "#888" }}>
        Use pencil and paper—no need for artistic skills!
      </div>
    </div>
  );
}

// ===== PHONE DECLUTTER CHECKLIST =====
const declutterItems = [
  "Delete 3 unused apps.",
  "Clear out downloads or old photos.",
  "Unsubscribe from 2 distraction-heavy notifications.",
  "Rearrange your home screen for fewer distractions.",
  "Organize a folder for positive, healthy apps.",
  "Remove social media shortcuts from your home.",
  "Clean your phone or its case physically for a mindful reset.",
];

function DeclutterChecklist({ onDone }) {
  const [checked, setChecked] = useState({});
  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 18, color: "#2E7D32", textAlign: "center" }}>
        Quick Declutter Checklist
      </div>
      <ul style={{ paddingLeft: 0, listStyle: "none" }}>
        {declutterItems.map((item, idx) => (
          <li key={idx} style={{
            background: "#F2F6F5",
            margin: "6px 0",
            borderRadius: 6,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
          }}>
            <input
              style={{ marginRight: 13, transform: "scale(1.3)" }}
              type="checkbox"
              checked={!!checked[idx]}
              onChange={() =>
                setChecked((prev) => ({
                  ...prev,
                  [idx]: !prev[idx]
                }))
              }
            />
            <span style={{
              textDecoration: checked[idx] ? "line-through" : "none",
              color: checked[idx] ? "#789262" : "#222",
              fontWeight: 500,
              fontSize: 16
            }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
      <button
        className="btn"
        style={{ ...btnStyle, marginTop: 16, marginBottom: 8 }}
        onClick={onDone}
      >
        Done! Back to Main
      </button>
      <div style={{ fontSize: 14, color: "#666", textAlign: "center", marginTop: 4 }}>
        Even 1–2 steps completed = progress!
      </div>
    </div>
  );
}

// ======== MAIN "GAMES" CONTAINER ========

// Simple game menu structure
const miniGames = [
  {
    id: "meditation",
    label: "10-Minute Meditation",
    description: "Set a simple mindful timer, close your eyes, and just breathe (screen-free break!).",
    icon: "🧘"
  },
  {
    id: "draw",
    label: "Drawing Prompt",
    description: "Pick a quick sketch prompt, then go draw on real paper (no phone needed).",
    icon: "✏️"
  },
  {
    id: "declutter",
    label: "5-Min Phone Declutter",
    description: "Use this bite-sized checklist to clean up your device or notifications.",
    icon: "🗑️"
  },
];

// Button style for consistency (mostly matches rest of app)
const btnStyle = {
  margin: "12px 9px",
  padding: "13px 29px",
  background: "#2E7D32",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 16,
  cursor: "pointer",
  outline: "none",
  transition: "background 0.22s"
};

/**
 * MiniDetoxGames - main UI for selecting and playing mini detox games.
 * Accessible design, quick to complete, and promotes offline return.
 */
// PUBLIC_INTERFACE
export default function MiniDetoxGames() {
  const [game, setGame] = useState(null);

  const handleDone = () => setGame(null);

  return (
    <div style={{
      minHeight: 430,
      maxWidth: 520,
      margin: "0 auto",
      padding: "18px 0 28px",
    }}>
      <div style={{
        fontSize: 28,
        fontWeight: 700,
        color: "#2E7D32",
        margin: "4px 0 14px",
        textAlign: "center"
      }}>
        Mini Detox Games
      </div>
      <div style={{
        textAlign: "center",
        color: "#789262",
        fontWeight: 500,
        fontSize: 16,
        marginBottom: 6
      }}>
        Quick screen-minimal challenges for a healthier break. Try one, then get back offline!
      </div>
      {game == null ? (
        <div style={{ marginTop: 24 }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center"
          }}>
            {miniGames.map((g) => (
              <button
                key={g.id}
                className="btn"
                style={{
                  ...btnStyle,
                  width: "92%",
                  background: "#fff",
                  color: "#2E7D32",
                  border: "2px solid #2E7D32",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 17,
                  fontSize: 18,
                  fontWeight: 600
                }}
                onClick={() => setGame(g.id)}
                aria-label={g.label}
              >
                <span style={{ fontSize: 28, marginRight: 10 }}>{g.icon}</span>
                <span>
                  <div style={{ fontWeight: 700 }}>{g.label}</div>
                  <div style={{
                    fontSize: 14, color: "#789262",
                    fontWeight: 400, marginTop: 1
                  }}>{g.description}</div>
                </span>
              </button>
            ))}
          </div>
          <div style={{
            marginTop: 35,
            color: "#999",
            lineHeight: 1.38,
            fontSize: 15,
            textAlign: "center"
          }}>
            Each activity is designed for quick offline breaks—<br />
            Enjoy one, then enjoy the real world ✨
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 30 }}>
          {game === "meditation" && <MeditationTimer onDone={handleDone} />}
          {game === "draw" && <DrawingPrompt onDone={handleDone} />}
          {game === "declutter" && <DeclutterChecklist onDone={handleDone} />}
          <div style={{ textAlign: "center", marginTop: 22 }}>
            <button className="btn"
              style={{
                ...btnStyle, background: "#B2DFDB", color: "#166d31",
                border: "2px solid #2E7D32"
              }}
              onClick={handleDone}
            >
              ← Back to Games Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
