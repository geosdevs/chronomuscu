import { useState } from "react";
import { SessionStatus } from "../../../app-types";
import { SESSION_STARTED } from "../ExerciseBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import './PlayToolbar.css'

type PlayToolbarProps = {
  onPlayClick: (playPauseBtnState: SessionStatus) => void;
  onPauseClick: (playPauseBtnState: SessionStatus) => void;
  onStopClick: Function;
  sessionSate: SessionStatus;
};

type PlayPauseBtnState = typeof PLAY_BTN_STATE | typeof PAUSE_BTN_STATE;

const PLAY_BTN_STATE = "Play";
const PAUSE_BTN_STATE = "Pause";

export default function PlayToolbar({
  onPlayClick,
  onPauseClick,
  onStopClick,
  sessionSate,
}: PlayToolbarProps) {
  const [playPauseBtnState, setPlayPauseBtnState] = useState<PlayPauseBtnState>(
    sessionSate === SESSION_STARTED ? PLAY_BTN_STATE : PAUSE_BTN_STATE
  );

  return (
    <span className="h-fit mx-4 play-toolbar-flex inline-flex overflow-hidden rounded-md border bg-white shadow-sm my-2">
      <button
        className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
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
          ? <FontAwesomeIcon icon={faPause} />
          : <FontAwesomeIcon icon={faPlay} />}
      </button>
      <button
        className="inline-block border-e p-3 text-red-800 hover:bg-gray-50 focus:relative"
        onClick={() => {
          setPlayPauseBtnState(PAUSE_BTN_STATE);
          onStopClick();
        }}
        >
        <FontAwesomeIcon icon={faStop} />
      </button>
    </span>
  );
}
