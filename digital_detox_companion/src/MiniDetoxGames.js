import React from "react";

/**
 * Mini Detox Games / To-Do Tasks component
 * Offers quick, low-addiction mini-games or micro to-dos to encourage logging off after brief play.
 */
// PUBLIC_INTERFACE
const MiniDetoxGames = () => (
  <div style={{
    padding: "2.5rem 0",
    minHeight: 420,
    textAlign: "center",
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 2px 16px #e8f5e94a",
    marginTop: 32
  }}>
    <h2 style={{ color: "#2E7D32", fontWeight: 700, fontSize: 28, margin: "0 0 18px" }}>
      🎮 Mini Detox Games / Tasks
    </h2>
    <div style={{ color: "#666", fontSize: 16, marginBottom: 16 }}>
      Play for a couple minutes then... go outside!<br/>
      <span style={{ fontWeight: 400, color: "#FFD600" }}>
        Less is more.
      </span>
    </div>
    {/* TODO: Short mini-game(s) and micro-tasks */}
    <div style={{ margin: "36px 0 0", color: "#BBB", fontStyle: "italic" }}>
      (Quick boredom-buster games and to-dos for healthy engagement coming soon!)
    </div>
  </div>
);

export default MiniDetoxGames;
