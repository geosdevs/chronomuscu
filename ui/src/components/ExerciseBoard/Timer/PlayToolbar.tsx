import { useState } from "react";
import { SessionStatus } from "../../../app-types";
import { SESSION_PAUSED, SESSION_STARTED } from "../ExerciseBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import './PlayToolbar.css'
import clsx from "clsx";

type PlayToolbarProps = {
  onPlayClick: (playPauseBtnState: SessionStatus) => void
  onPauseClick: (playPauseBtnState: SessionStatus) => void
  onStopClick: Function
  sessionSate: SessionStatus
  readonly: boolean
};

type PlayPauseBtnState = typeof PLAY_BTN_STATE | typeof PAUSE_BTN_STATE;

const PLAY_BTN_STATE = "Play";
const PAUSE_BTN_STATE = "Pause";

export default function PlayToolbar({
  onPlayClick,
  onPauseClick,
  onStopClick,
  sessionSate,
  readonly
}: PlayToolbarProps) {
  const [playPauseBtnState, setPlayPauseBtnState] = useState<PlayPauseBtnState>(
    sessionSate === SESSION_STARTED ? PLAY_BTN_STATE : PAUSE_BTN_STATE
  );

  return (
    <span className="h-fit text-3xl play-toolbar-flex inline-flex overflow-hidden rounded-md bg-white my-2 mx-0 md:mx-4">
      <button
        disabled={readonly}
        className="mb-1 inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative disabled:hidden"
        onClick={() => {
          if (!readonly) {

            if (playPauseBtnState === PLAY_BTN_STATE) {
              setPlayPauseBtnState(PAUSE_BTN_STATE);
              onPauseClick(playPauseBtnState);
            } else if (playPauseBtnState === PAUSE_BTN_STATE) {
              setPlayPauseBtnState(PLAY_BTN_STATE);
              onPlayClick(playPauseBtnState);
            } else {
              throw new Error("Unknown play/pause button state");
            }
          }
        }}
        >
        {playPauseBtnState === PLAY_BTN_STATE
          ? <FontAwesomeIcon icon={faPause} />
          : <FontAwesomeIcon icon={faPlay} />}
      </button>
      <button
        disabled={sessionSate !== SESSION_PAUSED}
        className={clsx(
          "inline-block p-3 text-chinarose hover:bg-gray-50 focus:relative disabled:text-frenchgray",
          (readonly || sessionSate === SESSION_STARTED) && "opacity-0"
        )}
        onClick={() => {
          if (!readonly) {
            setPlayPauseBtnState(PAUSE_BTN_STATE);
            onStopClick();
          }
        }}
        >
        <FontAwesomeIcon icon={faStop} />
      </button>
    </span>
  );
}
