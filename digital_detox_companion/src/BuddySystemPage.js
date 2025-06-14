import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * BuddySystemPage - Anonymous accountability buddy system
 * Light, minimal interaction. Playful feedback.
 * @param {function} showToast - optional toast feedback
 */
function BuddySystemPage({ showToast }) {
  const [paired, setPaired] = useState(false);
  const [buddy, setBuddy] = useState(null);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([
    {
      from: "Buddy", time: "Today", text: "Let’s see if we can both avoid TikTok until dinner! 💪"
    }
  ]);
  const buddyNames = ["EcoFox83", "SunLion", "PixelOtter", "WanderSnail", "CraftyPuffin"];
  
  // Fake pairing
  const handlePair = () => {
    const b = buddyNames[Math.floor(Math.random() * buddyNames.length)];
    setBuddy(b);
    setPaired(true);
    showToast && showToast(`🙌 You have been paired with "${b}"!`, "info");
  };
  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setHistory([
      ...history,
      { from: "Me", time: "Now", text: message }
    ]);
    showToast && showToast("😀 Message sent to your buddy!", "success");
    setMessage("");
  };

  return (
    <div style={{
      background: "#fafcfb",
      borderRadius: 13,
      boxShadow: "0 2px 14px #e7f6ec60,0 1px 0 #fff2",
      padding: 24, maxWidth: 520, margin: "18px auto"
    }}>
      <h2 style={{ color: "#2E7D32", marginBottom: 10, fontWeight: 700 }}>Accountability Buddy 🤝</h2>
      {!paired ? (
        <div style={{ marginBottom: 18 }}>
          <div style={{ color: "#789262", fontSize: 16, marginBottom: 16 }}>
            Pair with an anonymous buddy for extra motivation.<br/>
            <span style={{ color: "#FFD600" }}>No names, just encouragement!</span>
          </div>
          <button
            onClick={handlePair}
            className="btn"
            style={{
              background: "#2E7D32", color: "white",
              border: "none", borderRadius: 6, padding: "12px 22px",
              fontWeight: 600, fontSize: 16, cursor: "pointer"
            }}
          >
            Find me a Buddy!
          </button>
        </div>
      ) : (
        <>
          <div style={{ color: "#3F6140", marginBottom: 12 }}>
            Your buddy: <b>{buddy} 🧡</b>
          </div>
          <div style={{
            background: "#f5ffe7",
            border: "1px solid #e7f6ec", borderRadius: 8,
            padding: 14, marginBottom: 10,
            minHeight: 52, fontSize: 15
          }}>
            <div style={{ fontSize: 13, color: "#8da98a", marginBottom: 6 }}>
              Recent check-ins:
            </div>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {history.slice(-3).map((h, i) => (
                <li key={i} style={{marginBottom:2, color: h.from==="Me"? "#2e8d38": "#789262"}}>
                  <span style={{ fontWeight: h.from === "Me" ? 600 : 400 }}>
                    {h.from === "Me" ? "You" : buddy}
                  </span>: {h.text}
                </li>
              ))}
            </ul>
          </div>
          <form style={{ display: "flex", gap: 5 }} onSubmit={handleSend}>
            <input
              type="text"
              value={message}
              onChange={e=>setMessage(e.target.value)}
              maxLength={80}
              placeholder="Send your buddy a cheer..."
              style={{
                flex: 1,
                border: "1px solid #b2dfdb",
                borderRadius: 6,
                padding: "8px 11px", fontSize: 15
              }}
            />
            <button
              type="submit"
              className="btn"
              style={{
                background: "#FFD600", color: "#222",
                border: "none", fontWeight: 600, borderRadius: 6,
                padding: "8px 16px", fontSize: 15, cursor: "pointer"
              }}
            >
              Send
            </button>
          </form>
          <div style={{marginTop:8, color: "#FFD600", fontWeight: 500,fontSize:15}}>
            Boost your buddy, boost yourself! 🚀
          </div>
        </>
      )}
    </div>
  );
}

export default BuddySystemPage;
