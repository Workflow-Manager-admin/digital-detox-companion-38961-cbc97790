import React, { useState } from "react";

// Real life activity samples
const ACTIVITIES = [
  { name: "Walked outside", icon: "🚶" },
  { name: "Read a book", icon: "📖" },
  { name: "Met a friend IRL", icon: "🤗" },
  { name: "Played a board game", icon: "🎲" },
  { name: "Did something creative", icon: "🎨" },
  { name: "Chilled with no phone", icon: "🌳" }
];

// PUBLIC_INTERFACE
/**
 * CheckInPage - Off-grid check-ins for real-world progress
 * Playful, light feedback for small wins. Minimal UI.
 * @param {function} showToast - for visible encouragement
 */
function CheckInPage({ showToast }) {
  const [checkedIn, setCheckedIn] = useState(false);
  const [activity, setActivity] = useState("");
  const [log, setLog] = useState([]);

  const handleCheckIn = (act) => {
    setActivity(act.name);
    setLog([...log, { ...act, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setCheckedIn(true);
    showToast && showToast(`🌞 Checked in: ${act.name}! Mindful time FTW.`, "success");
    setTimeout(() => setCheckedIn(false), 2500);
  };

  return (
    <div style={{
      background: "#fafcfb",
      borderRadius: 13,
      boxShadow: "0 2px 14px #e7f6ec60,0 1px 0 #fff2",
      padding: 24, maxWidth: 520, margin: "18px auto"
    }}>
      <h2 style={{ color: "#2E7D32", marginBottom: 10, fontWeight: 700 }}>Check-In ✅</h2>
      <div style={{ color: "#3F6140", marginBottom: 16 }}>
        Where did you spend time <b>away from your screen</b> today?<br />
        Pick one:
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
        {ACTIVITIES.map((act, i) => (
          <button
            key={i}
            className="btn"
            style={{
              background: "#b2dfdb",
              color: "#1A1A1A",
              border: "none",
              borderRadius: 7,
              padding: "13px 15px",
              fontWeight: 600,
              fontSize: 17,
              cursor: "pointer",
              flex: "1 1 44%",
              minWidth: 140,
              boxShadow: "0 2px 8px #b2dfdb22"
            }}
            onClick={() => handleCheckIn(act)}
            disabled={checkedIn}
          >
            <span style={{ fontSize: 21, marginRight: 8 }}>{act.icon}</span> {act.name}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 16, color: "#FFD600", fontWeight: 500, fontSize: 15, minHeight: 22 }}>
        {checkedIn
          ? `🎉 Awesome! You made time for "${activity}".`
          : "Check in once a day for best results!"}
      </div>
      {log.length > 0 && (
        <div style={{ marginTop: 18, color: "#4F6140" }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 5 }}>Previous Check-Ins:</div>
          <ul style={{listStyle:'none',margin:0,padding:0 }}>
            {log.slice(-3).reverse().map((e, idx) => (
              <li key={idx} style={{marginBottom:2}}><span style={{fontSize:18}}>{e.icon}</span> {e.name} <span style={{fontSize:12,color:"#b2dfdb"}}>at {e.time}</span></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CheckInPage;
