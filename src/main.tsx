import { BrowserRouter } from "react-router-dom"
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import './index.css'
import App from './App.tsx'
import "./styles/topNavbar.css"

// Zero-PII Sentry Initialization for COPPA/FERPA Compliance
Sentry.init({
  dsn: "https://de123279454de6d164405663f97a06df@o4511938986835968.ingest.us.sentry.io/4511939005579264", // Replace with your Sentry DSN key
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.2,

  /* Privacy & Anonymization Guards */
  sendDefaultPii: false,
  beforeSend(event) {
    if (event.user) {
      delete event.user.ip_address
      delete event.user.email
      delete event.user.username
    }
    if (event.request?.url) {
      event.request.url = event.request.url.split('?')[0]
    }
    return event
  },
})

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// git add .
// git commit -m "Your description here"
// git push origin main