import { SessionStatus, TimerActivityStatus } from "../app-types";
import { SESSION_PAUSED, SESSION_STARTED, SESSION_STOPPED } from "../App";
import {
  TIMER_ACTIVITY_STATUS_EXERCISING,
  TIMER_ACTIVITY_STATUS_RESTING,
} from "../components/ExerciseBoard/Timer/Timer";
import MissingImplementationError from "../exceptions/missing-implementation";

export function getLastItem<T>(array: Array<T>): T | null {
  return array[array.length - 1] ?? null;
}

export function isExercising(timerActivityStatus: TimerActivityStatus) {
  return timerActivityStatus === TIMER_ACTIVITY_STATUS_EXERCISING;
}

export function isResting(timerActivityStatus: TimerActivityStatus) {
  return timerActivityStatus === TIMER_ACTIVITY_STATUS_RESTING;
}

export function sessionStarted(sessionSate: SessionStatus) {
  return sessionSate === SESSION_STARTED;
}

export function sessionStopped(sessionSate: SessionStatus) {
  return sessionSate === SESSION_STOPPED;
}

export function sessionPaused(sessionSate: SessionStatus) {
  return sessionSate === SESSION_PAUSED;
}

export function missingImplementation() {
  throw new MissingImplementationError("Missing implementation");
}
