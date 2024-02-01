import Goal from "./Goal";
import SetsTable from "./SetsTable";
import Timer, { TIMER_ACTIVITY_STATUS_EXERCISING, TIMER_ACTIVITY_STATUS_RESTING } from "./Timer/Timer";
import { setsTableData } from "../tests/setsData";
import RestBoard from "./RestBoard/RestBoard";
import { createContext, useState } from "react";
import { SESSION_STATUS, TimerActivityStatus } from "../../app-types";

export const ExerciceBoardRestBtnClickContext = createContext<null | Function>(null);

export const SESSION_STOPPED = 0;
export const SESSION_STARTED = 1;
export const SESSION_PAUSED = 2;

export default function ExerciseBoard() {
  const [timerActivityStatus, setTimerActivityStatus] = useState<TimerActivityStatus>(TIMER_ACTIVITY_STATUS_EXERCISING);
  const [timerInitSeconds, setTimerInitSeconds] = useState<number>(0);
  const [sessionSate, setSessionState] = useState<SESSION_STATUS>(SESSION_STOPPED);

  function handleRestBtnClick(timerSeconds: number) {
    setTimerActivityStatus(TIMER_ACTIVITY_STATUS_RESTING);
    setSessionState(SESSION_STARTED);
    setTimerInitSeconds(timerSeconds);
  }

  return (
    <>
      <section>
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
          ></Timer>
          <Goal></Goal>
        </div>
        <div>
          <SetsTable setsData={setsTableData}></SetsTable>
        </div>
      </section>

      <aside>
        <ExerciceBoardRestBtnClickContext.Provider value={handleRestBtnClick}>
          <RestBoard></RestBoard>
        </ExerciceBoardRestBtnClickContext.Provider>
      </aside>
    </>
  );
}
