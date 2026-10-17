import { useNavigate } from 'react-router-dom';
import './NotFound.css';
import mascotGana from '../images/CGmascotLeft!.png';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <span className="error-code">404</span>
        <img src={mascotGana} alt="Gana confused" className="not-found-mascot" />
        <h1>Page Not Found</h1>
        <p>Looks like Gana accidentally debugged this route out of existence!</p>
        <button className="home-btn" onClick={() => navigate('/')}>
          Back to Safety
        </button>
      </div>
    </div>
  );
}