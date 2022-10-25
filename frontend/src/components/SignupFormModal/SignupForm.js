import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import '../../css/SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    const errors = [];
    if (email.length < 3 || !(email.includes('.com') || email.includes('.co') || email.includes('.io') || email.includes('.net'))) errors.push('Email must be valid email');
    if (username.includes('@')) errors.push('Username cannot be an email address');
    if (username.length < 4) errors.push('Username must be at least 4 characters');
    if (password.length < 6) errors.push('Password must be at least 6 characters');

    setValidationErrors(errors);
  }, [email, username, password])

  const handleSubmit = (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (validationErrors.length) {
      return alert('Please fix errors before submitting');
    } else {
      dispatch(sessionActions.signUp({ firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data.errors) setValidationErrors([data.errors.email]);
        });
    }
  };

  return (
    <div className="sign-up-form-container">
      <h3>Join NotSoundCloud</h3>
      {hasSubmitted && validationErrors.length > 0 && (
        <ul className="errors-list">
        {validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      )}
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='signup-button' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
