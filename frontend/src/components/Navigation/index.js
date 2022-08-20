import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';



const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">
          <button className='create-acct-button'>
            Create account
          </button>
        </NavLink>
      </>
    );
  }
  return (
    <ul>
      <li>
        <NavLink exact to="/">
            <span className='home-icon'>
              NotSoundCloud
              </span>
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  )
}

export default Navigation;
