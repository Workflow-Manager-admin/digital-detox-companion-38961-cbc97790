import React from "react";

// PUBLIC_INTERFACE
function Dashboard() {
  return (
    <div className="dashboard" style={{ paddingTop: 42, paddingBottom: 30 }}>
      <h1 className="title" style={{ color: "#2E7D32", fontWeight: 700 }}>
        Welcome to Digital Detox Companion
      </h1>
      <p className="description" style={{ fontSize: 18, color: "#264D2C", marginTop: 14, marginBottom: 38, maxWidth: 650 }}>
        Digital Detox Companion is your mission-driven guide to breaking free from social media overload and rediscovering real life.<br /><br />
        <strong>What we do:</strong> We empower you with personalized detox plans, anonymous accountability buddy pairing, and trackable real-world check-ins. Progress isn’t just tracked—it’s celebrated with meaningful, real-life rewards for every milestone achieved.<br /><br />
        <strong>Why it matters:</strong> Our app is built for anyone who wants to regain focus, restore authentic connections, and reclaim their well-being from the grip of endless feeds. AI-powered journaling supports every step, promoting self-reflection and lifelong healthy digital habits.<br /><br />
        <strong>Join the movement!</strong> Experience less stress, more purpose, and truer connections—both with others and yourself. Step beyond the screen and rediscover the world waiting for you. Your journey to a brighter, more mindful future starts today!
      </p>
      <section style={{ marginBottom: 38 }}>
        <ul style={{ color: "#20542D", fontSize: 16, lineHeight: "1.9", margin: 0, padding: "0 0 0 22px", maxWidth: 620 }}>
          <li>Personalized detox plans tailored to your real habits and goals</li>
          <li>Accountability Buddy: anonymous pairings for ongoing support</li>
          <li>Off-grid, real-world check-ins to reinforce true experiences</li>
          <li>Earn real milestone rewards for achievements, not just badges</li>
          <li>Reflect with AI-powered prompts and track positive change in your journal</li>
        </ul>
      </section>
      <div style={{ margin: "24px 0", color: "#789262" }}>
        <em>Ready to rediscover life beyond the feed? Start your digital wellness journey now!</em>
      </div>
    </div>
  );
}

export default Dashboard;
