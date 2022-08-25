import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import '../../css/Navigation.css';



const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);


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
          <button>Demo User</button>
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
