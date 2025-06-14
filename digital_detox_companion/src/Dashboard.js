import React from "react";

const dashboardStyle = {
  padding: "36px 0 18px",
  textAlign: "center",
  width: "100%",
  minHeight: "410px",
  background: "#fafcfb",
  borderRadius: 14,
  boxShadow: "0 8px 40px rgba(44,127,67,0.07)"
};

// PUBLIC_INTERFACE
function Dashboard() {
  return (
    <div style={dashboardStyle}>
      <h1 style={{ fontWeight: 700, fontSize: 32, color: "#2E7D32" }}>Welcome to Digital Detox Companion</h1>
      <p style={{ fontSize: "1.16rem", color: "#41582D", marginTop: 14, marginBottom: 35, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
        Digital Detox Companion empowers you to break free from unhealthy digital habits and reconnect with what matters most. Our mission is to help you reduce screen time through customized detox plans, real-world rewards, and meaningful support. Unlock your best self by celebrating offline achievements, building lasting habits, and joining a positive community that values life beyond the screen. Take the first step to balance—let’s thrive together, one real connection at a time.
      </p>

      <div style={{ marginTop: 30 }}>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Nature retreat"
          style={{ width: 190, borderRadius: 18, boxShadow: "0 3px 18px #b2dfdb55" }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
