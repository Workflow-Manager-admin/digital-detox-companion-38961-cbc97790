import React from "react";

/**
 * Dashboard (Home page) for Digital Detox Companion
 * Displays app summary, current plan, next steps, and progress snapshot.
 */
// PUBLIC_INTERFACE
function Dashboard() {
  return (
    <div style={{ paddingTop: 32, paddingBottom: 8, textAlign: "center" }}>
      <h1
        style={{
          fontWeight: 700,
          color: "#24733A",
          fontSize: 32,
          marginBottom: 12,
        }}
      >
        Welcome to Digital Detox Companion
      </h1>
      <div
        style={{
          marginBottom: 22,
          color: "rgba(34,49,52,0.82)",
          fontSize: 18.4,
        }}
      >
        Discover Digital Detox Companion — more than an app, it’s your launchpad to a life untethered from endless scrolling and notifications. 
        <br />
        <br />
        <b>Our mission</b> is to empower you to regain control of your time, boost your well-being, and nurture deeper human connections. 
        <br />
        <br />
        With custom-tailored detox journeys, the support of an anonymous accountability buddy, and real-world milestone rewards, you’ll reclaim wasted hours and invest them where life truly happens: offline. <br /><br />
        This app was built to gently guide you away from digital overwhelm and inspire lasting change—so your best moments don’t happen on a screen. Start your journey, rewrite your story, and discover how powerful life can be when you reconnect with the world around you.
      </div>

      <div
        style={{
          margin: "38px auto 0",
          maxWidth: 440,
          background: "#F4F9F5",
          border: "1px solid #E1EDE3",
          borderRadius: 14,
          boxShadow: "0 4px 16px rgba(36,120,59,0.08)",
          padding: "23px 24px 20px 24px",
          textAlign: "left"
        }}
      >
        <h2 style={{ color: "#295D2B", fontSize: 20, fontWeight: 600, marginBottom: 13 }}>
          What you can do here:
        </h2>
        <ul style={{ fontSize: 17, paddingLeft: 18, color: "#376848", marginBottom: 7 }}>
          <li>See your personalized detox plan and your daily progress.</li>
          <li>Pair with an anonymous accountability buddy for support.</li>
          <li>Earn real-world milestone rewards for every goal achieved.</li>
          <li>Check in and log real-world activities that help you unplug.</li>
          <li>Get AI-powered reflection prompts and journaling tools.</li>
        </ul>
        <div style={{ fontSize: 15.5, color: "#617669", marginTop: 15 }}>
          Ready to start reclaiming your life from digital distractions? Your goals, buddy, and new habits are just a tap away.
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
