import React from "react";

/**
 * Dashboard/Home page for Digital Detox Companion.
 * Shows primary description, user progress, and quick entry points to core features.
 */
// PUBLIC_INTERFACE
function Dashboard() {
  return (
    <div style={{ padding: "46px 0 12px 0" }}>
      <h1
        className="title"
        style={{
          color: "#2E7D32",
          fontWeight: 700,
          fontSize: 34,
          marginBottom: 10,
          letterSpacing: 0.001,
        }}
      >
        Welcome to Digital Detox Companion
      </h1>
      <div
        className="description"
        style={{
          margin: "22px 0 28px 0",
          color: "#354e38",
          fontSize: 20,
          fontWeight: 400,
          maxWidth: 690,
          lineHeight: 1.7,
          letterSpacing: 0.01,
        }}
      >
        Digital Detox Companion empowers you to reclaim your time and reconnect—both with yourself and the world around you. Our holistic app helps you build lasting digital habits through tailored detox plans, real-world milestone rewards, and a supportive buddy system. Experience the joy of meaningful offline moments while growing a healthier, more mindful relationship with technology.
      </div>

      {/* Example feature highlights */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 30, marginTop: 22 }}>
        <FeatureCard
          icon="🗺️"
          title="Personalized Detox Plans"
          description="Step-by-step plans tailored to your lifestyle and digital goals."
        />
        <FeatureCard
          icon="🤝"
          title="Accountability Buddy"
          description="Pair anonymously for encouragement, check-ins, and shared milestones."
        />
        <FeatureCard
          icon="🎁"
          title="Real-World Rewards"
          description="Celebrate your milestones with experiences and perks that matter."
        />
        <FeatureCard
          icon="📖"
          title="AI Reflection Journal"
          description="Thoughtful prompts help you reflect, grow, and sustain new habits."
        />
        <FeatureCard
          icon="🌱"
          title="Offline Connection"
          description="Tools to help you rediscover fulfillment beyond the screen."
        />
      </div>
    </div>
  );
}

/**
 * Feature highlight card for main dashboard
 */
// PUBLIC_INTERFACE
function FeatureCard({ icon, title, description }) {
  return (
    <div
      style={{
        minWidth: 210,
        maxWidth: 235,
        flex: "1 1 210px",
        background: "#f4faf6",
        border: "1px solid #e4eae1",
        borderRadius: 14,
        padding: "22px 20px 18px 20px",
        boxShadow: "0 0.5px 10px rgba(44,127,67,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: 12,
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
      <div
        style={{
          fontWeight: 600,
          color: "#24652c",
          marginBottom: 5,
          fontSize: 18.5,
        }}
      >
        {title}
      </div>
      <div style={{ color: "#54754a", fontSize: 15.1, lineHeight: 1.6 }}>
        {description}
      </div>
    </div>
  );
}

export default Dashboard;
