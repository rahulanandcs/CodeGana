import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CookieBanner.css';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('codegana_privacy_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('codegana_privacy_consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        CodeGana uses local browser storage to save your XP, level streak, and avatar gear. We do <strong>not</strong> track or sell your personal data. Learn more in our{' '}
        <Link to="/privacy">Privacy Policy</Link>.
      </p>
      <button onClick={handleAccept}>Got it!</button>
    </div>
  );
}