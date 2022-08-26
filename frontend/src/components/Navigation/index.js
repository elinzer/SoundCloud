import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import '../../css/Navigation.css';
import * as sessionActions from '../../store/session';

const Navigation = ({ isLoaded }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const credential = 'DemoUser';
  const password = 'password';

  const logInDemo = () => {
    return dispatch(sessionActions.login({ credential, password }))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to="/upload">
          <button>
          <i className="fa-solid fa-arrow-up-from-bracket"></i>
            <span> Upload</span></button>
        </NavLink>
        <ProfileButton user={sessionUser} />
      </>

    );
  } else {
    sessionLinks = (
      <>
        <div className='right-side-nav-buttons'>
          <button className='demo-button' onClick={logInDemo}>Demo User</button>
          <LoginFormModal />
          <SignupFormModal />
        </div>
      </>
    );
  }
  return (
    <div className='nav-bar'>
      <NavLink exact to="/">
        <button className='home-icon'>
        <i className="fa-solid fa-headphones-simple" />
          <span> NotSOUNDCLOUD</span>
        </button>
      </NavLink>
      {isLoaded && sessionLinks}
    </div>

  )
}

export default Navigation;
