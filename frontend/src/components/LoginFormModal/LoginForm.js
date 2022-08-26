import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect, NavLink } from 'react-router-dom';
// import SignupFormModal from '../SignupFormModal';
import '../../css/LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // if (sessionUser) return (
  //   <Redirect to="/" />
  // );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data.message) setErrors([data.message]);
      });
  }

  return (
    <form className='login-form-container' onSubmit={handleSubmit}>
      <ul className='login-errors'>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
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
      <button type="submit">Log In</button>
      {/* <span>
      New user? <SignupFormModal/>
    </span> */}
    </form>
  );
}

export default LoginForm;
