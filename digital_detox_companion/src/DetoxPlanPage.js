import React, { useState } from "react";

/**
 * DetoxPlanPage - Personalized Digital Detox Plan Overview Page (Innovative Version).
 * Implements habit-stacking, adaptive milestones, and gamified progression.
 * Users progress through "Milestones," level-up habits, and the plan adjusts based on engagement.
 * Props:
 *   @param {object} props
 *   @param {function} [props.showToast] - Function to trigger a toast message.
 */
// PUBLIC_INTERFACE
function DetoxPlanPage({ showToast }) {
  // ---- Innovative Plan Model: Adaptive "Habit Stack" ----
  // Each milestone unlocks next, habits "stack up", AI-driven adjustments suggest new challenges.

  // Demo: User's baseline usage for smarter schedule (normally from onboarding or analytics)
  const userBaseline = {
    baselineScreenTime: 3, // hours/day average
    timesChecked: 10,      // times per day (mock)
    preferredOffline: ["walking", "reading"]
  };

  // Plan templates with stacking and gamification milestones
  const milestoneTemplates = [
    {
      title: "Level 1: Tune In",
      desc: "Track your social media time for 2 days. No restrictions—just build awareness.",
      type: "awareness",
      goal: { maxTime: userBaseline.baselineScreenTime },
      daysRequired: 2,
      reward: "🔍 Awareness Badge"
    },
    {
      title: "Level 2: Swap One Habit",
      desc: "Cut your daily social media use by 20%. Replace one session with a walk or reading.",
      type: "habit-swap",
      goal: { maxTime: Math.round(userBaseline.baselineScreenTime * 0.8 * 10) / 10 },
      daysRequired: 3,
      reward: "🚶 Habit Stacker"
    },
    {
      title: "Level 3: Digital-Free Zone",
      desc: "Designate 1 daily hour device-free (meals, walks, or bedtime). Build your streak.",
      type: "block-off",
      goal: { deviceFreeMin: 60 },
      daysRequired: 4,
      reward: "🍽️ Zone Master"
    },
    {
      title: "Level 4: Gamified Milestone",
      desc: "Try a 2-hour digital detox block. Log your offline wins and earn bonus points!",
      type: "off-grid",
      goal: { block: 120 }, // minutes
      daysRequired: 1,
      reward: "🎯 Milestone Star"
    },
    {
      title: "Level 5: Adaptive Challenge",
      desc: "Pick the hardest moment for you—reduce phone checks in that slot by half.",
      type: "adaptive",
      goal: { checks: Math.round(userBaseline.timesChecked * 0.5) },
      daysRequired: 2,
      reward: "🏆 Champ"
    }
  ];

  // State: stores plan progression, habits, and history.
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [milestones, setMilestones] = useState(
    milestoneTemplates.map((m, i) => ({
        ...m,
        completed: i === 0 ? false : false, // Only first one is unlocked at start
        progress: 0, // days completed in milestone
        unlocked: i === 0,
    }))
  );
  const [completedPlans, setCompletedPlans] = useState(0);
  const [planStarted, setPlanStarted] = useState(false);

  // Dynamic scheduling: adds or adapts milestone durations (AI-style demo)
  function adjustMilestone(idx, feedback) {
    setMilestones((old) =>
      old.map((m, i) => {
        if (i === idx) {
          let adjustDays = m.daysRequired;
          if (feedback === "easy") adjustDays = Math.max(1, m.daysRequired - 1);
          if (feedback === "hard") adjustDays = m.daysRequired + 1;
          return { ...m, daysRequired: adjustDays };
        }
        return m;
      })
    );
    if (showToast) showToast("Plan adjusted for your feedback!", "info");
  }

  // Handle completion of milestone day/progress
  function handleCompleteDay(idx) {
    setMilestones((old) =>
      old.map((m, i) => {
        if (i !== idx) return m;
        const newProgress = m.progress + 1;
        if (newProgress >= m.daysRequired) {
          // Mark as completed and gamify: unlock next
          unlockMilestone(idx + 1);
          if (showToast)
            showToast(`Milestone "${m.title}" complete! ${m.reward} unlocked!`, "success");
          return { ...m, completed: true, progress: newProgress };
        }
        return { ...m, progress: newProgress };
      })
    );
  }

  function unlockMilestone(idx) {
    setMilestones((old) =>
      old.map((m, i) => (i === idx ? { ...m, unlocked: true } : m))
    );
    // Gamify: increase completed plans count
    setCompletedPlans((prev) => prev + 1);
  }

  // Progress bar: milestone-level and overall
  const overallProgress =
    milestones.reduce((acc, m) => acc + (m.completed ? 1 : 0), 0) /
    milestones.length;

  // Handler: plan start/edit
  function handlePlanStart() {
    setPlanStarted(true);
    setActiveMilestone(0);
    if (showToast) showToast("🎮 Let's go! First milestone unlocked.", "info");
  }

  // Handler: advance to next milestone
  function handleAdvanceMilestone() {
    if (activeMilestone < milestones.length - 1) {
      setActiveMilestone(activeMilestone + 1);
      if (showToast)
        showToast(`Next milestone: ${milestones[activeMilestone + 1].title}`, "info");
    }
  }

  // Handler: gamified feedback on milestone (user finds easy/hard)
  function handleUserFeedback(idx, feedback) {
    adjustMilestone(idx, feedback);
    handleAdvanceMilestone();
  }

  // UI: Pick mascot by plan state
  const mascot = planStarted
    ? (overallProgress === 1 ? "🦦" : "🐢")
    : "🦥";

  // UI: Render milestone as card
  function renderMilestone(m, i) {
    const locked = !m.unlocked;
    return (
      <div
        key={m.title}
        style={{
          opacity: locked ? 0.45 : 1,
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 2px 11px rgba(46,125,50,0.07)",
          border: locked
            ? "1.6px dashed #AACFB1"
            : m.completed
            ? "2.2px solid #FFD600"
            : "1.5px solid #B2DFDB",
          margin: "0 0 13px 0",
          marginBottom: 14,
          padding: "22px 19px 18px 19px",
          position: "relative",
          minWidth: 180,
          transition: "opacity 0.2s"
        }}
      >
        <div style={{
          fontSize: 20,
          color: "#2E7D32",
          fontWeight: 600,
        }}>{m.title} {locked && <span style={{fontSize:18,marginLeft:4}}>🔒</span>}
        {m.completed && <span style={{fontSize:18,marginLeft:7}}>✔️</span>}</div>
        <div style={{
          fontSize: 15,
          color: "#47492a",
          marginBottom: 6,
          marginTop: 2
        }}>
          {m.desc}
        </div>
        <div style={{ color: "#789262", fontSize: 14, marginBottom: 7 }}>
          Goal: <span style={{ fontWeight: 600 }}>
            {Array.isArray(m.goal)
              ? m.goal.join(", ")
              : Object.entries(m.goal).map(
                  ([k, v]) =>
                    k === "maxTime"
                      ? `≤${v}h/day`
                      : k === "deviceFreeMin"
                      ? `${v} min device-free`
                      : k === "block"
                      ? `${v} min block`
                      : k === "checks"
                      ? `≤${v} opens/day`
                      : v
                ).join(", ")
            }
          </span>
        </div>
        <div style={{
          fontSize: 15, color: "#927c0d", marginBottom: 9
        }}>
          Reward: {m.reward}
        </div>
        {m.unlocked && !m.completed && (
          <>
            {/* Gamified "habit stacking": complete today's step */}
            <button
              className="btn"
              style={{
                background: "#2E7D32",
                color: "#fff",
                padding: "8px 14px",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: 15,
                border: "none",
                boxShadow: "0 1px 6px #C7FFB8",
                marginBottom: 4,
                cursor: "pointer",
                marginRight: 8,
              }}
              onClick={() => handleCompleteDay(i)}
              tabIndex={0}
              disabled={locked || m.completed}
            >
              {`Finish Today (${m.progress + 1}/${m.daysRequired})`}
            </button>
            {/* Gamified feedback: was today easier or harder than expected? */}
            <span style={{ marginLeft: 8, fontSize: 13, color: "#E87A41" }}>
              Was it:{" "}
              <button
                onClick={() => handleUserFeedback(i, "easy")}
                style={{
                  color: "#FFD600",
                  background: "none",
                  border: "none",
                  fontWeight: 600,
                  marginRight: 2,
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
                disabled={locked}
                tabIndex={0}
              >
                Easier
              </button>
              /
              <button
                onClick={() => handleUserFeedback(i, "hard")}
                style={{
                  color: "#2E7D32",
                  background: "none",
                  border: "none",
                  fontWeight: 600,
                  marginLeft: 2,
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
                disabled={locked}
                tabIndex={0}
              >
                Harder
              </button>
              ?
            </span>
          </>
        )}
        {m.completed && (
          <span style={{
            color: "#FFD600",
            fontWeight: 700,
            marginTop: 7,
            fontSize: 15,
            display: "inline-block"
          }}>Milestone complete! 🎉 {m.reward}</span>
        )}
      </div>
    );
  }

  return (
    <div style={{paddingTop:24}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:20}}>
        <span style={{ fontSize: 54, marginRight: 14 }}>{mascot}</span>
        <div style={{flex: 1}}>
          <h2 style={{ margin: 0, fontWeight: 700, fontSize: 30 }}>
            Adaptive Detox Plan
          </h2>
          <p style={{
            color: "#789262",
            fontWeight: 500,
            fontSize: 15,
            marginBottom: 5
          }}>
            Ready to reduce screen time with habit stacking and playful milestones?
            Your plan adapts as you progress.<br/>
            {planStarted
              ? <span>
                  Progress: {Math.round(overallProgress * 100)}% <br/>
                  Completed: {completedPlans} milestone{completedPlans !== 1 ? "s" : ""}
                </span>
              : <>Start to see your personalized plan!</>
            }
          </p>
        </div>
      </div>
      {/* Progress bar */}
      <div style={{margin: "22px 0 7px"}}>
        <div style={{
          height: 13, background: "#E7F6EC", borderRadius: 9,
          width: "100%", overflow: "hidden", marginBottom: 4
        }}>
          <div style={{
            height: "100%",
            width: `${Math.round(overallProgress * 100)}%`,
            background: "linear-gradient(90deg, #2E7D32, #FFD600 92%)",
            transition: "width 0.8s cubic-bezier(.42,0,.18,1)"
          }} />
        </div>
        <div style={{color:"#789262", fontSize:14}}>
          {milestones.filter(m=>m.completed).length} / {milestones.length} milestones completed
        </div>
      </div>
      {!planStarted ? (
        <button
          className="btn btn-large"
          style={{
            marginTop: 23,
            background: "#FFD600",
            color: "#1A1A1A",
            fontWeight: 600,
            fontSize: 18,
            padding: "13px 40px",
            borderRadius: 15,
            border: "none",
            cursor: "pointer",
            letterSpacing: ".01em",
            boxShadow: "0 2px 10px #FFD60022"
          }}
          onClick={handlePlanStart}
          tabIndex={0}
        >
          Start Adaptive Plan
        </button>
      ) : (
        <div style={{
          marginTop: 26,
          marginBottom: 10,
        }}>
          <div style={{
            fontSize:16,
            fontWeight: 600,
            color: "#2E7D32",
            marginBottom: 6
          }}>
            Milestones
          </div>
          <div>
            {milestones.map((m,i)=>renderMilestone(m,i))}
          </div>
          {overallProgress === 1 && (
            <div style={{
              background: "#FFFDE7",
              borderRadius: 13,
              color: "#A69013",
              fontWeight: 700,
              padding: "18px 16px 13px 16px",
              textAlign: "center",
              fontSize: 17,
              marginTop: 14,
              border: "2px solid #FFD600"
            }}>
              🎉 Plan complete! Celebrate your progress offline or <span style={{color:"#2E7D32"}}>create a new plan</span> with tougher goals!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DetoxPlanPage;
