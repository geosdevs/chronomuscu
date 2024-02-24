import { createContext, useEffect, useState } from "react";
import "./App.css";
import ExerciseBoardList from "./components/ExerciseBoardList";
import AppMenu, { MENU_POSITION_BOTTOM, MENU_POSITION_LEFT } from "./AppMenu";
import { exerciseBoardsData } from "./components/ExerciseBoard/setsData";
import { getLastItem, missingImplementation } from "./helpers/functions";
import { useImmer } from "use-immer";
import { SessionStatus } from "./app-types";
import { resetPendingSetsHistoryData } from "./components/ExerciseBoard/Timer/sets-table-functions";

export type ExerciseBoardData = {
  id: number;
  exerciseName: string;
};

export type SessionStateContextType = [
  sessionState: SessionStatus,
  setSessionState: Function
];

const NEW_EXERCISE_BOARD_DATA: ExerciseBoardData = {
  id: 1,
  exerciseName: "First exercise",
};

const PENDING_EXERCISE_BOARD_ITEM_KEY = "pending-exercise-board-data";
export const PENDING_EXC_KEY = PENDING_EXERCISE_BOARD_ITEM_KEY;

export const SESSION_STOPPED = 0;
export const SESSION_STARTED = 1;
export const SESSION_PAUSED = 2;

export const ExerciseBoardOnTitleEditContext = createContext<Function>(missingImplementation);
export const SessionStateContext = createContext<SessionStateContextType>([
  SESSION_STOPPED,
  (param: any) => param,
]);
export const SavePendingExerciseBoardsDataContext = createContext<Function>(missingImplementation);

function App() {
  const [exerciseBoards, setExerciseBoards] = useImmer<ExerciseBoardData[]>([]);
  const [activeBoardId, setActiveBoardId] = useState<number>(0);
  const [sessionSate, setSessionState] =
    useState<SessionStatus>(SESSION_STOPPED);

  // todo: fetch user data
  useEffect(() => {
    let pendingExerciseBoardData;

    try {
      const pendingExerciseBoardStr = localStorage.getItem(PENDING_EXC_KEY);
      pendingExerciseBoardData = JSON.parse(pendingExerciseBoardStr ?? "");

      if (
        !Array.isArray(pendingExerciseBoardData) ||
        !pendingExerciseBoardData.length
      ) {
        throw new Error("Exercise board data init required");
      }
    } catch (exception) {
      console.log("Init exercise boards");
      pendingExerciseBoardData = [NEW_EXERCISE_BOARD_DATA];
    } finally {
      const lastExerciseBoard = getLastItem<ExerciseBoardData>(
        pendingExerciseBoardData
      );

      setExerciseBoards(pendingExerciseBoardData);

      if (lastExerciseBoard) {
        setActiveBoardId(lastExerciseBoard.id);
      }
    }
  }, [setExerciseBoards]);

  function handleExerciseBoardSelection(exerciseBoardId: number) {
    setActiveBoardId(exerciseBoardId);
  }

  function handleNextExerciseClick() {
    const lastExerciseBoard = getLastItem<ExerciseBoardData>(exerciseBoards);
    const nextId = (lastExerciseBoard?.id ?? 0) + 1;
    const newExciseBoardsData = [
      ...exerciseBoards,
      {
        id: nextId,
        exerciseName: "New Exercise",
      },
    ];

    setExerciseBoards(newExciseBoardsData);
    setActiveBoardId(nextId);
    setSessionState(SESSION_PAUSED);
    savePendingExerciseBoardsData(newExciseBoardsData);
  }

  function handleExerciseNameChange(exerciseBoardId: number, newName: string) {
    const indexOfExerciseBoard = exerciseBoards.findIndex(
      (board) => board.id === exerciseBoardId
    );

    if (indexOfExerciseBoard >= 0) {
      setExerciseBoards((draft) => {
        draft[indexOfExerciseBoard].exerciseName = newName;
        savePendingExerciseBoardsData(draft);
      });
    } else {
      throw new Error(
        `ExerciseBoard id "${exerciseBoardId}" does not exists !`
      );
    }
  }

  function savePendingExerciseBoardsData(
    exerciseBoardsData?: ExerciseBoardData[]
  ) {
    localStorage.setItem(
      PENDING_EXC_KEY,
      JSON.stringify(exerciseBoardsData ?? exerciseBoards)
    );
  }

  function handleSessionReset() {
    localStorage.removeItem(PENDING_EXC_KEY);
    setExerciseBoards([NEW_EXERCISE_BOARD_DATA]);
    resetPendingSetsHistoryData();
  }

  if (!activeBoardId && exerciseBoardsData[0]) {
    setActiveBoardId(exerciseBoardsData[0].id);
  }

  return (
    <div className="App flex App-flex h-full">
      <header className="App-header py-2">
        <h1>Chronomuscu</h1>
      </header>
      <AppMenu
        activeBoardId={activeBoardId}
        exerciseBoards={exerciseBoards}
        onExerciseBoardSelection={handleExerciseBoardSelection}
        position={MENU_POSITION_LEFT}
        onSessionReset={handleSessionReset}
      ></AppMenu>
      <section className="md:pl-12 md:pl-16 bg-zinc-100 h-full">
        <SessionStateContext.Provider value={[sessionSate, setSessionState]}>
          <SavePendingExerciseBoardsDataContext.Provider
            value={savePendingExerciseBoardsData}
          >
            <ExerciseBoardList
              exerciseBoards={exerciseBoards}
              activeBoardId={activeBoardId}
              onNextExerciseClick={handleNextExerciseClick}
              handleExerciseNameChange={handleExerciseNameChange}
            ></ExerciseBoardList>
          </SavePendingExerciseBoardsDataContext.Provider>
        </SessionStateContext.Provider>
      </section>
      <AppMenu
        activeBoardId={activeBoardId}
        exerciseBoards={exerciseBoards}
        onExerciseBoardSelection={handleExerciseBoardSelection}
        position={MENU_POSITION_BOTTOM}
        onSessionReset={handleSessionReset}
      ></AppMenu>
    </div>
  );
}

export default App;
