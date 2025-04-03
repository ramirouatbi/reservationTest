import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MeetingScheduler from './MeetingScheduler.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MeetingScheduler />
  </StrictMode>,
)
