import React, { MutableRefObject } from "react";
import {
  TIMER_ACTIVITY_STATUS_EXERCISING,
  TIMER_ACTIVITY_STATUS_RESTING,
} from "./Timer";

type TimerProps = {
  timerInit: number
  onEachSeconds?: Function
  onPlayPause?: Function
  children?: React.ReactNode
};

type TimerActivityStatus =
  | typeof TIMER_ACTIVITY_STATUS_EXERCISING
  | typeof TIMER_ACTIVITY_STATUS_RESTING;
