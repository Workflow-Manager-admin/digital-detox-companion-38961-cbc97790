import React from "react";

/**
 * Home page/Dashboard for Digital Detox Companion.
 * - Brief description of app, plan summary, call to action to start or continue
 */
// PUBLIC_INTERFACE
function Dashboard() {
  return (
    <div style={{ paddingTop: 24, paddingBottom: 32 }}>
      <h1 style={{ fontWeight: 700, fontSize: 28, margin: 0 }}>
        Welcome to Digital Detox Companion
      </h1>
      <p style={{ color: "#789262", fontSize: 18, maxWidth: 720, margin: "16px 0 24px 0" }}>
        Digital Detox Companion empowers you to take control of your screen time and rediscover the joy of living offline. 
        Our mission is to support your journey toward digital well-being with smart detox plans, encouraging real-world connections, and meaningful rewards for progress. <br /><br />
        Join a supportive community, find an anonymous accountability buddy, and celebrate every milestone—big or small—with real-world benefits. 
        Step into a healthier, more present life where your time, focus, and relationships truly thrive.
      </p>
      {/* Additional plan/progress, recent activity, motivational message etc. */}
    </div>
  );
}

export default Dashboard;
