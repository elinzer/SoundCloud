import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  // if (sessionUser) return <Redirect to="/" />;

  useEffect(() => {
    const errors = [];
    if (!email.includes('@')) errors.push('Email must be valid email address');
    if (email.length < 3) errors.push('Email must be valid email address');
    if (!email.includes('.com') || !email.includes('.co') || !email.includes('.io') || !email.includes('.net') || !email.includes('.')) errors.push('Email must be valid email')
    if (username.includes('@')) errors.push('Username cannot be an email address');
    if (username.length < 4) errors.push('Username must be at least 4 characters');
    if (password.length < 6 && confirmPassword < 6) errors.push('Password must be at least 6 characters');
    if (password != confirmPassword) errors.push('Confirm password must equal password');
    setValidationErrors(errors);
  }, [email, username, password])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validationErrors.length) {
      return alert('Cannot Submit');
    } else {
      dispatch(sessionActions.signUp({ firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && validationErrors) setValidationErrors(validationErrors);
        });

    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
