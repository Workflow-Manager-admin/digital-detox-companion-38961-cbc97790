import React, { useState } from "react";

/**
 * IntegrationsHub
 * - Provides minimal, distraction-free UI for:
 *    - Calendar time blocking (Google/Apple Calendar integration, or offline block schedule)
 *    - Spotify focus playlists (suggested curated playlists, mock/offline mode, no active playback)
 *    - Health stats sync (demo: mock stats for steps, sleep, screen time correlation)
 * Each integration offers simple connection or mock/simulated data, with calls to action to spend more time offline.
 * PUBLIC_INTERFACE
 */
export default function IntegrationsHub() {
  const [calendarSynced, setCalendarSynced] = useState(false);
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [healthSynced, setHealthSynced] = useState(false);

  // DEMO: Simulated calendar time blocks (offline focus sessions)
  const calendarBlocks = [
    { id: 1, title: "Offline Focus", start: "Today 6-7pm", type: "Focus Block" },
    { id: 2, title: "Nature Walk", start: "Saturday 10-11am", type: "Activity" }
  ];
  // DEMO: Mock or curated Spotify playlists
  const playlists = [
    { id: 1, name: "Nature Focus: Birdsong", desc: "Gentle nature background for deep focus.", type: "offline-ready" },
    { id: 2, name: "Mindful Piano", desc: "Calming instrumentals for distraction-free work.", type: "focus" },
    { id: 3, name: "Lo-fi Chill (Offline)", desc: "Download and play during offline blocks.", type: "offline-ready" }
  ];
  // DEMO: Health stat samples (steps, sleep, and screen time correlation)
  const stats = {
    steps: 8212,
    sleep: 7.3,
    screen: 93, // Screen time in min
    sleepByScreen: [
      { label: "<90m", sleep: 7.7 },
      { label: "90-120m", sleep: 7.0 },
      { label: "120m+", sleep: 6.2 }
    ]
  };

  // KAVIA brand colors
  const COLORS = {
    primary: "var(--primary, #2E7D32)",
    accent: "var(--accent, #FFD600)",
    secondary: "var(--secondary, #B2DFDB)"
  };

  return (
    <section style={{ marginTop: 28, marginBottom: 32 }}>
      <h2 style={{
        color: COLORS.primary,
        fontSize: "2.08rem",
        fontWeight: 700,
        marginBottom: 10
      }}>
        Integrations & Wellness Insights
      </h2>

      {/* --------- Calendar Time Blocking --------- */}
      <IntegrationBox title="Calendar Time Blocks" icon="🗓️">
        <div style={{ fontWeight: 500, marginBottom: 7, color: COLORS.primary }}>
          Block offline sessions in your calendar for deep focus!
        </div>
        {calendarSynced ? (
          <div style={{ marginBottom: 11 }}>
            <span style={{
              fontWeight: 600,
              color: COLORS.accent,
              marginRight: 6
            }}>Synced with Google/Apple Calendar</span>
            <span style={{
              background: "#F8FBF8", color: COLORS.primary, borderRadius: 8, padding: "4px 9px", fontSize: 14, marginLeft: 6
            }}>Demo: showing mock data only</span>
            <ul style={{ marginTop: 10, marginBottom: 0, padding: 0, listStyle: "none" }}>
              {calendarBlocks.map(b =>
                <li key={b.id} style={{
                  background: "#fff",
                  border: "1px solid #B2DFDB", borderRadius: 7,
                  marginBottom: 7, padding: "7px 13px", fontSize: 15,
                  display: "flex", alignItems: "center", gap: 14
                }}>
                  <span style={{ fontSize: 18, color: COLORS.primary, marginRight: 3 }}>📵</span>
                  <span>{b.title}</span>
                  <span style={{ marginLeft: "auto", color: "#B3B5A9", fontWeight: 400, fontSize: 14 }}>
                    {b.start}
                  </span>
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div style={{ marginBottom: 11 }}>
            <button
              style={{
                background: COLORS.primary, color: "#fff", border: "none", borderRadius: 7,
                padding: "8px 22px", fontWeight: 600, fontSize: 15, cursor: "pointer", marginBottom: 6
              }}
              onClick={() => setCalendarSynced(true)}
            >Sync Google/Apple Calendar</button>
            <div style={{
              color: COLORS.secondary, marginTop: 7, fontSize: 14
            }}>Or block offline sessions in-app:</div>
            <button
              style={{
                background: COLORS.accent, color: "#244e24", border: "none", borderRadius: 7,
                padding: "6px 17px", fontWeight: 500, marginTop: 6, cursor: "pointer", fontSize: 14
              }}
              onClick={() => alert("Demo: Add a new focus block (not integrated).")}
            >Add Focus Block</button>
          </div>
        )}
        <div style={{ color: "#b49a26", fontSize: 14, fontWeight: 500 }}>
          Tip: Treat these time blocks as appointments with your offline self!
        </div>
      </IntegrationBox>

      {/* --------- Spotify Focus Playlists --------- */}
      <IntegrationBox title="Spotify Focus Playlists" icon="🎶">
        <div style={{ fontWeight: 500, marginBottom: 7, color: COLORS.primary }}>
          Support your digital detox with curated Spotify playlists for focus and relaxation.
        </div>
        {spotifyConnected ? (
          <>
            <span style={{ fontWeight: 600, color: COLORS.accent, marginBottom: 7, display: "inline-block" }}>Connected to Spotify (demo copy, not playing music)</span>
            <ul style={{
              listStyle: "none", padding: 0, margin: "7px 0 0 0", display: "flex", flexWrap: "wrap", gap: 17
            }}>
              {playlists.map(p => (
                <li key={p.id} style={{
                  background: "#fffbe8", border: `1.5px solid ${COLORS.accent}`,
                  borderRadius: 8, minWidth: 145, padding: "10px 12px", fontSize: 15, fontWeight: 500,
                  color: COLORS.primary, marginBottom: 3, flex: 1
                }}>
                  <span style={{ letterSpacing: 0.01, fontSize: 15.3 }}>{p.name}</span>
                  <div style={{ color: "#9AADA6", fontWeight: 400, fontSize: 13, marginTop: 3 }}>
                    {p.desc}
                  </div>
                  <span style={{
                    display: "inline-block", marginTop: 5, color: COLORS.accent, fontSize: 12.5, fontWeight: 700
                  }}>
                    {p.type === "offline-ready" ? "Offline Ready" : "Focus"}
                  </span>
                </li>
              ))}
            </ul>
            <div style={{ color: "#b49a26", fontSize: 14, marginTop: 8 }}>
              Download in Spotify and play during offline blocks (the app does not play music).
            </div>
          </>
        ) : (
          <div>
            <button
              style={{
                background: COLORS.primary, color: "#fff", border: "none", borderRadius: 7,
                padding: "8px 22px", fontWeight: 600, fontSize: 15, cursor: "pointer", marginBottom: 6
              }}
              onClick={() => setSpotifyConnected(true)}
            >Connect Spotify</button>
            <div style={{ color: "#b49a26", fontSize: 14 }}>
              Or browse suggested playlists below after connecting (no playback, demo only).
            </div>
          </div>
        )}
      </IntegrationBox>

      {/* --------- Health Stats Sync --------- */}
      <IntegrationBox title="Health Stats Sync" icon="💖">
        <div style={{ fontWeight: 500, marginBottom: 7, color: COLORS.primary }}>
          Connect your health data for insights on habits and wellness.
        </div>
        {healthSynced ? (
          <div>
            <div style={{
              color: COLORS.accent, fontWeight: 600, marginBottom: 6
            }}>Health stats synced! (demo data only)</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 25, marginBottom: 10 }}>
              <div>
                <div style={{ color: COLORS.primary, fontWeight: 500, fontSize: 14 }}>Steps Today:</div>
                <div style={{ fontSize: 23, fontWeight: 700, color: COLORS.accent }}>{stats.steps}</div>
              </div>
              <div>
                <div style={{ color: COLORS.primary, fontWeight: 500, fontSize: 14 }}>Hours Slept:</div>
                <div style={{ fontSize: 23, fontWeight: 700, color: COLORS.accent }}>{stats.sleep}</div>
              </div>
              <div>
                <div style={{ color: COLORS.primary, fontWeight: 500, fontSize: 14 }}>Screen Time:</div>
                <div style={{ fontSize: 23, fontWeight: 700, color: COLORS.accent }}>{stats.screen} min</div>
              </div>
            </div>
            {/* Correlation mini-insight */}
            <div style={{ background: "#F8FBF8", borderRadius: 7, padding: "7px 13px", color: "#6e7c6c", fontSize: 14.2, marginBottom: 7 }}>
              <b>Sleep ↔️ Screen Time:</b>
              <ul style={{ listStyle: "none", padding: 0, margin: "6px 0 0 0" }}>
                {stats.sleepByScreen.map((d, idx) =>
                  <li key={d.label} style={{ marginBottom: 2 }}>
                    <span style={{ color: COLORS.primary, fontWeight: 600 }}>{d.label} screen:</span>{" "}
                    <span style={{ color: COLORS.accent, fontWeight: 600 }}>{d.sleep}h sleep</span>
                  </li>
                )}
              </ul>
            </div>
            <div style={{ color: "#b49a26", fontSize: 14, fontWeight: 500 }}>
              Notice your energy shift as your screen time drops!
            </div>
          </div>
        ) : (
          <div>
            <button
              style={{
                background: COLORS.primary, color: "#fff", border: "none", borderRadius: 7,
                padding: "8px 22px", fontWeight: 600, fontSize: 15, cursor: "pointer", marginBottom: 6
              }}
              onClick={() => setHealthSynced(true)}
            >Sync Health Data</button>
            <div style={{
              color: COLORS.secondary, marginTop: 7, fontSize: 14
            }}>This is a demo - connect Apple Health / Google Fit on mobile for real data in future builds.</div>
          </div>
        )}
      </IntegrationBox>
      <div style={{
        color: "#819c7b", fontSize: 14, fontStyle: "italic", marginTop: 20, marginBottom: 5, textAlign: "center"
      }}>
        Digital balance comes from real-world rhythms. Close this screen and enjoy life offline!
      </div>
    </section>
  );
}

// Simple Integration section box with a title/icon
function IntegrationBox({ title, icon, children }) {
  return (
    <div style={{
      background: "#EFFBFC", borderRadius: 12, padding: "18px 16px 16px 16px",
      marginBottom: 23, boxShadow: "0 1px 7px #B2DFDB14", maxWidth: 670
    }}>
      <div style={{
        fontWeight: 700, fontSize: 17.5, color: "var(--primary, #2E7D32)",
        marginBottom: 6, display: "flex", alignItems: "center", gap: 9
      }}>
        <span style={{ fontSize: 23 }}>{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}
