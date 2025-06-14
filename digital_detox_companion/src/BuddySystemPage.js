import React from "react";
import BuddyStreakSystem from "./BuddyStreakSystem";

// PUBLIC_INTERFACE
export default function BuddySystemPage() {
  const COLORS = {
    primary: "#2E7D32",
    accent: "#FFD600",
    secondary: "#B2DFDB"
  };
  const paired = true;
  const buddy = { id: "anonbuddy14", status: "active", streak: 4 };

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ color: COLORS.primary, fontSize: '2.1rem', marginBottom: 7 }}>
        Accountability Buddy
      </h2>
      {paired ? (
        <>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            background: "#EFFBFC",
            padding: "18px 18px 15px",
            borderRadius: 14,
            marginBottom: 16
          }}>
            <span style={{
              fontSize: 36,
              color: COLORS.primary,
              marginRight: 9
            }}>
              🤝
            </span>
            <div>
              <div style={{ color: COLORS.primary, fontWeight: 600, fontSize: "1.1rem" }}>
                Paired with: {buddy.id} &bull; <span style={{ fontWeight: 400, color: "#7a8875" }}>anonymous</span>
              </div>
              <div style={{ color: "#82B571", fontWeight: 500, fontSize: "1.06rem" }}>
                Streak: {buddy.streak} days
              </div>
            </div>
          </div>
          <BuddyStreakSystem
            streakDays={buddy.streak}
            buddyName={buddy.id}
            buddyStatus={buddy.status}
            showBuddy={true}
            onBreakReflection={(reflection) => {
              alert("Reflection sent to buddy!\n\n" + reflection);
            }}
          />
          <BuddyMessagePane />
        </>
      ) : (
        <div>
          <div style={{
            padding: 18,
            background: "#f8fbe9",
            borderRadius: 12,
            color: COLORS.primary,
            marginBottom: 10
          }}>
            You are currently not paired.<br />
            <button
              style={{
                marginTop: 8,
                padding: "9px 20px",
                borderRadius: 5,
                background: COLORS.primary,
                color: "white",
                border: "none",
                fontWeight: 500,
                cursor: "pointer"
              }}
              onClick={() => null}
            >
              Find Buddy
            </button>
          </div>
          <p style={{ color: "#787e7a" }}>
            Pairing is anonymous for focused support!
          </p>
        </div>
      )}
    </section>
  );
}

// Simulated buddy chat pane
function BuddyMessagePane() {
  const COLORS = {
    primary: "#2E7D32",
    accent: "#FFD600",
  };
  const lastMessage = {
    fromBuddy: true,
    time: "2h ago",
    text: "How did your check-in go today? Stay strong! 💪"
  };
  return (
    <div style={{
      padding: "18px 20px",
      background: "#fff",
      border: "1px solid #E0EFE4",
      borderRadius: 9,
      marginBottom: 8,
      minHeight: 50
    }}>
      <div style={{
        marginBottom: 8,
        color: "#A1ACAE",
        fontSize: 13
      }}>
        Latest from your buddy:
      </div>
      <div style={{ color: COLORS.primary, fontWeight: 500, fontSize: "1.04rem" }}>
        "{lastMessage.text}"
      </div>
      <div style={{ textAlign: "right", color: "#9abcb9", fontSize: 11 }}>
        {lastMessage.time}
      </div>
      <button
        style={{
          marginTop: 10,
          background: COLORS.accent,
          color: "#313619",
          border: "none",
          borderRadius: 5,
          padding: "7px 22px",
          fontWeight: 500,
          fontSize: 15,
          cursor: "pointer"
        }}
        onClick={() => alert("Message your buddy! (Demo only)")}
      >
        Send Encouragement
      </button>
    </div>
  );
}
