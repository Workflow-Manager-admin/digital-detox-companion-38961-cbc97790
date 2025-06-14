import React from "react";

// PUBLIC_INTERFACE
function Dashboard() {
  return (
    <div
      style={{
        padding: "40px 0 0 0",
        textAlign: "center",
        color: "#20542d",
        minHeight: 360,
      }}
    >
      <h1 style={{ fontSize: 37, fontWeight: 700 }}>
        Welcome to Digital Detox Companion
      </h1>
      <p
        className="description"
        style={{
          color: "#47653B",
          fontSize: 18,
          maxWidth: 530,
          margin: "16px auto 34px",
          lineHeight: 1.6,
        }}
      >
        Digital Detox Companion empowers you to reclaim your time and attention, break free from screen overuse,
        and rediscover vibrant, meaningful experiences beyond the device.
        With personal plans, real accountability, tangible rewards, and a supportive community,
        unlock a life where technology serves you—not the other way around!
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          margin: "24px auto",
          flexWrap: "wrap",
          maxWidth: 850,
        }}
      >
        {/* Example App Highlights */}
        <Highlight
          emoji="🗺️"
          title="Personalized Detox Plans"
          body="Custom plans guide you step-by-step to develop healthier device habits that fit your goals and lifestyle."
        />
        <Highlight
          emoji="🤝"
          title="Accountability Buddy System"
          body="Pair with an anonymous peer for genuine support, check-ins, and encouragement throughout your journey."
        />
        <Highlight
          emoji="🎁"
          title="Real-World Rewards"
          body="Earn tangible rewards for meaningful milestones—because living offline has real life benefits!"
        />
        <Highlight
          emoji="🫂"
          title="Supportive Community"
          body="Join circles, share progress, and celebrate each other in a healthy, positive environment."
        />
      </div>
    </div>
  );
}

// Simple stateless info card
function Highlight({ emoji, title, body }) {
  return (
    <div
      style={{
        background: "#F6FBF7",
        border: "1px solid #E7F6EC",
        boxShadow: "0 4px 18px rgba(44,127,67,0.05)",
        borderRadius: 16,
        padding: "20px 22px",
        margin: "0 0 18px 0",
        minWidth: 185,
        maxWidth: 220,
        flex: "1 1 185px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 34, marginBottom: 7 }}>{emoji}</div>
      <div style={{ fontWeight: 700, fontSize: 17 }}>{title}</div>
      <div style={{ color: "#638267", fontSize: 15, marginTop: 7 }}>{body}</div>
    </div>
  );
}

export default Dashboard;
