
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Redirect from /admin/dashboard to /admin/offers if that's the current URL
if (window.location.pathname === '/admin/dashboard') {
  window.location.href = '/admin/offers';
}

createRoot(document.getElementById("root")!).render(<App />);
