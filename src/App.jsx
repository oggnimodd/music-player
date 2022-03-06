import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppWrapper } from './common/AppWrapper';
import Player from './layout/Player/Player';
import { MainWrapper } from './common/MainWrapper';
import Header from './layout/Header/Header';
import SingleSong from './view/SingleSong/SingleSong';
import Library from './view/Library/Library';
import useActiveSongStore from './store/useActiveSongStore';
import useListStore from './store/useListStore';

const App = () => {
  const { send, receive } = window.api;
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const updateSongs = useListStore((state) => state.updateSongs);
  const updateActiveSong = useActiveSongStore((state) => state.updateInfo);

  useEffect(() => {
    const getSavedData = async () => {
      try {
        const { files } = await send('first-render');
        updateSongs(files.files);
      } catch (error) {
        setError(error);
      }finally{
        setLoading(false);
        setLibraryLoading(false);
      }
    };

    getSavedData();

    const scanningFile = (msg) => {
      if(msg === 'scanning-folder') {
        setLibraryLoading(true);
      }
    };

    const unsubscribe = receive('scanning-folder', scanningFile);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AppWrapper>
      <MainWrapper>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
          >
            <SingleSong />
          </Route>
          <Route
            exact
            path="/library"
          >
            <Library
              setLoading={setLibraryLoading}
              setError={setLibraryError}
              loading={libraryLoading}
              error={libraryError}
            />
          </Route>
        </Switch>
      </MainWrapper>
      <Player />
    </AppWrapper>
  );
};

export default App;
