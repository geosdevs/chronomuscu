import { useEffect, useRef, useState } from "react";
import {
  SECONDS_FORMAT_TIMER,
  secondsToPrettyString,
} from "../../../functions/time";
import { TimerProps } from "../../../app-types";
import PlayToolbar from "./PlayToolbar";
import {
  SESSION_PAUSED,
  SESSION_STARTED,
  SESSION_STOPPED,
} from "../ExerciseBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faHourglass } from "@fortawesome/free-solid-svg-icons";

const TIME_INTERVAL_MS = 1000;

export const TIMER_ACTIVITY_STATUS_EXERCISING = "Exercising";
export const TIMER_ACTIVITY_STATUS_RESTING = "Resting";

export default function Timer({
  timerInitSeconds,
  timerActivityStatus,
  setTimerActivityStatusExercising,
  sessionSate,
  setSessionState,
}: TimerProps) {
  const [timerStateMs, setTimerStateMs] = useState<number>(
    timerInitSeconds * TIME_INTERVAL_MS
  );
  const refTimerId = useRef<NodeJS.Timer | null>(null);
  const [restingProgress, setRestingProgress] = useState<number>(0);
  const [prevRestingTimerMs, setPrevRestingTimerMs] = useState(0);

  useEffect(() => {
    switch (sessionSate) {
      case SESSION_STARTED:
        if (!refTimerId.current) {
          let timerMs = timerStateMs;

          setPrevRestingTimerMs(timerMs);

          refTimerId.current = setInterval(() => {
            if (timerActivityStatus === TIMER_ACTIVITY_STATUS_EXERCISING) {
              timerMs += TIME_INTERVAL_MS;
            } else if (timerActivityStatus === TIMER_ACTIVITY_STATUS_RESTING) {
              timerMs -= TIME_INTERVAL_MS;
              setRestingProgress(timerMs / prevRestingTimerMs * 100);
            } else {
              throw new Error("Unknown activity status");
            }

            setTimerStateMs(timerMs);

            if (timerMs === 0) {
              setTimerActivityStatusExercising();
            }
          }, TIME_INTERVAL_MS);
        }
        break;
      case SESSION_STOPPED:
      case SESSION_PAUSED:
        clearTimer();
        break;
      default:
        throw new Error("Unknown SESSION_STATUS");
    }

    return () => {
      clearTimer();
    };
  }, [
    sessionSate,
    timerActivityStatus,
    prevRestingTimerMs
  ]);

  function handlePlay() {
    setSessionState(SESSION_STARTED);
  }

  function handlePause() {
    clearTimer();
    setSessionState(SESSION_PAUSED);
  }

  function handleStop() {
    setTimerStateMs(0);
    setPrevRestingTimerMs(0);
    clearTimer();
    setTimerActivityStatusExercising();
    setSessionState(SESSION_STOPPED);
  }

  function clearTimer() {
    if (refTimerId.current) {
      clearInterval(refTimerId.current);
      refTimerId.current = null;
    }
  }

  return (
    <div className="flex rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
      <PlayToolbar
        onPlayClick={(playPauseBtnState) => {
          handlePlay();
        }}
        onPauseClick={(playPauseBtnState) => {
          handlePause();
        }}
        onStopClick={() => {
          handleStop();
        }}
        sessionSate={sessionSate}
      ></PlayToolbar>

      <div className="my-2 min-w-80">
        {
          [SESSION_PAUSED, SESSION_STOPPED].includes(sessionSate) ? (
            <span className="font-bold text-5xl text-gray-400">
              {secondsToPrettyString(timerStateMs / 1000, SECONDS_FORMAT_TIMER)}
            </span>
          ) : (
          <span className="font-bold text-5xl">
            {secondsToPrettyString(timerStateMs / 1000, SECONDS_FORMAT_TIMER)}
          </span>
          )
        }
        <span
          role="progressbar"
          aria-labelledby="ProgressLabel"
          // aria-valuenow="75"
          className="block rounded-full bg-gray-200 my-2"
        >
          <span className="block h-3 rounded-full bg-indigo-600" style={{width: restingProgress + "%"}}></span>
        </span>
        
        {
          timerActivityStatus === TIMER_ACTIVITY_STATUS_EXERCISING ? (
            <span
              className="inline-flex items-center justify-center rounded-full bg-orange-100 px-2.5 py-0.5 text-orange-700"
            >
              <FontAwesomeIcon icon={faDumbbell} />
              <p className="whitespace-nowrap ml-1 text-sm">{timerActivityStatus}</p>
            </span>
          ) : (
            <span
              className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-700"
            >
              <FontAwesomeIcon icon={faHourglass} />
              <p className="whitespace-nowrap ml-1 text-sm">{timerActivityStatus}</p>
            </span>
          )
        }
        
      </div>
    </div>
  );
}
