import Timer, {
  TIMER_ACTIVITY_STATUS_EXERCISING,
  TIMER_ACTIVITY_STATUS_RESTING,
  TIME_INTERVAL_MS,
} from "./Timer/Timer";
import RestBtnGroup from "./RestBoard/RestBtnGroup";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  ExerciseBoardData,
  SetsHistoryData,
  SetsHistoryDataList,
  TimerActivityStatus,
} from "../../app-types";
import {
  getLastSetHistory, savePendingSetsHistoryData,
} from "./Timer/sets-table-functions";
import NextExerciseBtn from "./NextExerciseBtn";
import ExerciseTitle from "./ExerciseTitle";
import { SESSION_STARTED, SessionStateContext } from "../../App";
import { getLastItem } from "../../helpers/functions";

type ExerciseBoardProps = {
  boardData: ExerciseBoardData
  onNextExerciseClick: Function
  lastBoardId: number
};

export const PENDING_SETS_HISTORY_ITEM_KEY = "pending-sets-history-data";

export const ExerciseBoardRestBtnClickContext = createContext<null | Function>(
  null
);
export const ExerciseBoardSetsHistoryRemoveContext =
  createContext<null | Function>(null);

export default function ExerciseBoard({
  boardData,
  onNextExerciseClick,
  lastBoardId
}: ExerciseBoardProps) {
  const [timerActivityStatus, setTimerActivityStatus] =
    useState<TimerActivityStatus>(TIMER_ACTIVITY_STATUS_EXERCISING);
  const [timerInitSeconds, setTimerInitSeconds] = useState<number>(0);
  const [chosenRestingTimerMs, setChosenRestingTimerMs] = useState<number>(0);
  const [restTimers, setRestTimers] = useState<number[]>([]);
  const setsHistoryRef = useRef<SetsHistoryData[]>([]);
  // only to trigger a new UI render when removing a set history
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [latestRemovedHistory, setLatestRemovedHistory] =
    useState<SetsHistoryData | null>(null);
  const setSessionState = useContext(SessionStateContext)[1];
  const readOnly = lastBoardId !== boardData.id;

  useEffect(() => {
    // todo remove tmp effect
    if (localStorage.getItem('env')?.toUpperCase() === 'DEV') {
      setRestTimers([2, 5, 10, 30, 60, 90, 120, 180, 300]);
    } else {
      setRestTimers([10, 20, 30, 60, 90, 120, 180, 300]);
    }

    let pendingSetsHistoryDataList: SetsHistoryDataList = {};
    let pendingSetsHistoryData: SetsHistoryData[];

    try {
      const pendingSetsHistoryStr = localStorage.getItem(PENDING_SETS_HISTORY_ITEM_KEY);
      pendingSetsHistoryDataList = JSON.parse(pendingSetsHistoryStr ?? "");

      if (!pendingSetsHistoryDataList[boardData.id]) {
        throw new Error("Sets history data init required");
      }
    } catch (exception) {
      console.log("Init exercise boards");
      pendingSetsHistoryDataList = {
        [boardData.id]: []
      };
    } finally {
      pendingSetsHistoryData = pendingSetsHistoryDataList[boardData.id];
      setsHistoryRef.current = pendingSetsHistoryData;

      const lastSetHistory = getLastItem<SetsHistoryData>(setsHistoryRef.current);

      if (lastSetHistory && lastSetHistory.restSeconds === 0) {
        setTimerInitSeconds(lastSetHistory.activitySeconds);
      }
    }
  }, [boardData.id]);

  function handleRestBtnClick(timerSeconds: number) {
    if (!readOnly) {
      const currentSetHistory = getLastSetHistory(setsHistoryRef.current);

      setTimerActivityStatus(TIMER_ACTIVITY_STATUS_RESTING);
      setSessionState(SESSION_STARTED);
      setTimerInitSeconds(0);
      setChosenRestingTimerMs(timerSeconds * TIME_INTERVAL_MS);

      if (currentSetHistory) {
        currentSetHistory.restSeconds = timerSeconds;
      }
    }
  }

  function handleSetHistoryRemove(setHistoryId: number) {
    if (!readOnly) {
      setsHistoryRef.current = setsHistoryRef.current.filter(
        (setHistory: SetsHistoryData) => {
          if (setHistory.id === setHistoryId) {
            setLatestRemovedHistory(setHistory);
          }
          return setHistory.id !== setHistoryId;
        }
      );
      savePendingSetsHistoryData(boardData.id, setsHistoryRef.current);
    }
  }

  return (
    <div className="my-2 p-2 md:pl-4">
      <div className="flex">
        <ExerciseTitle exerciseBoard={boardData}></ExerciseTitle>
        <NextExerciseBtn
          onNextExerciseClick={onNextExerciseClick}
        ></NextExerciseBtn>
      </div>

      <div className="md:w-fit mx-2 my-4 grid">
        <ExerciseBoardSetsHistoryRemoveContext.Provider
          value={handleSetHistoryRemove}
        >
          <Timer
            key={`timer-status-${timerActivityStatus}-amount-${timerInitSeconds}-rest-${chosenRestingTimerMs}`}
            timerInitSeconds={timerInitSeconds}
            timerActivityStatus={timerActivityStatus}
            setTimerActivityStatusExercising={() => {
              setTimerActivityStatus(TIMER_ACTIVITY_STATUS_EXERCISING);
            }}
            chosenRestingTimerMs={chosenRestingTimerMs}
            setsHistoryRef={setsHistoryRef}
            setChosenRestingTimerMs={setChosenRestingTimerMs}
            readOnly={readOnly}
            savePendingSetsHistoryData={savePendingSetsHistoryData.bind(null, boardData.id)}
          ></Timer>
        </ExerciseBoardSetsHistoryRemoveContext.Provider>
        <ExerciseBoardRestBtnClickContext.Provider value={handleRestBtnClick}>
          <div className="my-2 row-start-2 col-span-4 row-span-1 overflow-x-auto w-100 md:row-span-2 md:col-span-2 md:col-start-3">
            <RestBtnGroup
              restTimers={restTimers.slice(0, 8)}
              flexDirection="row"
              readOnly={readOnly}
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
