import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import UploadPage from './components/UploadPage';
import SongPage from './components/SongPage';
import ReactAudioPlayer from 'react-audio-player';
import './css/AudioPlayer.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/upload'>
            <UploadPage />
          </Route>
          <Route path='/songs/:id'>
            <SongPage />
          </Route>
        </Switch>
      )}
      <ReactAudioPlayer className='audioPlayer' controls={true}/>
    </>
  );
}

export default App;
