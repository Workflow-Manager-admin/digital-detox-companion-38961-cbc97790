import React, { useState } from "react";

/**
 * EmergencyBypassModal
 * Modal/overlay shown when user tries to access a blocked app.
 * Asks user "Why are you opening this now?" and logs the chosen answer.
 */
// PUBLIC_INTERFACE
function EmergencyBypassModal({ open, onClose, appName }) {
  // Reason choices prescribed
  const reasons = [
    "I’m bored",
    "I need it",
    "I’m anxious",
    "Just a habit"
  ];
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Log selection to localStorage for later self-insight
  const handleSelect = (reason) => {
    setSelected(reason);
    // Storing as a log array to allow for future data mining
    const prev = JSON.parse(localStorage.getItem("bypass_reason_log") || "[]");
    prev.push({
      app: appName || null,
      reason,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("bypass_reason_log", JSON.stringify(prev));
    setSubmitted(true);
    // Optional: after short delay, dismiss modal automatically
    setTimeout(() => {
      setSubmitted(false);
      setSelected(null);
      if (onClose) onClose();
    }, 1100);
  };

  // Block background scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.title}>
          Why are you opening {appName ? <b>{appName}</b> : "this"} now?
        </div>
        <div style={styles.options}>
          {reasons.map((reason, i) => (
            <button
              key={reason}
              disabled={submitted}
              style={{
                ...styles.optionBtn,
                background: selected === reason ? "#FFD60022" : "#fff"
              }}
              onClick={() => handleSelect(reason)}
            >
              {reason}
            </button>
          ))}
        </div>
        {submitted && (
          <div style={styles.footerMsg}>
            Thank you for your honesty.
          </div>
        )}
        {!submitted && (
          <button
            onClick={onClose}
            style={styles.cancelBtn}
            disabled={submitted}
          >
            Cancel
          </button>
        )}
      </div>
      <div style={styles.bg} onClick={onClose} />
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed", zIndex: 3212, top: 0, left: 0,
    width: "100vw", height: "100vh", display: "flex",
    justifyContent: "center", alignItems: "center"
  },
  bg: {
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    background: "rgba(48, 56, 46, 0.22)", zIndex: 0
  },
  modal: {
    position: "relative",
    zIndex: 5,
    padding: "32px 24px 20px",
    background: "#fff",
    borderRadius: 16,
    width: 350,
    maxWidth: "90vw",
    boxShadow: "0 6px 48px rgba(70,90,60,.16)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontSize: 19,
    fontWeight: 600,
    marginBottom: 18,
    textAlign: "center",
    color: "#1A1A1A"
  },
  options: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 18
  },
  optionBtn: {
    background: "#fff",
    color: "#2E7D32",
    border: "1.5px solid #B2DFDB",
    borderRadius: 8,
    padding: "12px 0",
    fontSize: 16,
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.15s"
  },
  footerMsg: {
    fontSize: 15,
    color: "#13ad3a",
    fontWeight: 500,
    paddingTop: 7,
    paddingBottom: 8
  },
  cancelBtn: {
    marginTop: 2,
    padding: "9px 0",
    width: 110,
    background: "none",
    color: "#7d7d7d",
    border: "none",
    borderRadius: 5,
    fontSize: 15,
    cursor: "pointer"
  }
};

export default EmergencyBypassModal;
