import React, { MutableRefObject } from "react";
import {
  TIMER_ACTIVITY_STATUS_EXERCISING,
  TIMER_ACTIVITY_STATUS_RESTING,
} from "./Timer";

type SessionStatus =
  | typeof SESSION_STOPPED
  | typeof SESSION_STARTED
  | typeof SESSION_PAUSED;

type TimerProps = {
  timerInitSeconds: number
  timerActivityStatus: TimerActivityStatus
  setTimerActivityStatusExercising: Function
  sessionSate: SessionStatus
  setSessionState: Function
  prevRestingTimerMs: number
  setPrevRestingTimerMs: Function
  setsHistoryRef: MutableRefObject<SetsHistoryData[]>
  children?: React.ReactNode
};

type TimerActivityStatus =
  | typeof TIMER_ACTIVITY_STATUS_EXERCISING
  | typeof TIMER_ACTIVITY_STATUS_RESTING;

type SetsHistoryData = {
  id: number
  activitySeconds: number
  restSeconds: number
};
