import React, { useState } from "react";

/**
 * MiniDetoxGames
 * Modular page/component for low-addiction micro-games and creative, mindful challenges.
 * - Each game/task can be completed in 1–2 minutes.
 * - Focused on mindfulness, relaxed creativity, or light fun—not competition or addictive loops.
 * - Modular: add more games/challenges as simple components.
 * - Minimal UI, encourages the user to leave and try something offline.
 *
 * PUBLIC_INTERFACE
 */
function MiniDetoxGames() {
  const GAMES = [
    {
      id: "breath",
      name: "Breathing Bubble",
      description: "A simple animated breathing exercise for a mindful pause.",
      render: () => <BreathingBubble />
    },
    {
      id: "draw",
      name: "Offline Doodle Prompt",
      description: "Get a creative offline doodle prompt. Draw for 2 minutes on paper!",
      render: () => <OfflineDoodlePrompt />
    },
    {
      id: "list",
      name: "Gratitude List",
      description: "Briefly list 3 things you're grateful for right now.",
      render: () => <GratitudeList />
    },
    {
      id: "body",
      name: "Body Scan Minute",
      description: "Mindfully check in with your body in 60 seconds.",
      render: () => <BodyScanMinute />
    },
    {
      id: "nature",
      name: "Nature Photo Scavenger",
      description: "Offline: Find and take a photo of something in nature nearby.",
      render: () => <NatureScavenger />
    }
  ];
  const [active, setActive] = useState(null);

  const COLORS = {
    primary: "var(--primary, #2E7D32)",
    accent: "var(--accent, #FFD600)",
    secondary: "var(--secondary, #B2DFDB)"
  };

  return (
    <section style={{ marginTop: 30, marginBottom: 24 }}>
      <h2
        style={{
          color: COLORS.primary,
          fontSize: "2.08rem",
          fontWeight: 700,
          marginBottom: 8
        }}
      >
        Mini Detox Games & Mindful Tasks
      </h2>
      <div
        style={{
          color: "#678964",
          fontWeight: 500,
          fontSize: "1.07rem",
          marginBottom: 13
        }}
      >
        Engage in ultra-short, non-addictive challenges, then step away and enjoy the offline world!
      </div>
      {/* Picker: either show game selector, or the current game/task card */}
      {!active ? (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 22
        }}>
          {GAMES.map(g => (
            <button
              key={g.id}
              onClick={() => setActive(g)}
              style={{
                background: "#f7fbec",
                border: `1.3px solid ${COLORS.secondary}`,
                borderRadius: 12,
                padding: "20px 16px",
                minWidth: 180,
                textAlign: "left",
                fontWeight: 500,
                color: COLORS.primary,
                boxShadow: "0 2px 7px #B2DFDB12",
                fontSize: 15.5,
                cursor: "pointer",
                marginTop: 8
              }}
              aria-label={`Start ${g.name}`}
            >
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{g.name}</div>
              <div style={{ fontSize: 13.6, color: "#7e7c81" }}>{g.description}</div>
            </button>
          ))}
        </div>
      ) : (
        <div
          style={{
            background: "#F8FBF8",
            borderRadius: 13,
            padding: "21px 22px",
            minWidth: 220,
            boxShadow: "0 1.5px 12px #B2DFDB13"
          }}
        >
          {/* Game content */}
          <div style={{ marginBottom: 13 }}>
            <span style={{ color: COLORS.primary, fontWeight: 700, fontSize: 19 }}>{active.name}</span>
          </div>
          <div style={{ marginBottom: 18, color: "#888", fontSize: 14, fontWeight: 500 }}>
            {active.description}
          </div>
          <div style={{ marginBottom: 19 }}>
            {active.render()}
          </div>
          <button
            style={{
              background: "none",
              color: COLORS.primary,
              border: `1.3px solid ${COLORS.secondary}`,
              borderRadius: 7,
              padding: "9px 22px",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer"
            }}
            onClick={() => setActive(null)}
          >Back to Games</button>
        </div>
      )}
      <div style={{
        marginTop: 30,
        color: "#868c8f",
        fontStyle: "italic",
        fontSize: 14,
        textAlign: "center"
      }}>
        Try one task, close the screen, and return when you want more mindful mini-challenges!
      </div>
    </section>
  );
}

/**
 * BreathingBubble: Simple animated breathing exercise (timed inhale/exhale instructions).
 * Ultra-minimal, no sound, <2 min, visually "offline friendly".
 */
