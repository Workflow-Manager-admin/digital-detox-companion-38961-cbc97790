import React from "react";
const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  bg: "#fff",
  text: "#1A1A1A",
};

// PUBLIC_INTERFACE
export default function CheckInPage() {
  const checkinHistory = [
    { id: 1, text: "Nature walk (Central Park)", date: "Yesterday", icon: "🌳" },
    { id: 2, text: "Offline dinner with friends", date: "2 days ago", icon: "🍽️" }
  ];

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ color: COLORS.primary, fontSize: "2.1rem", marginBottom: 7 }}>
        Off-Grid Check-In
      </h2>
      <div style={{
        padding: "19px 24px 14px",
        background: "#EFFBFC",
        borderRadius: 12,
        marginBottom: 16,
        color: "#20502C"
      }}>
        Log an offline activity to boost your progress!
      </div>
      <button
        style={{
          background: COLORS.primary,
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "10px 24px",
          fontWeight: 500,
          fontSize: 16,
          marginBottom: 18,
          cursor: "pointer"
        }}
        onClick={() =>
          alert("Demo: Check-in! In a full app, log activities here.")
        }
      >
        New Check-In
      </button>
      <div style={{ marginTop: 8 }}>
        <div style={{
          color: COLORS.primary,
          marginBottom: 7,
          fontWeight: 500
        }}>
          Recent Check-Ins
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {checkinHistory.map((c) => (
            <li key={c.id} style={{
              marginBottom: 11,
              padding: "10px 18px",
              background: "#fff",
              borderRadius: 9,
              border: "1px solid #cbe0d2",
              color: "#426046",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 13,
              fontSize: 15
            }}>
              <span style={{ fontSize: 19 }}>{c.icon}</span>
              <span>{c.text}</span>
              <span style={{ marginLeft: "auto", color: "#B3B5A9", fontWeight: 400, fontSize: 14 }}>
                {c.date}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{
        marginTop: 22,
        color: "#9AADA6",
        fontSize: 14
      }}>
        More check-ins, more progress!
      </div>
    </section>
  );
}
