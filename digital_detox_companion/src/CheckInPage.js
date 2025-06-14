import React, { useState } from "react";

/**
 * CheckInPage - Off-Grid Real-World Check-In.
 * @param {object} props
 * @param {function} [props.showToast] - Optional, for toast feedback.
 */
// PUBLIC_INTERFACE
function CheckInPage({ showToast }) {
  // Example: Track if we've checked in today.
  const [checkedIn, setCheckedIn] = useState(false);
  const [activity, setActivity] = useState("");

  // Playful mascot
  const mascot = "🌲";

  // Handler: check in
  const handleCheckIn = () => {
    setCheckedIn(true);
    if (showToast) showToast("✅ Checked in to real life!", "success");
  };

  return (
    <div style={{
      maxWidth: 370,
      margin: "0 auto",
      textAlign: "center",
      paddingTop: 34
    }}>
      <div style={{ fontSize: 56 }}>{mascot}</div>
      <h2 style={{ fontWeight: 700, margin: "16px 0 10px" }}>
        Off-Grid Check-In
      </h2>
      <p style={{ color: "#789262" }}>
        Log a real-world activity and claim your “off-screen” badge!
      </p>
      {!checkedIn ? (
        <form style={{marginTop:19}}
          onSubmit={e => {
            e.preventDefault();
            handleCheckIn();
          }}>
          <input
            type="text"
            placeholder="Describe your real-life activity..."
            value={activity}
            required
            maxLength={64}
            onChange={e => setActivity(e.target.value)}
            style={{
              padding: "10px 13px",
              fontSize: 15,
              borderRadius: 7,
              border: "1px solid #CDE5C7",
              marginBottom: 13,
              width: "100%",
              outline: "none"
            }}
            tabIndex={0}
          />
          <button
            className="btn btn-large"
            style={{
              background: "#2E7D32",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              padding: "11px 29px",
              borderRadius: 13,
              border: "none",
              cursor: "pointer"
            }}
            type="submit"
            tabIndex={0}
          >
            Check In!
          </button>
        </form>
      ) : (
        <div style={{
          color: "#2E7D32",
          fontWeight: 600,
          fontSize: 18,
          marginTop: 23
        }}>
          🎉 Great job! Today’s check-in: <br />
          <span style={{color:"#1A1A1A", fontWeight:500, fontSize:16}}>{activity}</span>
        </div>
      )}
    </div>
  );
}

export default CheckInPage;