function BreathingBubble() {
  // state: inhale/exhale cycles (fixed 3 cycles)
  const [step, setStep] = useState(0); // steps: 0=ready, 1-6=cycles, 7=done
  const phases = [
    { label: "Inhale…", secs: 4 },
    { label: "Hold", secs: 2 },
    { label: "Exhale…", secs: 5 },
    { label: "Hold", secs: 2 }
  ];
  // Each cycle = all phases (13s), 3x = 39s
  const [timer, setTimer] = useState(0);
  React.useEffect(() => {
    let t = null;
    if (timer > 0) {
      t = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (step > 0 && step < 7) {
      // advance to next phase/cycle
      setTimeout(() => setStep(step + 1), 750);
    }
    return () => clearTimeout(t);
  }, [timer, step]);

  function start() {
    setStep(1);
    setTimer(phases[0].secs);
  }
  React.useEffect(() => {
    if (step > 0 && step < 7) {
      const phase = phases[(step - 1) % 4];
      setTimer(phase.secs);
    }
  }, [step]);
  if (step === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{
          marginBottom: 13,
          fontSize: 15
        }}>
          Relax, follow the bubble. Ready to take 3 mindful breaths?
        </div>
        <button
          onClick={start}
          style={{
            background: "var(--accent, #FFD600)",
            color: "#2E7D32",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            padding: "9px 26px",
            cursor: "pointer"
          }}>Start</button>
      </div>
    );
  }
  if (step >= 7)
    return (
      <div style={{ textAlign: "center", color: "var(--primary, #2E7D32)", fontWeight: 500 }}>
        Done! Notice how you feel.<br />
        Step away from your screen and enjoy the present moment 🌱
      </div>
    );
  // Animate bubble: use phase for color/size
  const phase = phases[(step - 1) % 4];
  const breathPct = timer / phase.secs;
  let size = 70 + (step % 2 === 1 ? (1 - breathPct) * 38 : breathPct * 22); // expand on inhale, shrink on exhale

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        margin: "0 auto 13px auto",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(145deg, #B2DFDBa6, #FFD600aa, #E7F6EC)",
        transition: "width 0.8s, height 0.8s",
        boxShadow: "0 1.7px 9px #b2dfdb14"
      }}></div>
      <div style={{ color: "#719A8B", fontWeight: 600, fontSize: 17, marginBottom: 6 }}>
        {phase.label}
      </div>
      <div style={{ fontSize: 18, color: "#FFD600", fontWeight: 700 }}>
        {timer}s
      </div>
    </div>
  );
}

/**
 * OfflineDoodlePrompt: Show a random doodle prompt to do on paper (not in-app)
 * PUBLIC_INTERFACE
 */
function OfflineDoodlePrompt() {
  const PROMPTS = [
    "Draw a tree as fast as you can.",
    "Sketch a symbol of calm.",
    "Draw your favorite food.",
    "Doodle your mood right now.",
    "Draw an animal in under 1 minute.",
    "Doodle something that makes you smile.",
    "Draw a tiny mountain range.",
    "Sketch what you see out the window.",
    "Quickly doodle a starry night.",
    "Draw a happy face using only triangles."
  ];
  const [prompt, setPrompt] = useState(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  return (
    <div style={{ textAlign: "center", marginBottom: 5 }}>
      <div style={{
        marginBottom: 12, fontWeight: 500, fontSize: 17, color: "var(--primary, #2E7D32)"
      }}>
        Your Prompt:
      </div>
      <div style={{
        margin: "0 auto",
        fontSize: 16,
        background: "#fffbe8",
        borderRadius: 10,
        border: "1.2px solid #FFD60099",
        color: "#876600",
        maxWidth: 310,
        padding: "9px 13px",
        minHeight: 44
      }}>
        {prompt}
      </div>
      <button
        onClick={() => setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)])}
        style={{
          marginTop: 14,
          background: "none",
          color: "var(--primary, #2E7D32)",
          border: "1.2px solid #FFD600",
          borderRadius: 8,
          fontWeight: 500,
          padding: "8px 16px",
          cursor: "pointer"
        }}
      >New Prompt</button>
      <div style={{
        fontSize: 13.5,
        marginTop: 8,
        color: "#484e43"
      }}>
        Now close your screen and doodle on real paper!
      </div>
    </div>
  );
}

/**
 * GratitudeList: Minimal UI for entering 3 gratitudes. Prompts user to write, not store.
 * PUBLIC_INTERFACE
 */
