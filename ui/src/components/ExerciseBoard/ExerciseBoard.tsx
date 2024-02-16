import Timer, {
  TIMER_ACTIVITY_STATUS_EXERCISING,
  TIMER_ACTIVITY_STATUS_RESTING,
  TIME_INTERVAL_MS,
} from "./Timer/Timer";
import RestBtnGroup from "./RestBoard/RestBtnGroup";
import { createContext, useEffect, useRef, useState } from "react";
import {
  ExerciseBoardData,
  SessionStatus,
  SetsHistoryData,
  TimerActivityStatus,
} from "../../app-types";
import {
  getCurrentSetHistory,
  getLastSetHistory,
} from "./Timer/sets-table-functions";
import NextExerciseBtn from "./NextExerciseBtn";

type ExerciseBoardProps = {
  boardData: ExerciseBoardData;
  isActive: boolean;
  onNextExerciseClick: Function;
};

export const ExerciseBoardRestBtnClickContext = createContext<null | Function>(
  null
);
export const ExerciseBoardSetsHistoryRemoveContext =
  createContext<null | Function>(null);

export const SESSION_STOPPED = 0;
export const SESSION_STARTED = 1;
export const SESSION_PAUSED = 2;

export default function ExerciseBoard({
  boardData,
  isActive,
  onNextExerciseClick,
}: ExerciseBoardProps) {
  const [timerActivityStatus, setTimerActivityStatus] =
    useState<TimerActivityStatus>(TIMER_ACTIVITY_STATUS_EXERCISING);
  const [timerInitSeconds, setTimerInitSeconds] = useState<number>(0);
  const [sessionSate, setSessionState] =
    useState<SessionStatus>(SESSION_STOPPED);
  const [prevRestingTimerMs, setPrevRestingTimerMs] = useState<number>(0);
  const [restTimers, setRestTimers] = useState<number[]>([]);
  const setsHistoryRef = useRef<SetsHistoryData[]>([]);
  // only to trigger a new UI render when removing a set history
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [latestRemovedHistory, setLatestRemovedHistory] =
    useState<SetsHistoryData | null>(null);
  const [readOnlyState, setReadOnlyState] = useState<boolean>(false);

  // todo remove tmp effect
  useEffect(() => {
    setRestTimers([2, 5, 10, 30, 60, 90, 120, 180, 300]);
  }, []);

  function handleRestBtnClick(timerSeconds: number) {
    if (!readOnlyState) {
      const currentSetHistory = SESSION_STARTED
        ? getLastSetHistory(setsHistoryRef)
        : getCurrentSetHistory(setsHistoryRef);

      setTimerActivityStatus(TIMER_ACTIVITY_STATUS_RESTING);
      setSessionState(SESSION_STARTED);
      setTimerInitSeconds(timerSeconds);
      setPrevRestingTimerMs(timerSeconds * TIME_INTERVAL_MS);

      if (currentSetHistory) {
        currentSetHistory.restSeconds = timerSeconds;
      }
    }
  }

  function handleSetHistoryRemove(setHistoryId: number) {
    if (!readOnlyState) {
      setsHistoryRef.current = setsHistoryRef.current.filter(
        (setHistory: SetsHistoryData) => {
          if (setHistory.id === setHistoryId) {
            setLatestRemovedHistory(setHistory);
          }
          return setHistory.id !== setHistoryId;
        }
      );
    }
  }

  return (
    <div className={`my-2 p-2 md:pl-4 ${isActive ? "" : "hidden"}`}>
      <div className="flex">
        <h2 className="text-2xl text-gunmetal">{boardData.exerciseName}</h2>
        <NextExerciseBtn
          onNextExerciseClick={onNextExerciseClick}
          setReadOnlyState={setReadOnlyState}
        ></NextExerciseBtn>
      </div>

      <div className="md:w-fit mx-2 my-4 grid">
        <ExerciseBoardSetsHistoryRemoveContext.Provider
          value={handleSetHistoryRemove}
        >
          <Timer
            key={`timer-status-${timerActivityStatus}-amount-${timerInitSeconds}`}
            timerInitSeconds={timerInitSeconds}
            timerActivityStatus={timerActivityStatus}
            setTimerActivityStatusExercising={() => {
              setTimerActivityStatus(TIMER_ACTIVITY_STATUS_EXERCISING);
            }}
            sessionSate={sessionSate}
            setSessionState={setSessionState}
            prevRestingTimerMs={prevRestingTimerMs}
            setPrevRestingTimerMs={setPrevRestingTimerMs}
            setsHistoryRef={setsHistoryRef}
            readOnly={readOnlyState}
          ></Timer>
        </ExerciseBoardSetsHistoryRemoveContext.Provider>
        <ExerciseBoardRestBtnClickContext.Provider value={handleRestBtnClick}>
          <div className="my-2 row-start-2 col-span-4 row-span-1 overflow-x-auto w-100 md:row-span-2 md:col-span-2 md:col-start-3">
            <RestBtnGroup
              restTimers={restTimers.slice(0, 8)}
              flexDirection="row"
              readOnly={readOnlyState}
            ></RestBtnGroup>
          </div>
          {/* <div className="col-span-3 col-start-1 row-start-3">
            <RestBtnGroup restTimers={restTimers.slice(5, 8)}></RestBtnGroup>
          </div> */}
        </ExerciseBoardRestBtnClickContext.Provider>
      </div>
    </div>
  );
}
