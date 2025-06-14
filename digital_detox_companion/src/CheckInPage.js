import React, { useState } from "react";

/**
 * CheckInPage - Off-Grid Check-In
 * Minimal playful UI to log screen-free activities for check-in and streaks.
 * @param {function} showToast - Function to display toast notifications.
 */
// PUBLIC_INTERFACE
function CheckInPage({ showToast }) {
  // Track check-in state (basic simulation)
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [streak, setStreak] = useState(4); // Example streak

  const checkInFeedback = [
    "Nice! Enjoy real life a bit more. ✨",
    "Another off-grid moment: unlocked! 🌲",
    "You're building a healthy habit. 💚",
    "More nature, less notifications. 🦋",
    "Screen time down, joy up! 📉➡️😁",
  ];

  // Fake "grid locations/activities" for playful check-in options
  const activities = [
    "Go for a walk",
    "Read a book",
    "Cook/try a new recipe",
    "Hang out with a friend",
    "Try a new hobby",
  ];
  const [selected, setSelected] = useState(null);

  // Playful check-in logic
  const handleCheckIn = () => {
    setCheckedInToday(true);
    setStreak((prev) => prev + 1);
    showToast &&
      showToast(
        checkInFeedback[Math.floor(Math.random() * checkInFeedback.length)],
        "success"
      );
  };

  return (
    <div style={{ marginTop: 18 }}>
      <h2 style={{ color: "#2E7D32", fontWeight: 600 }}>Off-Grid Check-In</h2>
      <div
        style={{
          background: "#E7F6EC",
          borderRadius: 14,
          border: "1.5px solid #B2DFDB",
          padding: 20,
          marginBottom: 15,
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 4 }}>
          Consecutive Screen-Free Days:{" "}
          <span style={{ color: "#FFD600" }}>{streak}</span>
        </div>
        <div style={{ color: "#789262", fontSize: 15 }}>
          Log your favorite offline activity below to add to your streak!
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 10,
          justifyContent: "center",
        }}
      >
        {activities.map((act, idx) => (
          <button
            key={act}
            onClick={() => setSelected(idx)}
            className="btn"
            style={{
              background: selected === idx ? "#FFD600" : "#F2F6F5",
              color: "#2E7D32",
              border:
                selected === idx
                  ? "2px solid #FFD600"
                  : "1.5px solid #B2DFDB",
              fontWeight: 500,
              fontSize: 14,
              padding: "8px 16px",
              borderRadius: 7,
              cursor: "pointer",
              opacity: checkedInToday ? 0.7 : 1,
            }}
            disabled={checkedInToday}
          >
            {act}
          </button>
        ))}
      </div>
      <button
        className="btn"
        style={{
          background: checkedInToday ? "#B2DFDB" : "#2E7D32",
          color: checkedInToday ? "#2E7D32" : "#FFD600",
          border: checkedInToday
            ? "1.5px solid #B2DFDB"
            : "2px solid #FFD600",
          fontWeight: 700,
          fontSize: "1.04rem",
          padding: "12px 30px",
          borderRadius: 10,
          marginTop: 12,
          cursor: checkedInToday ? "not-allowed" : "pointer",
          boxShadow: "0 2px 10px rgba(45,127,49,0.07)",
        }}
        onClick={handleCheckIn}
        disabled={checkedInToday || selected == null}
      >
        {checkedInToday ? "Checked in for today!" : "Confirm Check-In"}
      </button>
      <div style={{ marginTop: 22, color: "#789262", fontSize: 15 }}>
        "Off-grid" means away from screens—enjoy your time! 🌳
      </div>
    </div>
  );
}

export default CheckInPage;
