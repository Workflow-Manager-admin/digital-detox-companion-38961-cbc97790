import React from "react";

/**
 * HomePage
 * PUBLIC_INTERFACE
 *
 * Welcoming landing page for Digital Detox Companion.
 * - Features an engaging app description, user cases, and a unique features list.
 * - Uses the theme: primary (#2E7D32), secondary (#B2DFDB), accent (#FFD600).
 * - Clean, friendly, brand-aligned design.
 */
function HomePage() {
  const COLORS = {
    primary: "#2E7D32",
    secondary: "#B2DFDB",
    accent: "#FFD600",
    text: "#1A1A1A",
    bg: "#fff",
  };

  // User-case scenarios
  const userCases = [
    {
      icon: "🌳",
      title: "Rediscover Offline Joys",
      desc: "People seeking to reclaim spare moments for walks, hobbies, and friendships instead of endless scrolling.",
    },
    {
      icon: "🤝",
      title: "Support & Accountability",
      desc: "Anyone who values a little encouragement, anonymous buddy support, or a fun nudge to stay on track.",
    },
    {
      icon: "🎯",
      title: "Personalized, Gentle Detox",
      desc: "Those who want gradual, positive change without rigid restrictions but with real-world rewards.",
    },
  ];

  // Expanded unique features display
  const features = [
    {
      icon: "🗺️",
      name: "Custom Detox Plans",
      desc: "Plans tailored to your habits and goals—flexible, achievable, and built for real impact.",
    },
    {
      icon: "🤫",
      name: "Anonymous Buddy Pairing",
      desc: "Pair with a mystery ally for mutual motivation, streak tracking, and pep talks.",
    },
    {
      icon: "✅",
      name: "Offline Check-Ins",
      desc: "Earn points by logging off and checking in to real-world activities—your progress, lived.",
    },
    {
      icon: "🧠",
      name: "AI Reflection Journal",
      desc: "Gentle prompts transform reflections into fresh insights for healthier digital habits.",
    },
    {
      icon: "🎁",
      name: "Real-World Rewards!",
      desc: "Celebrate milestones with coffee vouchers, mini adventure passes, and more—because success deserves a treat.",
    },
    {
      icon: "👨‍👩‍👧",
      name: "Family & Group Modes",
      desc: "Go solo, partner up, or invite your family/circle for shared progress and challenges.",
    },
  ];

  return (
    <section
      style={{
        margin: "0 auto",
        maxWidth: 860,
        background: COLORS.bg,
        color: COLORS.text,
        borderRadius: 16,
        padding: "38px 19px 28px",
        boxShadow: "0 2px 20px 0 rgba(44,125,50,0.042)",
        marginTop: 52,
        marginBottom: 38,
        position: "relative"
      }}
      aria-label="Home page: Digital Detox Companion"
    >
      {/* Header with logo/icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginBottom: 13,
        }}
      >
        <span
          style={{
            background: COLORS.accent,
            borderRadius: "50%",
            width: 55,
            height: 55,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 700,
            color: COLORS.primary,
            boxShadow: `0 2px 18px 0 ${COLORS.accent}44`
          }}
          aria-hidden="true"
        >
          💡
        </span>
        <div>
          <h1
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              color: COLORS.primary,
              margin: 0,
              letterSpacing: ".018em"
            }}
          >
            Digital Detox Companion
          </h1>
          <div
            style={{
              fontSize: "1.08rem",
              color: COLORS.secondary,
              marginTop: 1,
              fontWeight: 600,
              letterSpacing: "0.01em"
            }}
          >
            Your journey, beyond the screen.
          </div>
        </div>
      </div>

      {/* Engaging Description */}
      <p
        style={{
          fontSize: "1.25rem",
          color: "#517568",
          maxWidth: 730,
          fontWeight: 500,
          marginBottom: 14,
          lineHeight: 1.56,
        }}
      >
        Digital Detox Companion is your supportive guide to healthier tech habits. Our friendly app creates a step-by-step plan to help you spend less time on social media and more time living—pair with a buddy, unlock real-life rewards, and reflect on your wins, all at your pace. No shame. Just encouragement, playfulness, and progress.
      </p>

      {/* User Case Scenarios */}
      <h2 style={{ color: COLORS.primary, fontSize: "1.19rem", marginTop: 34, marginBottom: 3, fontWeight: 700, letterSpacing: ".01em" }}>
        Who is this for?
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 17,
          marginBottom: 10,
          marginTop: 5
        }}
      >
        {userCases.map((c) => (
          <div key={c.title}
            style={{
              background: COLORS.secondary,
              color: COLORS.primary,
              borderRadius: 13,
              padding: "14px 19px",
              fontWeight: 500,
              fontSize: "1.06rem",
              boxShadow: "0 1px 7px #b2dfdb13",
              flex: "1 1 210px",
              minWidth: 210,
              marginBottom: 7,
              display: "flex",
              alignItems: "start",
              gap: 10
            }}
          >
            <span style={{ fontSize: 25, marginTop: 1 }}>{c.icon}</span>
            <span>
              <b style={{ fontWeight: 700 }}>{c.title}</b>
              <br />
              <span style={{ fontWeight: 500, color: "#426047" }}>{c.desc}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Unique Features */}
      <h2 style={{ color: COLORS.primary, fontSize: "1.18rem", marginTop: 27, marginBottom: 9, fontWeight: 700 }}>
        What makes us unique?
      </h2>
      <ul style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(275px, 1fr))",
        gap: 18,
        listStyle: "none",
        margin: 0,
        padding: 0,
        maxWidth: 970,
        fontSize: "1.04rem",
        color: COLORS.text,
      }}>
        {features.map((f, i) => (
          <li key={f.name} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 13,
            background: "#F8FBF8",
            borderRadius: 11,
            padding: "13px 15px 12px 15px",
            boxShadow: "0 1px 6px #B2DFDB0c",
            fontWeight: 500,
            minHeight: 72
          }}>
            <span
              aria-hidden="true"
              style={{
                fontSize: 23,
                marginTop: 4,
                color: COLORS.accent,
                fontWeight: 700,
              }}
            >{f.icon}</span>
            <span>
              <b style={{ fontWeight: 700, color: COLORS.primary }}>{f.name}</b>
              <br /><span style={{ color: "#517568" }}>{f.desc}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* Motivational CTA / Footer */}
      <div style={{
        marginTop: 32,
        background: "#FFFDE7",
        borderRadius: 11,
        color: "#A69013",
        fontWeight: 600,
        fontSize: 16,
        padding: "18px 20px 15px 20px",
        textAlign: "center",
        letterSpacing: ".01em",
        boxShadow: "0 0px 15px #ffd60012"
      }}>
        Ready to unplug? <span style={{ color: COLORS.primary, fontWeight: 700 }}>Start a plan, connect with a buddy, and celebrate your real-world wins!</span>
      </div>
    </section>
  );
}

export default HomePage;
