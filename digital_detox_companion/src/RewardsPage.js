import React, { useState } from "react";
import { rewardsList } from "./rewardsData";

/**
 * RewardsPage - Milestone Rewards for Detox
 * Minimal and playful UI for claiming real-world rewards for milestone achievements.
 */
// PUBLIC_INTERFACE
function RewardsPage() {
  // Track rewards claimed by ID
  const [claimed, setClaimed] = useState({});

  // Claim reward interaction
  const handleClaim = (rewardId) => {
    setClaimed((prev) => ({ ...prev, [rewardId]: true }));
  };

  return (
    <div style={{ marginTop: 18 }}>
      <h2 style={{ color: "#2E7D32", fontWeight: 600 }}>Milestone Rewards</h2>
      <div style={{ color: "#6A6F38", marginBottom: 18 }}>
        Hit detox milestones, then claim your real-life rewards!
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 18,
          justifyContent: "center",
        }}
      >
        {rewardsList && rewardsList.length ? (
          rewardsList.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#FDF8EB",
                border: `2px solid ${
                  claimed[item.id] ? "#FFD600" : "#E7F6EC"
                }`,
                borderRadius: 15,
                padding: "16px 22px 14px 22px",
                minWidth: 180,
                minHeight: 130,
                position: "relative",
                textAlign: "center",
                color: "#1A1A1A",
                boxShadow: claimed[item.id]
                  ? "0 3px 10px rgba(220,180,76,0.12)"
                  : "none",
                opacity: claimed[item.id] ? 0.65 : 1,
                transition: "all 0.16s",
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  lineHeight: 1,
                  marginBottom: 7,
                  filter: claimed[item.id] ? "grayscale(0.7)" : "none",
                }}
              >
                {item.emoji}
              </div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#977222",
                  marginBottom: 7,
                  fontStyle: "italic",
                }}
              >
                {item.description}
              </div>
              <button
                className="btn"
                style={{
                  background: claimed[item.id] ? "#B2DFDB" : "#FFD600",
                  color: "#2E7D32",
                  padding: "7px 16px",
                  borderRadius: 6,
                  border: claimed[item.id]
                    ? "1px solid #B2DFDB"
                    : "1.5px solid #FFD600",
                  fontWeight: 500,
                  fontSize: 15,
                  marginTop: 7,
                  cursor: claimed[item.id] ? "not-allowed" : "pointer",
                  opacity: claimed[item.id] ? 0.7 : 1,
                }}
                disabled={claimed[item.id]}
                onClick={() => handleClaim(item.id)}
              >
                {claimed[item.id] ? "Claimed!" : "Claim"}
              </button>
              {claimed[item.id] && (
                <div
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 14,
                    color: "#FFD600",
                    fontWeight: 700,
                    fontSize: 19,
                    transform: "rotate(-8deg)",
                  }}
                >
                  🏅
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No rewards available yet!</div>
        )}
      </div>
      <div style={{ marginTop: 22, color: "#789262", fontSize: 15 }}>
        The best reward? More life unplugged. 🏞️
      </div>
    </div>
  );
}

export default RewardsPage;
