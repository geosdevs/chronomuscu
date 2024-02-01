import { useEffect, useRef, useState } from "react";
import {
  SECONDS_FORMAT_TIMER,
  secondsToPrettyString,
} from "../../../functions/time";
import { TimerProps } from "../../../app-types";
import PlayToolbar from "./PlayToolbar";
import { SESSION_PAUSED, SESSION_STARTED, SESSION_STOPPED } from "../ExerciseBoard";

const TIME_INTERVAL_MS = 1000;

export const TIMER_ACTIVITY_STATUS_EXERCISING = "Exercising";
export const TIMER_ACTIVITY_STATUS_RESTING = "Resting";

export default function Timer({
  timerInitSeconds,
  timerActivityStatus,
  setTimerActivityStatusExercising,
  sessionSate,
  setSessionState
}: TimerProps) {
  const [timerStateMs, setTimerStateMs] = useState<number>(timerInitSeconds * TIME_INTERVAL_MS);
  const refTimerId = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    switch(sessionSate) {
      case SESSION_STARTED:
        let timerMs = timerStateMs;

        refTimerId.current = setInterval(() => {
          if (timerActivityStatus === TIMER_ACTIVITY_STATUS_EXERCISING) {
            timerMs += TIME_INTERVAL_MS;
          } else if (timerActivityStatus === TIMER_ACTIVITY_STATUS_RESTING) {
            timerMs -= TIME_INTERVAL_MS;
          } else {
            throw new Error("Unknown activity status");
          }

          setTimerStateMs(timerMs);

          if (timerMs === 0) {
            setTimerActivityStatusExercising();
          }

          console.log(timerMs)
        }, TIME_INTERVAL_MS);
        break;
      case SESSION_STOPPED:
      case SESSION_PAUSED:
        clearTimer();
        break;
      default:
        throw new Error('Unknown SESSION_STATUS')
    }

    return () => {
      clearTimer()
    };
  }, [sessionSate, timerActivityStatus]);

  function handlePlay() {
    setSessionState(SESSION_STARTED);
  }

  function handlePause() {
    clearTimer();
    setSessionState(SESSION_PAUSED);
  }

  function handleStop() {
    setTimerStateMs(0);
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
    <>
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
      <div>
        <h3>{secondsToPrettyString(timerStateMs / 1000, SECONDS_FORMAT_TIMER)}</h3>
        <span>{timerActivityStatus}</span>
      </div>
    </>
  );
}
