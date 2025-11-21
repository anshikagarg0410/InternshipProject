// khushisgh01/internshipproject/InternshipProject-8a5f69cd629fc2efec8342b72121374131129261/src/main.jsx

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
// REMOVED: import { AuthProvider } from './context/AuthContext' 

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* REMOVED: AuthProvider wrapper */}
    <App />
  </React.StrictMode>
)