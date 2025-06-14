import React from "react";
const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  bg: "#fff",
  text: "#1A1A1A",
};

// PUBLIC_INTERFACE
export default function RewardsPage() {
  const rewards = [
    { id: 1, name: "Coffee voucher", unlocked: true, desc: "Earned at 3-day streak", icon: "☕" },
    { id: 2, name: "Gift card", unlocked: false, desc: "7 days offline streak", icon: "🎟️" },
    { id: 3, name: "Outdoor Yoga Pass", unlocked: false, desc: "Try 2 off-grid activities", icon: "🧘" },
  ];

  return (
    <section style={{ marginTop: 24 }}>
      <h2 style={{ color: COLORS.primary, fontSize: "2.1rem", marginBottom: 7 }}>
        Milestone Rewards
      </h2>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 18,
        marginTop: 12
      }}>
        {rewards.map((r, idx) => (
          <div
            key={r.id}
            style={{
              background: r.unlocked ? "#fafbe4" : "#F2F6F5",
              border: r.unlocked ? `2px solid ${COLORS.accent}` : "1px solid #e2efe6",
              borderRadius: 14,
              padding: "22px 26px",
              fontWeight: 500,
              fontSize: 16,
              minWidth: 180,
              boxShadow: "0 2px 4px 0 rgba(46,125,50,0.02)",
              opacity: r.unlocked ? 1 : 0.65,
              color: r.unlocked ? COLORS.primary : "#888"
            }}
          >
            <div style={{
              fontSize: 32,
              marginBottom: 6,
              filter: r.unlocked ? "none" : "grayscale(0.7)"
            }}>
              {r.icon}
            </div>
            <div>{r.name}</div>
            <div style={{
              color: r.unlocked ? COLORS.accent : "#A7C5B1",
              marginTop: 4,
              fontWeight: 400,
              fontSize: 14
            }}>
              {r.desc}
            </div>
            {r.unlocked && (
              <span style={{
                color: COLORS.accent,
                background: "#fcfded",
                borderRadius: 6,
                fontWeight: 700,
                padding: "2px 9px",
                marginTop: 5,
                fontSize: 12,
                display: "inline-block"
              }}>
                Unlocked!
              </span>
            )}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 30,
        textAlign: "center",
        color: "#999D86",
        fontSize: 15
      }}>
        <span>
          Rewards promote real-life experiences. <br />
          Celebrate your milestones offline!
        </span>
      </div>
    </section>
  );
}
