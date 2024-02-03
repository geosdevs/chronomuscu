import Goal from "./Goal";
import SetsTable from "./SetsTable";
import Timer, { TIMER_ACTIVITY_STATUS_EXERCISING, TIMER_ACTIVITY_STATUS_RESTING, TIME_INTERVAL_MS } from "./Timer/Timer";
import { setsTableData } from "./setsData";
import RestBoard from "./RestBoard/RestBoard";
import { createContext, useEffect, useState } from "react";
import { SESSION_STATUS, SetsHistoryData, TimerActivityStatus } from "../../app-types";

export const ExerciseBoardRestBtnClickContext = createContext<null | Function>(null);

export const SESSION_STOPPED = 0;
export const SESSION_STARTED = 1;
export const SESSION_PAUSED = 2;

export default function ExerciseBoard() {
  const [timerActivityStatus, setTimerActivityStatus] = useState<TimerActivityStatus>(TIMER_ACTIVITY_STATUS_EXERCISING);
  const [timerInitSeconds, setTimerInitSeconds] = useState<number>(0);
  const [sessionSate, setSessionState] = useState<SESSION_STATUS>(SESSION_STOPPED);
  const [prevRestingTimerMs, setPrevRestingTimerMs] = useState(0);
  const [setsHistory, setSetsHistory] = useState<SetsHistoryData>([]);

  //todo remove tmp effect
  useEffect(() => {
    setSetsHistory(setsTableData);
  }, []);

  function handleRestBtnClick(timerSeconds: number) {
    setTimerActivityStatus(TIMER_ACTIVITY_STATUS_RESTING);
    setSessionState(SESSION_STARTED);
    setTimerInitSeconds(timerSeconds);
    setPrevRestingTimerMs(timerSeconds * TIME_INTERVAL_MS);
  }

  return (
    <>
      <section className="max-w-3xl mx-2 my-4">
        <div>
          <Timer
            key={`timer-init-${timerInitSeconds}`}
            timerInitSeconds={timerInitSeconds}
            timerActivityStatus={timerActivityStatus}
            setTimerActivityStatusExercising={() => {
              setTimerActivityStatus(TIMER_ACTIVITY_STATUS_EXERCISING)
            }}
            sessionSate={sessionSate}
            setSessionState={setSessionState}
            prevRestingTimerMs={prevRestingTimerMs}
            setPrevRestingTimerMs={setPrevRestingTimerMs}
          ></Timer>
          <Goal></Goal>
        </div>
        <div>
          <SetsTable setsData={setsHistory}></SetsTable>
        </div>
      </section>

      <aside>
        <ExerciseBoardRestBtnClickContext.Provider value={handleRestBtnClick}>
          <RestBoard></RestBoard>
        </ExerciseBoardRestBtnClickContext.Provider>
      </aside>
    </>
  );
}
