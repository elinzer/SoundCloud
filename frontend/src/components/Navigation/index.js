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
        <div>
          <NavLink to='/library'><button className='library-button'>Library</button></NavLink>
          <NavLink to="/upload">
            <button className='upload-button'>
              <i className="fa-solid fa-arrow-up-from-bracket" />
              <span> Upload</span></button>
          </NavLink>
          <ProfileButton user={sessionUser} />
        </div>
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
      <div className='about-dev'>
        <div className='about-button-outer'> Project
          <div className='about-button'><a className='dev-link' href="https://github.com/elinzer/SoundCloud" target="_blank"><i className="fa-brands fa-github"></i></a></div>
        </div>
        <div className='about-button-outer'>Contact the Dev
          <div className='inner-about-buttons'>
            <div className='about-button'><a className='dev-link' href="https://linkedin.com/in/elinzer" target="_blank"><i class="fa-brands fa-linkedin"></i></a></div>
            <div className='about-button'><a className='dev-link' href="https://github.com/elinzer" target="_blank"><i className="fa-brands fa-github"></i></a></div>
          </div>
        </div>
      </div>
      {isLoaded && sessionLinks}
    </div>

  )
}

export default Navigation;
