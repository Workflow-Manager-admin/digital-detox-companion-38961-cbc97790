import React, { useState } from "react";

/**
 * BuddySystemPage - Find & manage accountability buddy; track streaks.
 * @param {object} props
 * @param {function} [props.showToast] - Optional, for toast feedback.
 */
// PUBLIC_INTERFACE
function BuddySystemPage({ showToast }) {
  // Example buddy state
  const [hasBuddy, setHasBuddy] = useState(false);
  const [buddy, setBuddy] = useState({ name: "MysterySloth42", streak: 5 });
  const [pending, setPending] = useState(false);

  // Playful mascot
  const mascot = "🦦";

  const handleRequestBuddy = () => {
    setPending(true);
    if (showToast) showToast("⏳ Looking for a buddy…", "info");
    setTimeout(() => {
      setHasBuddy(true);
      setPending(false);
      if (showToast) showToast("🤝 Buddy paired! Say hi to MysterySloth42!", "success");
    }, 1300);
  };

  const handleCheer = () => {
    if (showToast)
      showToast("👏 You cheered your buddy!", "success");
  };

  return (
    <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "center", paddingTop: 30 }}>
      <div style={{ fontSize: 49 }}>{mascot}</div>
      <h2 style={{ margin: "15px 0 9px", fontWeight: 700 }}>
        Accountability Buddy
      </h2>
      {!hasBuddy && !pending && (
        <div>
          <p style={{ color: "#789262", fontSize:16 }}>
            Pair up with a mystery user to boost your detox streaks!
          </p>
          <button className="btn btn-large"
            style={{
              marginTop: 18,
              background: "#2E7D32",
              color: "#fff",
              fontWeight: 600,
              fontSize: 18,
              padding: "13px 30px",
              borderRadius: 15,
              border: "none",
              cursor: "pointer"
            }}
            onClick={handleRequestBuddy}
            tabIndex={0}
          >
            Find me a Buddy!
          </button>
        </div>
      )}
      {pending && (
        <div style={{ color: "#2E7D32", marginTop: 22 }}>
          <span>🔎 Pairing…</span>
        </div>
      )}
      {hasBuddy && (
        <>
          <div style={{
            background: "#B2DFDB10",
            borderRadius: 16,
            padding: "20px 12px",
            margin: "18px auto 0",
            boxShadow: "0 2px 10px rgba(44,127,67,0.02)"
          }}>
            <div style={{ fontWeight: 600, color: "#2E7D32", fontSize:18 }}>
              {buddy.name}
            </div>
            <div style={{
              color: "#A0BFA2",
              fontSize: 13,
              margin: "6px 0 3px"
            }}>
              Detox streak: <strong>{buddy.streak}</strong> days
            </div>
            <button
              className="btn"
              style={{
                background: "#FFD600",
                color: "#1A1A1A",
                marginTop: 11,
                fontWeight: 600,
                padding: "7px 22px",
                borderRadius: 9,
                border: "none",
                cursor: "pointer"
              }}
              onClick={handleCheer}
              tabIndex={0}
            >
              Send Cheer 🎉
            </button>
          </div>
          <p style={{ paddingTop: 13, color: "#789262" }}>
            Encourage each other—every day longer, together!
          </p>
        </>
      )}
    </div>
  );
}

export default BuddySystemPage;
