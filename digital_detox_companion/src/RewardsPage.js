import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { rewardsList } from "./rewardsData";

/*
 * Color palette and theme (should align with App.js and App.css)
 * Primary: #2E7D32 (green), Secondary: #B2DFDB (cyan), Accent: #FFD600 (yellow)
 */
const COLORS = {
  primary: "#2E7D32",
  secondary: "#B2DFDB",
  accent: "#FFD600",
  bg: "#fff",
  text: "#1A1A1A",
  border: "rgba(44,127,67,0.09)"
};

/*
 * Simulated reward progress and profile state (replace with backend/data integration)
 */
const defaultUser = {
  points: 950, // current points
  earnedRewardIds: [1, 2, 3], // (ids) unlocked/earned rewards
  nextRewardId: 4 // id of next available reward
};

function getNextReward(user, rewards) {
  // Returns next locked reward object or null
  const next = rewards.find(r => !user.earnedRewardIds.includes(r.id));
  return next || null;
}

function getBadgeStatus(badgeId, user) {
  if (user.earnedRewardIds.includes(badgeId)) return "earned";
  if (badgeId === user.nextRewardId) return "next";
  return "locked";
}

/**
 * Small celebratory/confetti effect using emoji - not modal, appears briefly
 */
function CelebrationConfetti({ visible }) {
  if (!visible) return null;
  return (
    <div
      className="celebration-confetti"
      style={{
        position: "fixed",
        zIndex: 1000,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "fadeOutUp 2s 1 forwards",
        fontSize: 46,
        fontWeight: 900,
      }}
    >
      <span role="img" aria-label="confetti">
        🎉✨🏆🎈🎊
      </span>
    </div>
  );
}

/**
 * Animated/visually engaging progress bar to next reward
 */
function AnimatedProgressBar({ progress, milestoneLabel, color=COLORS.primary }) {
  // progress: 0..1
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    let raf; let start;
    if (displayed !== progress) {
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const t = Math.min((timestamp - start) / 700, 1); // 700ms
        setDisplayed(prev => prev + (progress - prev) * t);
        if (t < 1) raf = window.requestAnimationFrame(animate);
        else setDisplayed(progress);
      };
      raf = window.requestAnimationFrame(animate);
      return () => raf && window.cancelAnimationFrame(raf);
    }
  }, [progress]);
  return (
    <div style={{ margin: "22px 0 9px", width: "100%" }}>
      <div style={{
        background: "#F2F6F5",
        borderRadius: 16,
        overflow: "hidden",
        height: 24,
        position: "relative",
        border: `1.5px solid ${COLORS.border}`,
        boxShadow: "0 2px 11px 0 rgba(46,125,50,0.04)"
      }}>
        <div
          style={{
            width: (Math.min(1, displayed) * 100) + "%",
            background: `linear-gradient(90deg, ${COLORS.primary} 80%, ${COLORS.accent})`,
            height: "100%",
            transition: "width 0.7s cubic-bezier(.6,0,.4,1)",
            borderRadius: 16
          }}
        />
        {/* Icon over progress thumb */}
        <div
          style={{
            position: "absolute",
            left: `calc(${Math.min(1, displayed) * 100}% - 21px)`,
            top: "50%",
            transform: "translateY(-50%)",
            transition: "left 0.7s cubic-bezier(.6,0,.4,1)",
            pointerEvents: "none"
          }}
        >
          <span
            style={{
              fontSize: 22,
              background: "#fff",
              borderRadius: "50%",
              boxShadow: "0 1px 6px rgba(44,127,67,0.07)",
              padding: 3,
              border: `1.5px solid ${COLORS.primary}`
            }}
            role="img"
            aria-label="progress"
          >🏅</span>
        </div>
      </div>
      <div
        style={{
          marginTop: 5,
          fontSize: 15,
          color: COLORS.primary,
          letterSpacing: 0,
          textAlign: "right",
          fontWeight: 500
        }}
      >
        {milestoneLabel || Math.floor((displayed || 0) * 100) + "% to next reward"}
      </div>
    </div>
  );
}

/**
 * Dashboard with current points and next milestone (fun/interactivity, themed)
 */
