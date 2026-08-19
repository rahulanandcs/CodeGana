import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TermsOfService.css';

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="tos-container">
      <div className="tos-glass-panel">
        {/* Header */}
        <header className="tos-header">
          <div className="tos-header-top">
            <div className="tos-badge">
              Community & Rules
            </div>
            <button className="back-btn" onClick={() => navigate('/')}>
              ← Back to Home
            </button>
          </div>

          <h1 className="tos-title">
            Terms of Service for <span className="brand-highlight">CodeGana</span>
          </h1>

          <p className="last-updated">
            <strong>Last Updated:</strong> August 18, 2026
          </p>
        </header>

        {/* Content Sections */}
        <div className="tos-content">
          <section>
            <h3>1. Welcome to CodeGana!</h3>
            <p>
              CodeGana is an interactive, browser based coding platform built to help 9 to 15 year olds learn Python through hands on challenges and game loops. By jumping into our quests or playing in the Arena, you’re agreeing to follow these simple rules.
            </p>
            <p>
              <strong>A Note for Parents & Teachers:</strong> Because CodeGana is designed for young learners, anyone under 18 needs a parent, legal guardian, or school teacher to go over these terms with them before using the platform.
            </p>
          </section>

          <section>
            <h3>2. Your Progress & Saving Data</h3>
            <p>
              Right now, CodeGana saves your coding progress, earned Experience Points (XP), daily streaks, and unlocked avatar gear directly inside your web browser. 
            </p>
            <ul>
              <li><strong>Keep Your Progress Safe:</strong> Since your data stays on your device, clearing your browser history or cache will wipe your saved level and gear. We can't restore lost local progress, so try not to clear site data if you want to keep your streak alive!</li>
              <li><strong>Future Accounts:</strong> When we launch cloud accounts down the road, students will be able to save their progress across different devices securely and privately.</li>
            </ul>
          </section>

          <section>
            <h3>3. Arena Mode & Code of Conduct</h3>
            <p>
              The Multiplayer Arena is a place to show off your skills, test your speed, and race against classmates. To make sure it stays fun and safe for everyone, here are our **Guard Rails of Conduct**:
            </p>
            <ul>
              <li><strong>Keep It Friendly:</strong> Trash talk, mean comments, or inappropriate usernames will get you kicked out of the match. Healthy competition only!</li>
              <li><strong>Play Fair:</strong> Using automated cheat scripts, hacking the scoreboards, or trying to trick the challenge checker isn't cool. Win your matches fair and square!</li>
            </ul>
          </section>

          <section>
            <h3>4. XP, Leveling Up & Avatar Gear</h3>
            <p>
              As you solve Python puzzles, you’ll earn Experience Points (XP) that you can spend in the shop to customize your mascot avatar with hats, glasses, and background glows.
            </p>
            <ul>
              <li><strong>Virtual Rewards Only:</strong> XP and avatar gear are just for fun inside CodeGana. They have no real world money value and cannot be bought, sold, or traded for real cash.</li>
              <li><strong>No Microtransactions:</strong> We do not ask you or your parents for real money to buy avatar items or skip coding challenges.</li>
            </ul>
          </section>

          <section>
            <h3>5. Writing & Running Code</h3>
            <p>
              When you write code on CodeGana, it runs directly inside your web browser using isolated execution tools. While our elephant mentor, Gana, is always there to catch errors and give you hints, you are still in control of the code you write.
            </p>
            <p>
              We do our best to catch freeze ups automatically, but we aren't responsible if an infinite loop you wrote temporarily slows down or crashes your browser tab.
            </p>
          </section>

          <section>
            <h3>6. Who Owns What?</h3>
            <p>
              <strong>Your Code is Yours:</strong> You keep full ownership of any original Python code you write to solve our challenges. 
            </p>
            <p>
              <strong>CodeGana Property:</strong> Everything else on the site, including Gana the Elephant, our dark-neon graphics, the learning puzzles, hint systems, and platform code belongs to CodeGana.
            </p>
          </section>

          <section className="contact-card">
            <h3>7. Got Questions?</h3>
            <p>
              If you, your parents, or your teachers have any questions about these rules or using CodeGana at school, drop us a line anytime!
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> <a href="mailto:codeganabiz@gmail.com" className="text-blue">codeganabiz@gmail.com</a></p>
              <p><strong>Subject:</strong> <em>Attn: Terms of Service / Question</em></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;