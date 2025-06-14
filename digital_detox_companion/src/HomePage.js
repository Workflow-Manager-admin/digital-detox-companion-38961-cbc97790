import React from "react";
import CommunityCircles from "./CommunityCircles";
import ParentTeenMode from "./ParentTeenMode";
import IntegrationsHub from "./IntegrationsHub";
import RewardsPage from "./RewardsPage";
import CheckInPage from "./CheckInPage";
import BuddySystemPage from "./BuddySystemPage";

// PUBLIC_INTERFACE
/**
 * HomePage
 * Digital Detox Companion Home page.
 * Features removed from the nav (circles, parent-teen, integrations, rewards, check-in, buddy system)
 * are presented here as distinct containers/sections, organized for quick access.
 */
export default function HomePage() {
  return (
    <div style={{ marginTop: 32, marginBottom: 34, display: "flex", flexDirection: "column", gap: 36 }}>
      <SectionCard title="Community Circles" id="circles">
        <CommunityCircles />
      </SectionCard>
      <SectionCard title="Parent-Teen Mode" id="parent-teen">
        <ParentTeenMode />
      </SectionCard>
      <SectionCard title="Integrations & Wellness Insights" id="integration">
        <IntegrationsHub />
      </SectionCard>
      <SectionCard title="Milestone Rewards" id="rewards">
        <RewardsPage />
      </SectionCard>
      <SectionCard title="Off-Grid Check-In" id="check-in">
        <CheckInPage />
      </SectionCard>
      <SectionCard title="Accountability Buddy" id="buddy-system">
        <BuddySystemPage />
      </SectionCard>
    </div>
  );
}

// Simple wrapper for a visually separated section/card
function SectionCard({ title, children, id }) {
  return (
    <section
      id={id}
      style={{
        background: "#F8FBF8",
        borderRadius: 16,
        boxShadow: "0 1.5px 9px #b2dfdb16",
        padding: "25px 3vw 10px 3vw",
        marginBottom: 12,
        border: "1px solid #e9f3ec"
      }}
    >
      {/* The children's components (actual features) have their own headings, so omit the card title */}
      {children}
    </section>
  );
}
