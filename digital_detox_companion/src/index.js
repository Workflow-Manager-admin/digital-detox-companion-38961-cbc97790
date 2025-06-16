import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

/**
 * Note: If you need to use PUBLIC_URL, always reference it as process.env.PUBLIC_URL
 * This ensures build compatibility.
 */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