function PointsDashboard({ points, nextReward, progress, onCelebrate }) {
  const rewardPts = nextReward?.points || 0;
  const milestoneLabel = nextReward
    ? `Next: ${nextReward.title} at ${rewardPts} points`
    : "All rewards earned 🎉";
  return (
    <div
      className="points-dashboard"
      style={{
        borderRadius: 18,
        background: "#FFFFFF",
        boxShadow: "0 5px 36px -12px #B2DFDB88, 0 1px 2px #81C78411",
        border: `2px solid ${COLORS.accent}`,
        margin: "30px 0 12px",
        padding: "30px 30px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 0
      }}
    >
      <div
        style={{
          fontSize: 19.5,
          fontWeight: 450,
          color: COLORS.text,
          letterSpacing: 0.11,
          marginBottom: 2
        }}
      >
        <span role="img" aria-label="star">⭐</span> Your Total Points
      </div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 760,
          margin: "7px 0 0",
          color: COLORS.primary,
        }}
      >
        {points}
      </div>
      <AnimatedProgressBar
        progress={progress}
        milestoneLabel={milestoneLabel}
      />
      {nextReward &&
        <div style={{
          padding: "9px 15px",
          color: "#fff",
          background: COLORS.primary,
          borderRadius: 12,
          marginTop: 8,
          fontWeight: 520,
          letterSpacing: 0.09,
          fontSize: 15,
          display: "inline-block",
          transition: "background 0.2s"
        }}>
          <span role="img" aria-label="flag">🏁</span> {rewardPts - points} points to next reward!
          <button
            style={{
              marginLeft: 18,
              background: COLORS.accent,
              color: COLORS.primary,
              border: "none",
              borderRadius: 8,
              fontWeight: 650,
              fontSize: 14,
              padding: "2.5px 13px",
              cursor: "pointer",
              transition: "background 0.13s",
              boxShadow: "0 1px 5px 0 #F9E9A8"
            }}
            onClick={onCelebrate}
          >
            Celebrate!
          </button>
        </div>
      }
    </div>
  );
}

/**
 * Gamified badge/reward grid with earned/badge/locked styles
 */
