import { useState } from 'react';
import '../styles/TokenInput.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Using react-icons for Font Awesome

const TokenInput = ({ token, onTokenChange }) => {
  const [showToken, setShowToken] = useState(false);

  return (
    <div className="mb-3">
      <label htmlFor="token" className="form-label text-dark">
        Authentication Token:
      </label>
      <div className="position-relative">
        <input
          type={showToken ? 'text' : 'password'}
          id="token"
          value={token}
          onChange={(e) => onTokenChange(e.target.value)}
          placeholder="Enter your GoRest API token"
          className="form-control pe-5"
        />
        <button
          type="button"
          className="position-absolute top-50 end-0 translate-middle-y pe-3 text-muted hover-text-dark toggle-btn"
          onClick={() => setShowToken(!showToken)}
          aria-label={showToken ? 'Hide token' : 'Show token'}
        >
          {showToken ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
        </button>
      </div>
      <small className="form-text text-muted">
        Get your token from{' '}
        <a
          href="https://gorest.co.in/consumer/login"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover-underline"
        >
          GoRest.co.in
        </a>
      </small>
    </div>
  );
};

export default TokenInput;