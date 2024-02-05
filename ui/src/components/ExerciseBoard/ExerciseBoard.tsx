import Goal from "./Goal";
import SetsTable from "./SetsTable";
import Timer, {
  TIMER_ACTIVITY_STATUS_EXERCISING,
  TIMER_ACTIVITY_STATUS_RESTING,
  TIME_INTERVAL_MS,
} from "./Timer/Timer";
import RestBtnGroup from "./RestBoard/RestBtnGroup";
import { createContext, useEffect, useState } from "react";
import {
  SESSION_STATUS,
  SetsHistoryData,
  TimerActivityStatus,
} from "../../app-types";

export const ExerciseBoardRestBtnClickContext = createContext<null | Function>(
  null
);

export const SESSION_STOPPED = 0;
export const SESSION_STARTED = 1;
export const SESSION_PAUSED = 2;

export default function ExerciseBoard() {
  const [timerActivityStatus, setTimerActivityStatus] =
    useState<TimerActivityStatus>(TIMER_ACTIVITY_STATUS_EXERCISING);
  const [timerInitSeconds, setTimerInitSeconds] = useState<number>(0);
  const [sessionSate, setSessionState] =
    useState<SESSION_STATUS>(SESSION_STOPPED);
  const [prevRestingTimerMs, setPrevRestingTimerMs] = useState(0);
  const [setsHistory, setSetsHistory] = useState<SetsHistoryData>([]);
  const [restTimers, setRestTimers] = useState<number[]>([]);
  const [currentActivityTimerMs, setCurrentActivityTimerMs] = useState(0);

  // todo remove tmp effect
  useEffect(() => {
    setRestTimers([2, 5, 10, 60, 90, 120, 180]);
  }, []);

  function handleRestBtnClick(timerSeconds: number) {
    addSetHistory();
    setTimerActivityStatus(TIMER_ACTIVITY_STATUS_RESTING);
    setSessionState(SESSION_STARTED);
    setTimerInitSeconds(timerSeconds);
    setPrevRestingTimerMs(timerSeconds * TIME_INTERVAL_MS);
  }

  function addSetHistory() {
    if (timerActivityStatus === TIMER_ACTIVITY_STATUS_EXERCISING) {
      setSetsHistory([...setsHistory, {
        id: getNextSetHistoryId(),
        activitySeconds: currentActivityTimerMs / TIME_INTERVAL_MS,
        restSeconds: prevRestingTimerMs / TIME_INTERVAL_MS
      }]);
    }
  }

  function getNextSetHistoryId(): number {
    return (setsHistory[setsHistory.length - 1]?.id ?? 0) + 1;
  }

  function handleCurrentActivityTimerUpdate(currentTimerMs: number) {
    setCurrentActivityTimerMs(currentTimerMs);
  }

  return (
    <>
      <section className="max-w-3xl w-fit mx-2 my-4 grid">
        <div className="row-span-1 col-span-3 w-fit">
          <Timer
            key={`timer-init-${timerInitSeconds}`}
            timerInitSeconds={timerInitSeconds}
            timerActivityStatus={timerActivityStatus}
            setTimerActivityStatusExercising={() => {
              setTimerActivityStatus(TIMER_ACTIVITY_STATUS_EXERCISING);
            }}
            sessionSate={sessionSate}
            setSessionState={setSessionState}
            prevRestingTimerMs={prevRestingTimerMs}
            setPrevRestingTimerMs={setPrevRestingTimerMs}
            onActivityTimerUpdate={handleCurrentActivityTimerUpdate}
          ></Timer>
        </div>
        <div className="row-span-2 col-span-3 w-fit my-2">
          <Goal></Goal>
          <SetsTable setsData={setsHistory}></SetsTable>
        </div>
        <ExerciseBoardRestBtnClickContext.Provider value={handleRestBtnClick}>
          <div className="mx-2 col-span-1 row-span-2 col-start-4 row-start-1">
            <RestBtnGroup restTimers={restTimers.slice(0, 8)} flexDirection="col"></RestBtnGroup>
          </div>
          {/* <div className="col-span-3 col-start-1 row-start-3">
            <RestBtnGroup restTimers={restTimers.slice(5, 8)}></RestBtnGroup>
          </div> */}
        </ExerciseBoardRestBtnClickContext.Provider>
      </section>
    </>
  );
}
