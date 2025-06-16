import React from "react";

/**
 * OFFLINE EVENT GENERATOR
 * Shows a list of real-world events or activities, mocking local filtering based on stubbed user location/interests.
 * Hardcoded example events. Supports future extension for real APIs/GPS data.
 */

// Example hardcoded events list
const mockEvents = [
  {
    title: "Sunset at Local Park",
    location: "Central Park, near the east gate",
    time: "Today, 7:30 PM",
    description: "Catch a beautiful sunset. Consider a short walk or a mindfulness break with friends or solo.",
    tags: ["Nature", "Relaxation"]
  },
  {
    title: "Farmer’s Market Visit",
    location: "Riverside Market",
    time: "Saturday, 8:00 AM - 1:00 PM",
    description: "Stock up on fresh produce and connect with the community. Enjoy live music on-site.",
    tags: ["Community", "Food"]
  },
  {
    title: "Book Club at City Library",
    location: "Main Library, Room 210",
    time: "Sunday, 3:00 PM",
    description: "Casual discussion of the monthly book pick; all are welcome, even if you haven’t finished reading.",
    tags: ["Social", "Learning"]
  },
  {
    title: "Yoga in the Park",
    location: "Hillcrest Green",
    time: "Tomorrow, 9:00 AM",
    description: "Free outdoor yoga session. Bring a mat and enjoy a tech-free start to your day.",
    tags: ["Wellness", "Fitness"]
  },
  {
    title: "Weekly Art Walk",
    location: "Downtown Art District",
    time: "Friday, 5:00 PM - 9:00 PM",
    description: "Explore local galleries and open studios during the weekly art event.",
    tags: ["Arts", "Exploration"]
  }
];

// Stub for location/interests logic (always returns true for simplicity)
function mockLocationFilter(event) {
  // Future: filter based on real location/interests
  return true;
}

// PUBLIC_INTERFACE
function OfflineEventGenerator() {
  // Simulate user preferences (stubbed)
  const userLocation = "Your City (stubbed)";
  const userInterests = ["Nature", "Community", "Wellness"]; // stubbed

  // Filtered list (no-op filter for now)
  const filteredEvents = mockEvents.filter(mockLocationFilter);

  return (
    <div
      style={{
        background: "#F1F7F4",
        borderRadius: 12,
        padding: "34px 24px 26px",
        boxShadow: "0 3px 14px rgba(44,127,67,0.04)",
        maxWidth: 580,
        margin: "34px auto",
        color: "#1A1A1A"
      }}
      aria-label="Offline Event Suggestions"
    >
      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 22,
            lineHeight: 1.18,
            color: "#2E7D32",
            marginBottom: 4
          }}
        >
          Offline Event Ideas
        </div>
        <div style={{ color: "#555", fontSize: 15.5, marginBottom: 5 }}>
          These local events and activity ideas are suggested for you
          <span style={{ color: "#FFD600", fontWeight: 600 }}> (based on your interests and location - stubbed)</span>.
          <br />
          Try exploring something outside your usual routine!
        </div>
        <div style={{
          fontSize: 13,
          color: "#789262",
        }}>
          (Location: {userLocation}; Interests: {userInterests.join(", ")})
        </div>
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {filteredEvents.map((event, i) => (
          <li
            key={event.title + event.time}
            style={{
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 1px 5px rgba(44,127,67,0.06)",
              marginBottom: i === filteredEvents.length - 1 ? 0 : 18,
              padding: "18px 16px 13px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 17, color: "#2E7D32", marginBottom: 3 }}>
              {event.title}
            </div>
            <div style={{ fontSize: 14.2, color: "#444", marginBottom: 3 }}>
              <span role="img" aria-label="location" style={{ marginRight: 4 }}>📍</span>
              {event.location}
              {"   "}
              <span role="img" aria-label="clock" style={{ marginLeft: 12, marginRight: 4 }}>🕒</span>
              {event.time}
            </div>
            <div style={{ fontSize: 14, color: "#1A1A1A", margin: "4px 0 8px" }}>
              {event.description}
            </div>
            <div style={{ fontSize: 12.5, color: "#FFD600", marginBottom: 2 }}>
              {event.tags && event.tags.map(tag => (
                <span key={tag} style={{
                  display: "inline-block",
                  background: "#FFF8E1",
                  color: "#A08519",
                  padding: "2.3px 9px",
                  borderRadius: 7,
                  marginRight: 8,
                  fontWeight: 500,
                  fontSize: 13
                }}>{tag}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <div style={{ fontSize: 13, color: "#789262", marginTop: 28, textAlign: "center" }}>
        Want more ideas? <span style={{ color: "#2E7D32", fontWeight: 500 }}>Try going tech-free for a while and notice new things around you!</span>
      </div>
    </div>
  );
}

export default OfflineEventGenerator;
