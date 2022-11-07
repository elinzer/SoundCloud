import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import UploadPage from './components/UploadPage';
import SongPage from './components/SongPage';
import Library from './components/HomePage/Library.js';
import * as songActions from './store/songs';
import Player from './components/Player/Player';
import * as albumActions from './store/albums';
import AlbumDetail from './components/Albums/AlbumDetail';

function App() {
  const dispatch = useDispatch();
  const [songAudio, setSongAudio] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
      dispatch(songActions.getSongs());
      dispatch(albumActions.getAlbums());
  }, [dispatch])

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage audioProp={[songAudio, setSongAudio]} />
          </Route>
          <Route path='/upload'>
            <UploadPage />
          </Route>
          <Route path='/songs/:id'>
            <SongPage audioProp={[songAudio, setSongAudio]} />
          </Route>
          <Route path='/albums/:id'>
            <AlbumDetail />
          </Route>
          <Route path='/library'>
            <Library audioProp={[songAudio, setSongAudio]} />
          </Route>
          <Route>
            <h2>404 - Sorry, there's nothing here!</h2>
          </Route>
        </Switch>
      )}
      <Player audioProp={[songAudio, setSongAudio]} />
    </>
  );
}

export default App;
