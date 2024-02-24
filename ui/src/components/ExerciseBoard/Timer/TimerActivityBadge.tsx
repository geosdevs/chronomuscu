import {
  faCheck,
  faDumbbell,
  faHourglass,
  faPause,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import {
  isExercising,
  isResting,
  sessionPaused,
  sessionStarted,
  sessionStopped,
} from "../../../helpers/functions";
import { SessionStatus, TimerActivityStatus } from "../../../app-types";
import { useContext } from "react";
import { SessionStateContext } from "../../../App";

type TimerActivityBadgeProps = {
  timerActivityStatus: TimerActivityStatus;
  readOnly: boolean;
};

export default function TimerActivityBadge({
  timerActivityStatus,
  readOnly,
}: TimerActivityBadgeProps) {
  const sessionSate: SessionStatus = useContext(SessionStateContext)[0];
  const _isResting = isResting.bind(null, timerActivityStatus);
  const _isExercising = isExercising.bind(null, timerActivityStatus);
  const _sessionStopped = sessionStopped.bind(null, sessionSate);
  const _sessionPaused = sessionPaused.bind(null, sessionSate);
  const _sessionStarted = sessionStarted.bind(null, sessionSate);

  return (
    <span className="ml-1 mt-1.5 inline-block">
      {!readOnly ? (
        <span
          className={clsx(
            "inline-flex items-center justify-center rounded-full px-2.5 py-0.5",
            _sessionStarted() && _isExercising() && "bg-white text-orange-700",
            _sessionStarted() && _isResting() && "bg-white text-charcoal",
            _sessionStopped() && "bg-white text-gunmetal",
            _sessionPaused() && "bg-white text-charcoal"
          )}
        >
          {_sessionStarted() && _isExercising() && <FontAwesomeIcon icon={faDumbbell} size="lg" />}
          {_sessionStarted() && _isResting() && <FontAwesomeIcon icon={faHourglass} size="lg" />}
          {_sessionStopped() && <FontAwesomeIcon icon={faStop} size="lg" />}
          {_sessionPaused() && <FontAwesomeIcon icon={faPause} size="lg" />}
          <p className="whitespace-nowrap ml-1 text-sm">
            {_sessionStarted() && timerActivityStatus}
            {_sessionStopped() && "Stopped"}
            {_sessionPaused() && "Paused"}
          </p>
        </span>
      ) : (
        <span className="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 bg-white text-gunmetal">
          <FontAwesomeIcon icon={faCheck} size="lg" />
          <p className="whitespace-nowrap ml-1 text-sm">Done</p>
        </span>
      )}
    </span>
  );
}
