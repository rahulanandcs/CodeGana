import { useNavigate } from 'react-router-dom';
import './NotFound.css'; // Reuses your existing 404 styling

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-card" style={{ borderColor: '#b2f65f' }}>
        <h1 style={{ color: '#b2f65f', margin: 0 }}>Message Received!</h1>
        <p style={{ margin: '1.5rem 0' }}>
          Thanks for reaching out to the CodeGana team. We've queued your message and will get back to you shortly!
        </p>
        <button className="home-btn" onClick={() => navigate('/')}>
          Return Home
        </button>
      </div>
    </div>
  );
}