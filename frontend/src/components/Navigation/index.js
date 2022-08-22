import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';



const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to="/upload">
          <button>Upload</button>
        </NavLink>
        <ProfileButton user={sessionUser} />
      </>

    );
  } else {
    sessionLinks = (
      <>
        <div className='right-side-nav-buttons'>
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
          NotSOUNDCLOUD
        </button>
      </NavLink>
      {isLoaded && sessionLinks}
    </div>

  )
}

export default Navigation;