function RewardBadges({ rewards, user, onBadgeClick }) {
  return (
    <div
      className="reward-badges-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(142px, 1fr))",
        gap: 24,
        margin: "0 auto",
        width: "100%",
        maxWidth: 750,
        marginTop: 18
      }}>
      {rewards.map((r) => {
        const badgeStatus = getBadgeStatus(r.id, user);
        let badgeBg, shadow, filter, emojiBg = "#fff";
        if (badgeStatus === "earned") {
          badgeBg = "#E6FFE1";
          shadow = `0 2px 10px 0 #B2DFDB99`;
        } else if (badgeStatus === "next") {
          badgeBg = COLORS.accent;
          shadow = `0 4px 21px 0 #FFD60044`;
          emojiBg = COLORS.secondary;
        } else { // locked
          badgeBg = "#F0F3F4";
          shadow = "none";
          filter = "grayscale(1) opacity(0.58)";
        }
        return (
          <div
            key={r.id}
            role="button"
            onClick={() => onBadgeClick(r)}
            tabIndex={0}
            style={{
              background: badgeBg,
              borderRadius: 15,
              boxShadow: shadow,
              border: badgeStatus === "next"
                ? `2px solid ${COLORS.primary}`
                : "2px solid #ccc0",
              padding: "14px 6px 15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              cursor: badgeStatus === "locked" ? "not-allowed" : "pointer",
              opacity: badgeStatus === "locked" ? 0.67 : 1,
              outline: badgeStatus === "next"
                ? `3.5px solid ${COLORS.accent}`
                : undefined,
              transition: "background 0.3s, box-shadow 0.3s, border 0.2s"
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: emojiBg,
                margin: "0 0 10px",
                fontSize: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                filter,
                border: badgeStatus === "next"
                  ? `2px solid ${COLORS.primary}`
                  : "2.5px solid #ebe5",
                boxShadow: badgeStatus === "earned"
                  ? "0 3px 11px 0 #388E3C22"
                  : undefined,
                transition: "border 0.2s"
              }}
              aria-label={badgeStatus === "earned" ? "Earned" : badgeStatus === "next" ? "Next reward" : "Locked"}
            >
              {r.emoji}
            </div>
            <div
              style={{
                color: COLORS.primary,
                fontWeight: 650,
                fontSize: 15.5,
                marginBottom: 7,
                textAlign: "center",
                letterSpacing: 0.025,
                filter,
              }}
            >
              {r.title}
            </div>
            <div
              style={{
                minHeight: 36,
                fontSize: 13.7,
                color: badgeStatus === "locked" ? "#9DACA3" : "#789262",
                fontWeight: 420,
                textAlign: "center",
                filter,
              }}
            >
              {badgeStatus === "next" && (
                <span style={{
                  background: COLORS.accent,
                  color: COLORS.primary,
                  fontWeight: 550,
                  fontSize: 12,
                  borderRadius: 10,
                  padding: "1.5px 9px",
                  marginRight: 6
                }}>Next</span>
              )}
              {r.description}
            </div>
            {badgeStatus === "locked" && (
              <div
                style={{
                  marginTop: 7,
                  fontSize: 12,
                  color: "#9DACA3",
                  fontWeight: 400,
                  background: "rgba(44,127,67,0.08)",
                  borderRadius: 7,
                  padding: "2.5px 9px"
                }}
              >
                {r.points} pts
              </div>
            )}
            {badgeStatus === "earned" && (
              <div
                style={{
                  marginTop: 7,
                  fontSize: 12,
                  color: "#fff",
                  fontWeight: 650,
                  background: COLORS.primary,
                  borderRadius: 8,
                  padding: "3px 10px 2.5px"
                }}
              >Earned</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Fun/interactive "Next Milestone" callout
 */
function MilestoneBanner({ nextReward, ptsToGo }) {
  if (!nextReward)
    return (
      <div
        style={{
          margin: "34px auto 0",
          color: COLORS.primary,
          background: COLORS.secondary,
          fontWeight: 630,
          fontSize: 19,
          borderRadius: 14,
          padding: "22px 22px",
          textAlign: "center",
          boxShadow: "0 1px 12px 0 #6CC59912",
          maxWidth: 610
        }}
      >
        🎉 All milestone rewards unlocked! Keep going for bonus badges! 💯
      </div>
    );
  return (
    <div
      className="milestone-banner"
      style={{
        margin: "34px auto 0",
        color: COLORS.bg,
        background: `linear-gradient(90deg,${COLORS.primary},${COLORS.secondary})`,
        fontWeight: 640,
        fontSize: 18,
        borderRadius: 14,
        padding: "20px 22px",
        textAlign: "center",
        boxShadow: "0 1px 12px 0 #6CC59933",
        maxWidth: 610,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <span style={{ fontSize: 25, marginRight: 16 }}>{nextReward.emoji}</span>
      <span>
        Only <span style={{ fontWeight: 850, color: COLORS.accent, letterSpacing: 0.08, fontSize: 19 }}>{ptsToGo}</span> points until <span style={{ fontWeight: 870 }}>{nextReward.title}</span>!
      </span>
    </div>
  );
}

/**
 * RewardPage Root - Gamified, interactive, themed rewards dashboard
 */
// PUBLIC_INTERFACE
function RewardsPage() {
  // State: user, points, milestone reward
  const [user, setUser] = useState(defaultUser);
  const [celebrate, setCelebrate] = useState(false);
  const [badgeDetail, setBadgeDetail] = useState(null);

  // Calculate next reward, required points, progress
  const nextReward = getNextReward(user, rewardsList);
  const rewardPts = nextReward?.points || 1000;
  const progress = nextReward
    ? Math.max(0, Math.min(1, user.points / rewardPts))
    : 1;
  const ptsToGo = nextReward ? Math.max(0, rewardPts - user.points) : 0;

  // Simulate celebration effect (fire confetti)
  const triggerCelebrate = () => {
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 1700);
  };

  // Auto-celebrate on earn (simulate new rewards unlocked)
  const prevPoints = useRef(user.points);
  useEffect(() => {
    // If points increased past an earned reward, show celebration
    if (
      user.points > prevPoints.current &&
      nextReward &&
      user.points >= rewardPts
    ) {
      triggerCelebrate();
    }
    prevPoints.current = user.points;
  }, [user, nextReward, rewardPts]);

  // Badge click shows extra badge info with fun feedback (inline detail)
  const handleBadgeClick = (reward) => {
    setBadgeDetail({
      ...reward,
      status: getBadgeStatus(reward.id, user)
    });
    // Optionally fire confetti for fun if just earned
    if (getBadgeStatus(reward.id, user) === "earned") {
      triggerCelebrate();
    }
  };

  // Dismiss badge detail overlay
  const closeBadgeDetail = () => setBadgeDetail(null);

  return (
    <div
      className="reward-page"
      style={{
        background: "#fbfdfb",
        padding: "0 0 50px",
        minHeight: 750,
        width: "100%"
      }}
    >
      <CelebrationConfetti visible={celebrate} />
      <h1
        style={{
          fontWeight: 720,
          color: COLORS.primary,
          fontSize: 2.18 + "rem",
          margin: "10px 0 0",
          letterSpacing: 0.035,
          textShadow: "0 1px 0 #B2DFDB30"
        }}
      >
        Your Milestone Rewards
      </h1>
      <div style={{
        fontSize: 18,
        color: "#678B6F",
        margin: "10px 0 12px",
        fontWeight: 400,
        lineHeight: 1.36,
        letterSpacing: 0.01
      }}>
        Progress, badges, and real world rewards for your digital wellness victories.
      </div>
      {/* Points + Progress dashboard */}
      <PointsDashboard
        points={user.points}
        nextReward={nextReward}
        progress={progress}
        onCelebrate={triggerCelebrate}
      />
      {/* Milestone Callout */}
      <MilestoneBanner nextReward={nextReward} ptsToGo={ptsToGo} />

      {/* Fun badge grid */}
      <section>
        <div
          style={{
            fontWeight: 530,
            color: COLORS.primary,
            marginTop: 38,
            fontSize: 20,
            letterSpacing: 0.07,
            marginBottom: -3
          }}
        >
          Rewards & Badges
        </div>
        <RewardBadges
          rewards={rewardsList}
          user={user}
          onBadgeClick={handleBadgeClick}
        />
      </section>

      {/* Badge detail / interactive card (not a modal) */}
      {badgeDetail && (
        <div
          className="badge-detail-overlay"
          tabIndex={0}
          style={{
            position: "fixed",
            left: 0, top: 0, width: "100vw", height: "100vh",
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(2px)",
            zIndex: 1088,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={closeBadgeDetail}
        >
          <div
            style={{
              padding: "28px 36px",
              minWidth: 260,
              maxWidth: 355,
              borderRadius: 16,
              boxShadow: "0 4px 44px 0 #1A1A1A27",
              background: badgeDetail.status === "locked" ? "#EAEDED" : COLORS.secondary,
              border: badgeDetail.status === "next"
                ? `2.5px solid ${COLORS.accent}`
                : "2.5px solid #EBEAF5",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              userSelect: "none",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                right: 15,
                top: 5,
                fontSize: 22,
                color: COLORS.primary,
                cursor: "pointer",
                background: "#ffffffcc",
                padding: "1px 7px",
                borderRadius: 10
              }}
              onClick={e => { e.stopPropagation(); closeBadgeDetail(); }}
              tabIndex={0}
              aria-label="Close"
              role="button"
            >✖</span>
            <div
              style={{
                width: 83,
                height: 83,
                borderRadius: "50%",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2.4px solid #ccd"
              }}
            >
              <span style={{ fontSize: 53 }}>
                {badgeDetail.emoji}
              </span>
            </div>
            <div style={{
              fontWeight: 720,
              fontSize: 25,
              color: COLORS.primary,
              margin: "20px 0 11px",
              textAlign: "center",
              letterSpacing: 0.02
            }}>
              {badgeDetail.title}
            </div>
            <div style={{
              fontSize: 15.5,
              color: "#789262",
              textAlign: "center",
              fontWeight: 400,
              marginBottom: 14
            }}>
              {badgeDetail.description}
            </div>
            {badgeDetail.status === "earned" && (
              <div style={{
                background: COLORS.primary,
                color: "#fff",
                fontWeight: 640,
                padding: "5px 16px 4px",
                borderRadius: 11,
                margin: "6px 0"
              }}>🎉 Earned! Great job!</div>
            )}
            {badgeDetail.status === "next" && (
              <div style={{
                background: COLORS.accent,
                color: COLORS.primary,
                fontWeight: 620,
                padding: "5px 16px 4px",
                borderRadius: 10,
                margin: "4px 0 3px"
              }}>You're so close! {badgeDetail.points} points to unlock.</div>
            )}
            {badgeDetail.status === "locked" && (
              <div style={{
                background: "#BAC7C5",
                color: "#fff",
                fontWeight: 500,
                padding: "4.5px 13px",
                borderRadius: 9,
                margin: "5px 0"
              }}>
                <span role="img" aria-label="lock">🔒</span> Unlock this badge at {badgeDetail.points} pts.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RewardsPage;
