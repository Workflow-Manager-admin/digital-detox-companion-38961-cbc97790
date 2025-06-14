import React from "react";

/**
 * DASHBOARD / HOME PAGE FOR DIGITAL DETOX COMPANION
 * Welcomes user, explains app mission and features, shows progress summary.
 */
// PUBLIC_INTERFACE
function Dashboard() {
  return (
    <div className="dashboard-home" style={{ padding: "38px 0 24px", textAlign: "center" }}>
      <h1 style={{ color: "#2E7D32", fontSize: 36, marginBottom: 10, fontWeight: 700, letterSpacing: 0.02 }}>
        Welcome to Digital Detox Companion
      </h1>
      <p className="description" style={{ marginTop: 10, color: "#56685b", fontSize: 17, maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
        <strong>Discover life beyond the screen!</strong> Digital Detox Companion empowers you to reclaim your time, wellbeing, and personal growth by guiding you to healthier digital habits—every single day.
        <br /><br />
        Our mission is to make disconnecting from endless scrolling both rewarding and achievable. Through science-backed detox plans, uplifting real-world rewards, and anonymous buddy support, we provide the tools and community you need to break free from tech overstimulation. This app is designed for purposeful, brief check-ins—so you can spend more meaningful moments offline, building real connections, clarity, and a balanced life. 
        <br /><br />
        <em>Digital Detox Companion isn’t just another wellness app; it’s your catalyst for lasting change in a digital world that never sleeps.</em>
      </p>
      {/* Progress, key features, or motivational quick tips (add if needed in future) */}
      <div style={{ marginTop: 46 }}>
        <h2 style={{ color: "#20542d", fontSize: 23, fontWeight: 600 }}>How It Works</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: "25px auto 8px", maxWidth: 540, color: "#435347", fontSize: 16, textAlign: "left" }}>
          <li style={{ marginBottom: 16 }}>
            <span role="img" aria-label="plan" style={{ marginRight: 7 }}>🗺️</span>
            <strong>Personalized Detox Plans:</strong> Step-by-step guidance tailored to your digital habits.
          </li>
          <li style={{ marginBottom: 16 }}>
            <span role="img" aria-label="buddy" style={{ marginRight: 7 }}>🤝</span>
            <strong>Accountability Buddy System:</strong> Stay motivated with anonymous support.
          </li>
          <li style={{ marginBottom: 16 }}>
            <span role="img" aria-label="reward" style={{ marginRight: 7 }}>🎁</span>
            <strong>Real-World Rewards:</strong> Earn meaningful milestones that inspire real-life growth.
          </li>
          <li style={{ marginBottom: 16 }}>
            <span role="img" aria-label="journal" style={{ marginRight: 7 }}>📝</span>
            <strong>Reflection & Journal:</strong> Track progress and grow through AI-powered prompts.
          </li>
          <li>
            <span role="img" aria-label="offline" style={{ marginRight: 7 }}>🌳</span>
            <strong>Offline Check-Ins:</strong> Celebrate time spent in the real world, not just online.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
