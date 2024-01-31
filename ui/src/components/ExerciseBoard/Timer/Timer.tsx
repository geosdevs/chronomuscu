import React, { useEffect, useRef, useState } from "react";
import {
  SECONDS_FORMAT_TIMER,
  secondsToPrettyString,
} from "../../../functions/time";
import { TimerActivityStatus, TimerProps } from "./timer-types";
import PlayToolbar from "./PlayToolbar";
import { flushSync } from "react-dom";

const TIME_INTERVAL_MS = 1000;

export const TIMER_ACTIVITY_STATUS_EXERCISING = "Exercising";
export const TIMER_ACTIVITY_STATUS_RESTING = "Resting";

export const SESSION_STOPPED = 0;
export const SESSION_STARTED = 1;
export const SESSION_PAUSED = 2;

export default function Timer({
  timerInit,
}: TimerProps) {
  const [timerState, setTimerState] = useState<number>(timerInit);
  const refTimerId = useRef<NodeJS.Timer | null>(null);
  const [timerActivityStatus, setTimerActivityStatus] = useState<TimerActivityStatus>(TIMER_ACTIVITY_STATUS_RESTING);
  const [sessionSate, setSessionState] = useState<SESSION_STATUS>(SESSION_STOPPED);

  useEffect(() => {
    switch(sessionSate) {
      case SESSION_STARTED:
        let timer = timerState;

        refTimerId.current = setInterval(() => {
          if (timerActivityStatus === TIMER_ACTIVITY_STATUS_EXERCISING) {
            timer += TIME_INTERVAL_MS;
          } else if (timerActivityStatus === TIMER_ACTIVITY_STATUS_RESTING) {
            timer -= TIME_INTERVAL_MS;
          } else {
            throw new Error("Unknown activity status");
          }

          setTimerState(timer);

          if (timer === 0) {
            setTimerActivityStatus(TIMER_ACTIVITY_STATUS_EXERCISING);
          }

          console.log(timer)
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
    setTimerState(0);
    clearTimer();
    setTimerActivityStatus(TIMER_ACTIVITY_STATUS_EXERCISING);
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
      ></PlayToolbar>
      <div>
        <h3>{secondsToPrettyString(timerState / 1000, SECONDS_FORMAT_TIMER)}</h3>
        <span>{timerActivityStatus}</span>
      </div>
    </>
  );
}
