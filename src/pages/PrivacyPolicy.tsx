import { Link } from 'react-router-dom';
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page-container">
      <div className="privacy-card">
        
        {/* Header */}
        <header className="privacy-header">
          <div className="privacy-header-top">
            <div className="privacy-badge">
              Trust & Safety
            </div>
            <Link to="/" className="back-home-link">
              ← Back to Home
            </Link>
          </div>

          <h1 className="privacy-title">
            Privacy Policy for <span className="brand-highlight">CodeGana</span>
          </h1>

          <div className="privacy-meta">
            <p><strong>Effective Date:</strong> August 18, 2026</p>
            <span></span>
            <p><strong>Last Updated:</strong> August 18, 2026</p>
          </div>
        </header>

        {/* Intro Banner */}
        <p className="privacy-intro">
          At <strong>CodeGana</strong>, we believe learning to code should be safe, transparent, and empowering. Because our platform is crafted for young builders (ages 9–15), protecting student privacy and strictly complying with <strong className="brand-highlight">COPPA</strong> and <strong className="brand-highlight">FERPA</strong> standards is built into our core foundation.
        </p>

        {/* Core Guarantees Box */}
        <div className="guarantee-box">
          <h3 className="guarantee-title">
            CodeGana Privacy Guarantees
          </h3>
          <ul className="guarantee-list">
            <li><span className="check-mark"></span> Zero Behavioral Ads or Data Selling</li>
            <li><span className="check-mark"></span> Minimal Data Collection (COPPA Ready)</li>
            <li><span className="check-mark"></span> No Public Social Profiling for Minors</li>
            <li><span className="check-mark"></span> Full Parent & Educator Data Ownership</li>
          </ul>
        </div>

        {/* Content Sections */}
        <div className="privacy-sections">
          
          <section className="privacy-section">
            <h2 className="section-heading">1. Information We Collect</h2>
            <p className="section-desc">
              We separate data collection into two distinct groups: <strong>Student Accounts</strong> (Children Under 13 / K-12 Learners) and <strong>Adult Accounts</strong> (Parents, Educators, & School Administrators).
            </p>
            
            <div className="content-stack">
              <div className="content-box">
                <h3 className="box-heading">A. Student Accounts (Minors / Under 13)</h3>
                <ul className="privacy-list">
                  <li><strong>Account Credentials:</strong> Non-PII usernames (e.g., <code className="inline-code">SwiftPanda42</code>) and encrypted passwords, or SSO credentials via Google Workspace for Education/Clever.</li>
                  <li><strong>Learning Progress:</strong> Completed Python challenges, test runner execution metrics, streak activity, avatar unlocks, and Arena game results.</li>
                  <li><strong>System Logs:</strong> Non-identifying operational telemetry required strictly to maintain system stability and run code execution safely.</li>
                  <li><strong>Match Share Statements:</strong> Shared battle victory summaries generated via the "Share Result" button are generated locally on your device and contain zero personal identifiers or user tracking data.</li>
                </ul>
                <div className="warning-callout">
                  <strong>What We DO NOT Collect:</strong> We do not collect full legal names, physical addresses, student phone numbers, precise geolocation, audio/video recordings, or social media handles.
                </div>
              </div>

              <div className="content-box">
                <h3 className="box-heading">B. Parent and Educator Accounts</h3>
                <ul className="privacy-list">
                  <li><strong>Account Details:</strong> Full name, school or institutional email address, school name/district, and encrypted password.</li>
                  <li><strong>Roster Management:</strong> Class names, assigned challenge sets, and student progress reports.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <h2 className="section-heading">2. How We Use Information</h2>
            <p className="section-desc">We use collected information strictly for legitimate educational purposes:</p>
            <ol className="privacy-ordered-list">
              <li><strong>Delivering the Learning Experience:</strong> Running Python code in real-time, computing test results, generating mascot-guided hints, and saving learning streaks.</li>
              <li><strong>Platform Functionality:</strong> Unlocking avatars, managing level progression, and running interactive Arena game sessions.</li>
              <li><strong>Teacher and Parent Dashboards:</strong> Enabling educators and parents to monitor student completion rates and mastery.</li>
              <li><strong>Security and Stability:</strong> Detecting technical bugs, preventing platform misuse, and ensuring safe code execution environments.</li>
            </ol>
          </section>

          <section className="privacy-section">
            <h2 className="section-heading">3. COPPA and FERPA Compliance</h2>
            <div className="content-stack">
              <div>
                <h3 className="sub-heading">A. Children’s Online Privacy Protection Act (COPPA)</h3>
                <p className="sub-text">
                  CodeGana operates under school consent provisions for educational deployments. When independent accounts are created outside of school ecosystems by children under 13, verifiable parental consent is required prior to account creation.
                </p>
              </div>
              <div>
                <h3 className="sub-heading">B. Family Educational Rights and Privacy Act (FERPA)</h3>
                <p className="sub-text">
                  CodeGana acts as a "School Official" with legitimate educational interests under FERPA when partnered with schools. Student educational records remain the direct property of the educational institution and are never monetized.
                </p>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <h2 className="section-heading">4. Data Security & Browser Execution</h2>
            <p className="section-desc">
              We maintain industry-standard physical, administrative, and technical safeguards:
            </p>
            <ul className="privacy-list">
              <li><strong>Data Encryption:</strong> All data transmitted is encrypted using standard TLS/SSL. Sensitive data rests behind encrypted databases guarded by Row-Level Security (RLS) policies.</li>
              <li><strong>Sandboxed Execution:</strong> Python execution runs in isolated Web Worker sandboxes inside the browser, preventing code from accessing platform infrastructure or local files.</li>
              <li><strong>Strict Access Controls:</strong> Personnel access to backend data is restricted strictly to support staff on a need-to-know basis.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="section-heading">5. Data Retention & Deletion Rights</h2>
            <p className="section-desc">
              Parents, legal guardians, and school administrators have the full right to review, request edits to, or permanently delete student records at any time.
            </p>
            <p className="sub-text">
              Accounts inactive for more than 12 consecutive months are automatically queued for permanent deletion or anonymization.
            </p>
          </section>

          <section className="contact-card">
            <h2 className="contact-heading">6. Contact Our Privacy Team</h2>
            <p className="contact-desc">
              If you have any questions regarding our COPPA compliance, data handling, or wish to submit a data deletion request, reach out directly:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> <a href="mailto:codeganabiz@gmail.com" className="privacy-link">codeganabiz@gmail.com</a></p>
              <p><strong>Subject Line:</strong> <em>Attn: Data Privacy Officer / COPPA Inquiry</em></p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}