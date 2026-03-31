import React from "react";

/**
 * EmergencyBypassModal
 * Modal dialog to gently intercept digital detox bypass attempts.
 * Prompts user for reason, serving as a mindful pause.
 * 
 * Props:
 *   open: Boolean (shows/hides the modal)
 *   onSelectReason: Function(reasonString) - called when user selects a reason/reflection
 *   onClose: Function - called to dismiss/cancel the modal
 * 
 * PUBLIC_INTERFACE
 */
export function EmergencyBypassModal({ open, onSelectReason, onClose }) {
  if (!open) return null;

  // Branded color CSS vars fallback
  const COLORS = {
    primary: "var(--primary, #2E7D32)",
    accent: "var(--accent, #FFD600)",
    secondary: "var(--secondary, #B2DFDB)"
  };

  // List of mindful reflection options
  const reasons = [
    { label: "Bored", emoji: "😐" },
    { label: "I need it", emoji: "🔍" },
    { label: "I'm anxious", emoji: "😬" },
    { label: "Just a habit", emoji: "🔁" },
    { label: "Other", emoji: "..." }
  ];

  return (
    <div style={modalStyle}>
      <div style={modalInnerStyle}>
        <h3 style={{ color: COLORS.primary, marginTop: 0, fontWeight: 700 }}>
          Mindful Pause
        </h3>
        <div style={{ color: "#476047", fontSize: "1.11rem", margin: "0 0 10px 0" }}>
          Before you bypass, take a moment:
        </div>
        <div style={{ fontWeight: 600, color: COLORS.accent, fontSize: 17, marginBottom: 13 }}>
          Why are you opening this now?
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 16 }}>
          {reasons.map(r => (
            <button key={r.label}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#EFFBFC",
                border: `1.2px solid ${COLORS.secondary}`,
                borderRadius: 7,
                fontWeight: 500,
                fontSize: 17,
                color: COLORS.primary,
                padding: "9px 15px",
                margin: 0,
                cursor: "pointer",
                boxShadow: "0 1.5px 6px 0 #b2dfdb12"
              }}
              onClick={() => onSelectReason(r.label)}
            >
              <span style={{ fontSize: 22, marginRight: 13 }}>{r.emoji}</span>
              {r.label}
            </button>
          ))}
        </div>
        <button
          style={{
            background: "none",
            color: COLORS.primary,
            border: `1.1px solid ${COLORS.secondary}`,
            borderRadius: 7,
            padding: "8px 16px",
            fontWeight: 500,
            fontSize: 15,
            cursor: "pointer"
          }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// Simple React hook to use EmergencyBypassModal in parent components
// Returns: [showModal, openModal(), closeModal(), renderModal(onSelected)]
// PUBLIC_INTERFACE
export function useEmergencyBypassModal() {
  const [open, setOpen] = React.useState(false);
  function openModal() { setOpen(true); }
  function closeModal() { setOpen(false); }

  // Render callback expects (onSelect, onClose)
  function renderModal(onSelect, onCloseHandler) {
    return (
      <EmergencyBypassModal
        open={open}
        onSelectReason={reason => {
          setOpen(false);
          if (onSelect) onSelect(reason);
        }}
        onClose={() => {
          setOpen(false);
          if (onCloseHandler) onCloseHandler();
        }}
      />
    );
  }
  return [open, openModal, closeModal, renderModal];
}

// Minimal modal styling (brand-matched)
const modalStyle = {
  position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
  background: "rgba(44,60,46,0.13)", display: "flex", alignItems: "center",
  justifyContent: "center", zIndex: 4100
};
const modalInnerStyle = {
  background: "#fff",
  padding: "32px 25px 19px",
  borderRadius: 13,
  boxShadow: "0 3px 30px #B2DFDB22",
  minWidth: 275,
  minHeight: 150,
  maxWidth: 380,
  textAlign: "center"
};

export default EmergencyBypassModal;
