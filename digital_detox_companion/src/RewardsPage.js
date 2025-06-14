import React, { useState } from "react";
import { rewardsList } from "./rewardsData";

// PUBLIC_INTERFACE
/**
 * RewardsPage - Real-world milestone rewards tracking page.
 * Simple, celebratory UI. Shows progress and earned rewards.
 */
function RewardsPage() {
  // earnedRewards is stored as bool array [earned, earned...]
  const [earnedRewards, setEarnedRewards] = useState([true, false, false, false, false, false]);
  const unlockNext = () => {
    const idx = earnedRewards.indexOf(false);
    if (idx !== -1) {
      const updated = [...earnedRewards];
      updated[idx] = true;
      setEarnedRewards(updated);
    }
  };
  return (
    <div style={{
      background: "#fafcfb",
      borderRadius: 13,
      boxShadow: "0 2px 14px #e7f6ec60,0 1px 0 #fff2",
      padding: 24, maxWidth: 520, margin: "18px auto"
    }}>
      <h2 style={{ color: "#2E7D32", marginBottom: 7, fontWeight: 700 }}>
        Rewards 🎁
      </h2>
      <div style={{ color: "#3F6140", marginBottom: 14 }}>
        Celebrate your real-world victories! Unlock a reward as you hit each milestone.
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {rewardsList.map((reward, i) => (
          <li key={i} style={{
            margin: "13px 0", padding: "13px 12px",
            background: earnedRewards[i] ? "#e4f9e7" : "#f9faf4",
            border: earnedRewards[i] ? "2px solid #FFD600" : "1px solid #e7f6ec",
            borderRadius: 8,
            opacity: earnedRewards[i] ? 1 : 0.7,
            color: "#53663A", fontWeight: earnedRewards[i] ? 700 : 400,
            display: "flex", alignItems: "center", gap: 16
          }}>
            <span style={{
              fontSize: 24, width:32, lineHeight: "120%",
            }}>{earnedRewards[i] ? "🏅" : "🔒"}</span>
            <span>
              {reward}
              <span style={{fontSize:13, color:"#c9bd1c", marginLeft:10}}>
                {earnedRewards[i] ? "Unlocked!" : ""}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <button className="btn"
        style={{
          marginTop: 20,
          background: "#FFD600",
          color: "#222",
          fontWeight: 600, fontSize: 15,
          border: "none", borderRadius: 6, padding: "11px 18px",
          cursor: earnedRewards.every(r=>r) ? "not-allowed" : "pointer",
          opacity: earnedRewards.every(r=>r) ? 0.75 : 1,
          boxShadow: "0 1px 3px #ffd60021"
        }}
        onClick={unlockNext}
        disabled={earnedRewards.every(r=>r)}
      >
        {earnedRewards.every(r=>r)
          ? "All rewards unlocked! 🎈"
          : "Unlock Next Milestone"}
      </button>
      <div style={{
        marginTop: 18, color: "#FFD600",
        fontWeight: 500, fontSize: 15,
      }}>
        {earnedRewards.every(r => r)
          ? "You're a digital detox champion! 🥇"
          : "Every step counts. Celebrate the little wins! 🎉"}
      </div>
    </div>
  );
}

export default RewardsPage;
