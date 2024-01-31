import React, { useState } from "react";

type PlayToolbarProps = {
  onPlayClick: (playPauseBtnState: SESSION_STATUS) => void;
  onPauseClick: (playPauseBtnState: SESSION_STATUS) => void;
  onStopClick: Function;
};

const PLAY_BTN_STATE = "Play";
const PAUSE_BTN_STATE = "Pause";

export default function PlayToolbar({
  onPlayClick,
  onPauseClick,
  onStopClick,
}: PlayToolbarProps) {
  const [playPauseBtnState, setPlayPauseBtnState] = useState(PAUSE_BTN_STATE);

  return (
    <div>
      <button
        onClick={() => {
          if (playPauseBtnState === PLAY_BTN_STATE) {
            setPlayPauseBtnState(PAUSE_BTN_STATE);
            onPauseClick(playPauseBtnState);
          } else if (playPauseBtnState === PAUSE_BTN_STATE) {
            setPlayPauseBtnState(PLAY_BTN_STATE);
            onPlayClick(playPauseBtnState);
          } else {
            throw new Error("Unknown play/pause button state");
          }
        }}
      >
        {playPauseBtnState === PLAY_BTN_STATE
          ? PAUSE_BTN_STATE
          : PLAY_BTN_STATE}
      </button>
      <button
        onClick={() => {
          setPlayPauseBtnState(PAUSE_BTN_STATE);
          onStopClick();
        }}
      >
        Stop
      </button>
    </div>
  );
}
