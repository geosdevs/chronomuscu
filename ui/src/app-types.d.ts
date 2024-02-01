import React, { MutableRefObject } from "react";
import {
  TIMER_ACTIVITY_STATUS_EXERCISING,
  TIMER_ACTIVITY_STATUS_RESTING,
} from "./Timer";

type SESSION_STATUS =
  | typeof SESSION_STOPPED
  | typeof SESSION_STARTED
  | typeof SESSION_PAUSED;

type TimerProps = {
  timerInitSeconds: number
  timerActivityStatus: TimerActivityStatus
  setTimerActivityStatusExercising: Function
  sessionSate: SESSION_STATUS
  setSessionState: Function
  onEachSeconds?: Function
  onPlayPause?: Function
  children?: React.ReactNode
};

type TimerActivityStatus =
  | typeof TIMER_ACTIVITY_STATUS_EXERCISING
  | typeof TIMER_ACTIVITY_STATUS_RESTING;
