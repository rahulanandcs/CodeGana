import mascotGana from '../images/CGmascotLeft!.png';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Loading Python Engine..." }: LoadingSpinnerProps) {
  return (
    <div className="loading-screen-container">
      <div className="loading-content-card">
        {/* Ambient Background Glow */}
        <div className="spinner-glow-effect" />

        {/* Mascot & Spinner Combo */}
        <div className="spinner-mascot-wrapper">
          <div className="neon-spinner-ring" />
          <img src={mascotGana} alt="Gana Loading" className="spinner-mascot-img" />
        </div>

        {/* Dynamic Loading Message */}
        <h3 className="loading-title">{message}</h3>
        <p className="loading-subtitle">Initializing Pyodide WebAssembly Sandbox...</p>

        {/* Animated Progress Pulse */}
        <div className="loading-bar-track">
          <div className="loading-bar-fill" />
        </div>
      </div>
    </div>
  );
}