import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import ExerciseBoardList from "./components/ExerciseBoardList";
import AppMenu, { MENU_POSITION_BOTTOM, MENU_POSITION_LEFT } from "./AppMenu";
import { exerciseBoardsData } from "./components/ExerciseBoard/setsData";
import { getLastItem, missingImplementation } from "./helpers/functions";
import { useImmer } from "use-immer";
import { OpenDialogCallback, SessionStatus } from "./app-types";
import { resetPendingSetsHistoryData } from "./helpers/sets-table-functions";
import Dialog, { DialogContentProps } from "./ui/Dialog";

export type ExerciseBoardData = {
  id: number;
  exerciseName: string;
};

export type SessionStateContextType = [sessionState: SessionStatus, setSessionState: Function];

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
export const OpenDialogContext = createContext<OpenDialogCallback | typeof missingImplementation>(
  missingImplementation
);

function App() {
  const [exerciseBoards, setExerciseBoards] = useImmer<ExerciseBoardData[]>([]);
  const [activeBoardId, setActiveBoardId] = useState<number>(0);
  const [sessionSate, setSessionState] = useState<SessionStatus>(SESSION_STOPPED);
  const [lastSessionReset, setLastSessionReset] = useState(Date.now());
  const [dialogContentProps, setDialogContentProps] = useState<DialogContentProps>({
    title: "[title]",
    content: "[content]",
    onCancelClick: () => true,
    onSubmitClick: () => true,
  });
  const dialogRef = useRef<HTMLDialogElement>(null);

  // todo: fetch user data
  useEffect(() => {
    let pendingExerciseBoardData;

    try {
      const pendingExerciseBoardStr = localStorage.getItem(PENDING_EXC_KEY);
      pendingExerciseBoardData = JSON.parse(pendingExerciseBoardStr ?? "");

      if (!Array.isArray(pendingExerciseBoardData) || !pendingExerciseBoardData.length) {
        throw new Error("Exercise board data init required");
      }
    } catch (exception) {
      console.log("Init exercise boards");
      pendingExerciseBoardData = [NEW_EXERCISE_BOARD_DATA];
    } finally {
      const lastExerciseBoard = getLastItem<ExerciseBoardData>(pendingExerciseBoardData);

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
    const indexOfExerciseBoard = exerciseBoards.findIndex((board) => board.id === exerciseBoardId);

    if (indexOfExerciseBoard >= 0) {
      setExerciseBoards((draft) => {
        draft[indexOfExerciseBoard].exerciseName = newName;
        savePendingExerciseBoardsData(draft);
      });
    } else {
      throw new Error(`ExerciseBoard id "${exerciseBoardId}" does not exists !`);
    }
  }

  function savePendingExerciseBoardsData(exerciseBoardsData?: ExerciseBoardData[]) {
    localStorage.setItem(PENDING_EXC_KEY, JSON.stringify(exerciseBoardsData ?? exerciseBoards));
  }

  function handleSessionReset() {
    localStorage.removeItem(PENDING_EXC_KEY);
    setExerciseBoards([NEW_EXERCISE_BOARD_DATA]);
    resetPendingSetsHistoryData();
    setActiveBoardId(1);
    setSessionState(SESSION_STOPPED);
    setLastSessionReset(Date.now());
  }

  function openDialog(dialogContentProps: DialogContentProps): void {
    setDialogContentProps(dialogContentProps);
    dialogRef.current?.showModal();
  }

  if (!activeBoardId && exerciseBoardsData[0]) {
    setActiveBoardId(exerciseBoardsData[0].id);
  }

  return (
    <div className="App flex App-flex h-full">
      <OpenDialogContext.Provider value={openDialog}>
        <header className="App-header h-12 md:h-16">
          <h1 className="md:py-4">Chronomuscu</h1>
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
            <SavePendingExerciseBoardsDataContext.Provider value={savePendingExerciseBoardsData}>
              <ExerciseBoardList
                key={`exercise-board-list-${lastSessionReset}`}
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
        <Dialog
          onClose={() => {
            dialogRef.current?.close();
          }}
          contentProps={dialogContentProps}
          ref={dialogRef}
        ></Dialog>
      </OpenDialogContext.Provider>
    </div>
  );
}

export default App;
