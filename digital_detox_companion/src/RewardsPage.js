import React from "react";
import { rewardsList } from "./rewardsData";

/**
 * RewardsPage - Shows earned and locked milestone rewards.
 */
// PUBLIC_INTERFACE
function RewardsPage() {
  // Example completion state: number of milestones reached
  const completedMilestones = 2;

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", paddingTop: 34 }}>
      <h2 style={{ fontWeight: 700, marginBottom: 14 }}>
        🎁 Milestone Rewards
      </h2>
      <div style={{ marginBottom: 20, color: "#789262" }}>
        Earn rewards for real-world achievements! Progress = real perks.
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 22
      }}>
        {rewardsList && rewardsList.length > 0 ? (
          rewardsList.map((reward, idx) => (
            <div
              key={reward.id || idx}
              style={{
                background: idx < completedMilestones ? "#FFF9DE" : "#F1F1F1",
                border: idx < completedMilestones ? "2px solid #FFD600" : "1px solid #E7E7E7",
                borderRadius: 17,
                padding: "19px 13px",
                minHeight: 80,
                boxShadow: "0 1px 7px rgba(150,150,0,0.04)",
                opacity: idx < completedMilestones ? 1 : 0.62,
                position: "relative"
              }}>
              <span style={{
                fontSize: 33,
                position: "absolute",
                top: 11,
                right: 16,
                opacity: idx < completedMilestones ? 1 : 0.2
              }}>{reward.emoji || "🏅"}</span>
              <div style={{
                fontWeight: 600,
                fontSize: 17,
                color: idx < completedMilestones ? "#2E7D32" : "#999"
              }}>
                {reward.title}
              </div>
              <div style={{
                color: "#555",
                fontSize: 14,
                marginTop: 6
              }}>
                {idx < completedMilestones ? reward.description : "Keep progressing to unlock!"}
              </div>
            </div>
          ))
        ) : (
          <div>No rewards found. Start your plan!</div>
        )}
      </div>
    </div>
  );
}

export default RewardsPage;
