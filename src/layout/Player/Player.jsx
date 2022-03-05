import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { PlayerWrapper } from './Player.style';
import 'react-h5-audio-player/lib/styles.css';

const Player = () => {
  return (
    <PlayerWrapper>
      <AudioPlayer
        autoPlay
        src="test.mp3"
        hasDefaultKeyBindings={false}
        autoPlayAfterSrcChange={false}
        muted
        showFilledVolume
      />
    </PlayerWrapper>
  );
};

export default Player;
