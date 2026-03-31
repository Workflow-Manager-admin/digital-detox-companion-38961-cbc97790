import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Fix for PUBLIC_URL
// React expects process.env.PUBLIC_URL, not just PUBLIC_URL

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
