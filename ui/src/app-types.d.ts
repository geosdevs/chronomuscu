import {
  TIMER_ACTIVITY_STATUS_EXERCISING,
  TIMER_ACTIVITY_STATUS_RESTING,
} from "./Timer";
import { DialogContentProps } from "./ui/Dialog";

type SessionStatus =
  | typeof SESSION_STOPPED
  | typeof SESSION_STARTED
  | typeof SESSION_PAUSED;

type TimerActivityStatus =
  | typeof TIMER_ACTIVITY_STATUS_EXERCISING
  | typeof TIMER_ACTIVITY_STATUS_RESTING;

type SetsHistoryData = {
  id: number
  activitySeconds: number
  restSeconds: number
};

type SetsHistoryDataList = {
  [exerciseBoardId: number]: SetsHistoryData[]
}

type ExerciseBoardData = {
  id: number
  exerciseName: string
};

type OpenDialogCallback = (dialogContentProps: DialogContentProps) => void
