import React, { useState } from "react";

/**
 * BuddySystemPage - Accountability Buddy System
 * Minimal and playful UI for buddy pairing and encouragement.
 * @param {function} showToast - Function to display toast messages.
 */
// PUBLIC_INTERFACE
function BuddySystemPage({ showToast }) {
  // For simplicity, use mock buddy names and check-in states
  const [buddy, setBuddy] = useState({
    name: "AnonymousBear",
    checkedIn: false,
    streak: 5,
    encouragement: [
      "You got this! 🐻",
      "Keep each other accountable! 🤩",
      "Stay strong together! 💪",
      "Screen free = team win! 🌟"
    ]
  });
  const [youCheckedIn, setYouCheckedIn] = useState(false);

  // Simulate a playful check-in
  const handleCheckIn = () => {
    setYouCheckedIn(true);
    showToast &&
      showToast(
        "You checked in! Your buddy will be notified 🎈",
        "success"
      );
  };

  // Simulate pairing with a new buddy
  const handleSwitchBuddy = () => {
    setBuddy({
      name: "KindRedPanda",
      checkedIn: false,
      streak: Math.floor(Math.random() * 10 + 1),
      encouragement: [
        "Going strong, Panda buddy! 🐼",
        "New streak, new beginnings! 🚀",
        "Stay detoxed, stay wild! 🌱",
        "One day at a time! 🍃"
      ]
    });
    setYouCheckedIn(false);
    showToast &&
      showToast("You switched to a new buddy for a fresh start!", "info");
  };

  return (
    <div style={{ marginTop: 18 }}>
      <h2 style={{ color: "#2E7D32", fontWeight: 600 }}>Accountability Buddy</h2>
      <div
        style={{
          background: "#B2DFDB",
          borderRadius: 16,
          padding: 18,
          margin: "18px 0",
          boxShadow: "0 1px 4px rgba(30,77,63,0.09)",
          border: "1px solid #B2DFDB",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
          Your buddy is: <span style={{ color: "#FFD600" }}>{buddy.name}</span>
        </div>
        <div style={{ color: "#1A1A1A", marginBottom: 6 }}>
          <span role="img" aria-label="fire">🔥</span> Current streak:{" "}
          <span style={{ fontWeight: "bold" }}>{buddy.streak} days</span>
        </div>
        <div style={{ color: "#356c3d", fontSize: 15, marginBottom: 0 }}>
          {
            buddy.encouragement[
              Math.floor(Math.random() * buddy.encouragement.length)
            ]
          }
        </div>
      </div>
      <button
        className="btn"
        style={{
          background: youCheckedIn ? "#DADADA" : "#FFD600",
          color: "#2E7D32",
          padding: "11px 25px",
          fontWeight: 600,
          border: "none",
          borderRadius: 8,
          fontSize: "1rem",
          cursor: youCheckedIn ? "default" : "pointer",
          marginBottom: 9,
          width: "auto",
          boxShadow: "0 1px 10px rgba(240,186,71,0.07)"
        }}
        disabled={youCheckedIn}
        onClick={handleCheckIn}
      >
        {youCheckedIn ? "Checked In Today!" : "Check In With Buddy"}
      </button>
      <br />
      <button
        className="btn"
        style={{
          background: "#F2F6F5",
          color: "#2E7D32",
          border: "1.5px solid #FFD600",
          borderRadius: 8,
          fontWeight: 500,
          fontSize: 15,
          padding: "7px 18px",
          cursor: "pointer",
        }}
        onClick={handleSwitchBuddy}
      >
        Switch Buddy
      </button>
      <div style={{ marginTop: 19, color: "#789262", fontSize: 14 }}>
        Pairing is anonymous. Be kind and stay positive! ✨
      </div>
    </div>
  );
}

export default BuddySystemPage;