function GratitudeList() {
  const [lines, setLines] = useState(["", "", ""]);
  const [done, setDone] = useState(false);
  function handleInput(i, v) {
    setLines(ls => [...ls.slice(0, i), v, ...ls.slice(i + 1)]);
  }
  function submit() {
    setDone(true);
    setTimeout(() => setLines(["", "", ""]), 2500);
  }
  return (
    <div style={{ textAlign: "center" }}>
      {!done ? (
        <>
          <div style={{ marginBottom: 9, color: "var(--primary, #2E7D32)", fontWeight: 600 }}>
            Things you're grateful for:
          </div>
          {lines.map((val, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <input
                value={val}
                onChange={e => handleInput(i, e.target.value)}
                placeholder={"#"+(i+1)}
                style={{
                  borderRadius: 7,
                  padding: "7px 11px",
                  fontSize: 15.6,
                  border: "1.1px solid #B2DFDB",
                  width: 175,
                  marginRight: 4
                }}
                spellCheck="false"
              />
            </div>
          ))}
          <button
            style={{
              marginTop: 6,
              background: "var(--primary, #2E7D32)",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "7px 18px",
              fontWeight: 600,
              fontSize: 15,
              opacity: lines.some(l => !l) ? 0.55 : 1,
              cursor: lines.some(l => !l) ? "not-allowed" : "pointer"
            }}
            onClick={submit}
            disabled={lines.some(l => !l)}
          >Submit</button>
        </>
      ) : (
        <div style={{ color: "var(--accent, #FFD600)", fontWeight: 500 }}>
          Great! Remember these often.<br />Try saying them out loud.
        </div>
      )}
    </div>
  );
}

/**
 * BodyScanMinute: Stepwise text for a quick body scan mindfulness break (not a game!).
 * PUBLIC_INTERFACE
 */
function BodyScanMinute() {
  const STEPS = [
    "Close your eyes. Focus on your breath for a few seconds.",
    "Bring attention to your feet. Feel any sensation.",
    "Slowly move awareness to your legs and hips.",
    "Notice your hands and arms—relax your shoulders.",
    "Scan your chest and back. Breathe here.",
    "Notice your neck, jaw, face—relax.",
    "Take two slow breaths.",
    "Body scan complete! Open your eyes slowly."
  ];
  const [step, setStep] = useState(0);
  React.useEffect(() => {
    if (step === 0 || step >= STEPS.length) return;
    const t = setTimeout(() => setStep(s => s + 1), 2200 + step * 75);
    return () => clearTimeout(t);
  }, [step]);
  if (step === 0)
    return (
      <div style={{ textAlign: "center" }}>
        <div>Ready to check in with your body?</div>
        <button style={{
          background: "var(--primary, #2E7D32)",
          color: "#fff",
          border: "none",
          borderRadius: 7,
          padding: "8px 20px",
          fontWeight: 600
        }} onClick={() => setStep(1)}>Start</button>
      </div>
    );
  if (step >= STEPS.length)
    return (
      <div style={{
        textAlign: "center",
        color: "var(--primary, #2E7D32)",
        fontWeight: 600
      }}>
        Done! Notice how your body feels.<br />
        Time to get up, stretch, and enjoy the real world!
      </div>
    );
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        minHeight: 44,
        marginBottom: 11,
        color: "#789262",
        fontSize: 15,
        fontWeight: 500
      }}>
        {STEPS[step - 1]}
      </div>
      <button
        onClick={() => setStep(step + 1)}
        style={{
          background: "var(--accent, #FFD600)",
          color: "#2E7D32",
          border: "none",
          borderRadius: 8,
          padding: "7px 18px",
          fontWeight: 600,
          marginTop: 4,
          fontSize: 15
        }}
      >Next</button>
    </div>
  );
}

/**
 * NatureScavenger: Show a suggestion to find/take a picture of something natural nearby, but instruct user to do it offline.
 * PUBLIC_INTERFACE
 */
function NatureScavenger() {
  const TASKS = [
    "Find a plant or tree with an unusual leaf shape.",
    "Spot a bird or insect—observe it for one minute.",
    "Notice three different shades of green in nature.",
    "Find a rock or stone and see if it’s warm or cool.",
    "Look for a flower in your area and describe it to yourself.",
    "Take an offline photo of something inspiring outdoors.",
    "Walk outside and listen for different bird sounds.",
    "Find sunlight or a shadow—pause and notice the feeling."
  ];
  const [idx, setIdx] = useState(Math.floor(Math.random() * TASKS.length));
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        color: "var(--primary, #2E7D32)",
        fontWeight: 600,
        marginBottom: 11
      }}>
        Mindful Nature Task:
      </div>
      <div style={{
        margin: "0 auto",
        background: "#FDF8E7",
        border: "1.2px solid #FFD60066",
        borderRadius: 9,
        color: "#ab9425",
        fontSize: 15.4,
        padding: "10px 12px",
        minHeight: 38,
        maxWidth: 290
      }}>
        {TASKS[idx]}
      </div>
      <button
        style={{
          marginTop: 13,
          background: "none",
          color: "var(--primary, #2E7D32)",
          border: "1.3px solid #B2DFDB",
          borderRadius: 7,
          padding: "7px 18px",
          fontWeight: 500,
          fontSize: 14,
          cursor: "pointer"
        }}
        onClick={() => setIdx(i => (i + 1) % TASKS.length)}
      >New Task</button>
      <div style={{
        fontSize: 13.5,
        marginTop: 7,
        color: "#69806e"
      }}>
        Go do this offline, then check back later!
      </div>
    </div>
  );
}

export default MiniDetoxGames;
