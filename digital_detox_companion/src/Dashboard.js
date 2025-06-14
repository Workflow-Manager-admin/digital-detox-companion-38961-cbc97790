import React from "react";

/**
 * Dashboard - Home page for Digital Detox Companion
 */
// PUBLIC_INTERFACE
function Dashboard() {
  return (
    <div style={{ padding: "44px 0 0", minHeight: 430, textAlign: "center" }}>
      <h1 className="title" style={{ fontWeight: 700, fontSize: 31, letterSpacing: 0.01, marginBottom: 7 }}>
        Welcome to Digital Detox Companion
      </h1>
      <div className="description" style={{ fontSize: 18, lineHeight: "1.48", color: "#3f6048", maxWidth: 640, margin: "0 auto 16px" }}>
        Ready to reclaim your time, happiness, and real-world experiences? <b>Digital Detox Companion</b> is your guide to overcoming digital distractions and rediscovering the true joys of life.
        <br /><br />
        Our mission is to help you break free from excessive screen time with personalized detox plans, supportive accountability partners, and community inspiration—so you can spend less time scrolling and more time living.
        <br /><br />
        Unlock real-world rewards for your achievements: whether it’s a coffee with friends, a yoga class, supporting local bookstores, or giving back to causes you care about, every progress milestone brings meaningful incentives. Join a movement that values your well-being, celebrates your offline victories, and helps you transform digital habits for good!
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 32, flexWrap: 'wrap' }}>
        <div style={{ minWidth: 210, maxWidth: 250, background: "#fafcfb", borderRadius: 16, padding: 18, boxShadow: "0 2px 12px rgba(68,105,70,0.08)" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🗺️</div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Personalized Detox Plans</div>
          <div style={{ fontSize: 15, color: "#4a7052" }}>Reduce screen time with smart, adaptive plans tailored to your life.</div>
        </div>
        <div style={{ minWidth: 210, maxWidth: 250, background: "#fafcfb", borderRadius: 16, padding: 18, boxShadow: "0 2px 12px rgba(68,105,70,0.08)" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🤝</div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Buddy & Community Support</div>
          <div style={{ fontSize: 15, color: "#4a7052" }}>Stay motivated with anonymous buddy pairings and encouraging circles.</div>
        </div>
        <div style={{ minWidth: 210, maxWidth: 250, background: "#fafcfb", borderRadius: 16, padding: 18, boxShadow: "0 2px 12px rgba(68,105,70,0.08)" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🎁</div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Real-World Rewards</div>
          <div style={{ fontSize: 15, color: "#4a7052" }}>Earn coffee vouchers, yoga passes, bookstore discounts, and more as you progress.</div>
        </div>
      </div>
      <div style={{ color: "#9db899", fontSize: 14, marginTop: 38 }}>
        Begin your journey to mindful digital habits—because life is brighter beyond the screen.
      </div>
    </div>
  );
}

export default Dashboard;
