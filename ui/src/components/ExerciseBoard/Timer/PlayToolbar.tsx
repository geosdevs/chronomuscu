import { useContext, useState } from "react";
import { SessionStatus } from "../../../app-types";
import { SESSION_PAUSED, SESSION_STARTED } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import './PlayToolbar.css'
import clsx from "clsx";
import { SessionStateContext } from "../../../App";

type PlayToolbarProps = {
  onPlayClick: () => void
  onPauseClick: () => void
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
  readonly
}: PlayToolbarProps) {
  const sessionSate = useContext(SessionStateContext)[0];
  const [playPauseBtnState, setPlayPauseBtnState] = useState<PlayPauseBtnState>(
    sessionSate === SESSION_STARTED ? PLAY_BTN_STATE : PAUSE_BTN_STATE
  );

  function getPlayPauseBtnState() {
    return readonly ? PAUSE_BTN_STATE : playPauseBtnState;
  }

  return (
    <span className="text-3xl play-toolbar-flex inline-flex justify-center overflow-hidden rounded-md bg-white my-2 mx-0 md:mx-4">
      <button
        disabled={readonly}
        className="mb-1 inline-block p-3 text-gray-700 hover:bg-gray-50 hover:text-ecru duration-300 focus:relative disabled:text-frenchgray"
        onClick={() => {
          if (!readonly) {
            if (getPlayPauseBtnState() === PLAY_BTN_STATE) {
              setPlayPauseBtnState(PAUSE_BTN_STATE);
              onPauseClick();
            } else if (getPlayPauseBtnState() === PAUSE_BTN_STATE) {
              setPlayPauseBtnState(PLAY_BTN_STATE);
              onPlayClick();
            } else {
              throw new Error("Unknown play/pause button state");
            }
          }
        }}
        >
        {getPlayPauseBtnState() === PLAY_BTN_STATE
          ? <FontAwesomeIcon icon={faPause} />
          : <FontAwesomeIcon icon={faPlay} />}
      </button>
      <button
        disabled={sessionSate !== SESSION_PAUSED}
        className={clsx(
          "inline-block p-3 text-chinarose hover:bg-gray-50 hover:text-ecru duration-300 focus:relative disabled:text-frenchgray",
          (readonly || sessionSate === SESSION_STARTED) && "text-frenchgray"
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
