import React, { useState } from "react";

/**
 * OfflineEventGenerator
 * Page for suggesting real-world activities and local events based on user interests or location.
 * - Provides static sample suggestions by default
 * - Structured for optional future integration (Eventbrite/Meetup APIs, etc.)
 * - Branded, minimal UI for integration with the KAVIA theme
 * 
 * PUBLIC_INTERFACE
 */
function OfflineEventGenerator() {
  // Sample (static) user interests and fake location input
  const INTEREST_OPTIONS = [
    "Nature", "Wellness", "Art", "Food", "Volunteering", "Exercise", "Social", "Learning"
  ];
  const SAMPLE_EVENTS = [
    {
      title: "Community Park Picnic",
      interest: "Nature",
      location: "Central Park",
      summary: "Picnic and music with neighbors in the open air.",
      when: "This Saturday, 2pm",
      emoji: "🌳"
    },
    {
      title: "Sunrise Yoga by the Lake",
      interest: "Wellness",
      location: "Lakeview Gardens",
      summary: "Outdoor yoga for all levels, mats provided.",
      when: "Tomorrow, 7am",
      emoji: "🧘"
    },
    {
      title: "Gallery Art Walk",
      interest: "Art",
      location: "Arts District",
      summary: "Explore 12 local artists' new work with friends.",
      when: "Friday Evening",
      emoji: "🖼️"
    },
    {
      title: "Farmers Market Stroll",
      interest: "Food",
      location: "Downtown",
      summary: "Fresh food, samples, and live music outdoors.",
      when: "Sunday, 9am-1pm",
      emoji: "🍓"
    },
    {
      title: "Beach Cleanup Volunteer",
      interest: "Volunteering",
      location: "Seaside Beach",
      summary: "Help restore the shoreline and meet the community.",
      when: "Next Saturday, 8am",
      emoji: "🌊"
    },
    {
      title: "Running Club (5K social)",
      interest: "Exercise",
      location: "Riverside Trail",
      summary: "Meet new people and move your body.",
      when: "Wednesday, 6pm",
      emoji: "🏃"
    },
    {
      title: "Board Game Night",
      interest: "Social",
      location: "Hilltop Library",
      summary: "Unplug, make new friends — games for all ages.",
      when: "Friday, 7pm",
      emoji: "🎲"
    },
    {
      title: "Photography Basics Workshop",
      interest: "Learning",
      location: "City Studio",
      summary: "Bring any camera/phone, outdoors photo walk.",
      when: "Sunday, 3pm",
      emoji: "📸"
    },
  ];

  const [interest, setInterest] = useState("");
  const [location, setLocation] = useState("");
  // For demo: filter locally, prepare for future API call
  function getFilteredEvents() {
    return SAMPLE_EVENTS.filter(ev =>
      (interest === "" || ev.interest === interest) &&
      (location === "" || ev.location.toLowerCase().includes(location.toLowerCase()))
    );
  }
  const filteredEvents = getFilteredEvents();

  // Branded colors (matches KAVIA scheme/fallbacks)
  const COLORS = {
    primary: "var(--primary, #2E7D32)",
    accent: "var(--accent, #FFD600)",
    secondary: "var(--secondary, #B2DFDB)"
  };

  return (
    <section style={{ marginTop: 30, marginBottom: 26 }}>
      <h2 style={{
        color: COLORS.primary,
        fontSize: "2.08rem",
        fontWeight: 700,
        marginBottom: 8
      }}>
        Offline Event Generator
      </h2>
      <div style={{
        color: "#66777f", fontSize: "1.06rem", fontWeight: 500, marginBottom: 16
      }}>
        Discover real-world activities and nearby events tailored to your interests.
        Choose a category or update your location for local inspiration!
      </div>
      {/* Filters */}
      <div style={{
        background: "#F8FBF8",
        padding: "17px 20px 10px 20px",
        borderRadius: 13,
        boxShadow: "0 1.5px 12px #B2DFDB13",
        marginBottom: 16,
        display: "flex",
        flexWrap: "wrap",
        gap: 17,
        alignItems: "center"
      }}>
        <div>
          <label style={{ color: COLORS.primary, fontWeight: 600, fontSize: 15.3 }}>
            Area/Location&nbsp;
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. park, downtown…"
              style={{
                border: "1.2px solid #B2DFDB", borderRadius: 8,
                padding: "8px 11px", fontSize: 15, width: 150
              }}
            />
          </label>
        </div>
        <div>
          <label style={{ color: COLORS.primary, fontWeight: 600, fontSize: 15.3 }}>
            Interest&nbsp;
            <select
              value={interest}
              onChange={e => setInterest(e.target.value)}
              style={{
                border: "1.2px solid #B2DFDB", borderRadius: 8,
                padding: "8px 12px", fontSize: 15, minWidth: 120
              }}
            >
              <option value="">All</option>
              {INTEREST_OPTIONS.map(val => (
                <option value={val} key={val}>{val}</option>
              ))}
            </select>
          </label>
        </div>
        {/* Future/optional: Use device geolocation button */}
        {/* <button>Add "Use my location" (web geolocation) in future API build</button> */}
      </div>
      {/* Results List */}
      <div style={{ marginTop: 3 }}>
        {filteredEvents.length === 0 && (
          <div style={{
            color: "#748084",
            background: "#FDF8E7",
            borderRadius: 10,
            border: `1.5px solid ${COLORS.accent}`,
            padding: "14px 20px",
            fontWeight: 500,
            fontSize: 16,
            marginBottom: 6
          }}>
            No event suggestions found for your filters—try a different interest or explore another area!
          </div>
        )}
        <ul style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))",
          gap: 12
        }}>
          {filteredEvents.map((ev, idx) => (
            <li key={`${ev.title}-${idx}`} style={{
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              border: "1.2px solid #E2EFE4",
              borderRadius: 13,
              padding: "20px 18px 18px",
              boxShadow: "0 2px 7px #b2dfdb09",
              color: COLORS.primary,
              minHeight: 110
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                <span style={{ fontSize: 29, marginRight: 3 }}>{ev.emoji}</span>
                <span style={{ fontWeight: 600, fontSize: 17 }}>
                  {ev.title}
                </span>
              </div>
              <div style={{ color: "#869180", fontWeight: 400, fontSize: 14, marginTop: 5 }}>
                {ev.summary}
              </div>
              <div style={{
                color: "#B1BAA8", fontSize: 13, marginTop: 4
              }}>
                {ev.location} &bull; <span style={{ color: COLORS.accent }}>{ev.when}</span>
              </div>
              <div style={{
                marginTop: 9,
                color: "#7e7227",
                fontWeight: 500,
                fontSize: 12.8,
                background: "#FFFBEC",
                borderRadius: 6,
                padding: "3px 11px",
                alignSelf: "flex-start"
              }}>
                {ev.interest}
              </div>
              {/* Optional: In future, add RSVP/links if integrating real event APIs */}
            </li>
          ))}
        </ul>
      </div>
      {/* Integration note for future builds */}
      <div style={{
        marginTop: 23, color: "#8d999b", fontSize: 14, marginBottom: 8, fontStyle: "italic"
      }}>
        Want more personalized options or live events? In a future build, this page can connect to real-time sources like Eventbrite, Meetup, or community APIs.
      </div>
      <div style={{
        margin: "20px 0 0 0", color: COLORS.primary, fontSize: 15.3, textAlign: "center", fontWeight: 500
      }}>
        Step away from your screen — adventure is closer than you think!
      </div>
    </section>
  );
}

export default OfflineEventGenerator;
