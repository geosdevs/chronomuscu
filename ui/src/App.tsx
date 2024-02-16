import { useEffect, useState } from "react";
import "./App.css";
import ExerciseBoardList from "./components/ExerciseBoardList";
import AppMenu, { MENU_POSITION_BOTTOM, MENU_POSITION_LEFT } from "./AppMenu";
import { exerciseBoardsData } from "./components/ExerciseBoard/setsData";
import { getLastItem } from "./helpers/functions";

export type ExerciseBoardData = {
  id: number;
  exerciseName: string;
};

function App() {
  const [exerciseBoards, setExerciseBoards] = useState<ExerciseBoardData[]>([]);
  const [activeBoardId, setActiveBoardId] = useState<number>(0);

  // todo: fetch user data
  useEffect(() => {
    setExerciseBoards([
      {
        id: 1,
        exerciseName: "First exercise",
      },
    ]);
  }, []);

  function handleExerciseBoardSelection(exerciseBoardId: number) {
    setActiveBoardId(exerciseBoardId);
  }

  function handleNextExerciseClick() {
    const lastExerciseBoard = getLastItem<ExerciseBoardData>(exerciseBoards);
    const nextId = (lastExerciseBoard?.id ?? 0) + 1;

    setExerciseBoards([
      ...exerciseBoards,
      {
        id: nextId,
        exerciseName: "New Exercise",
      },
    ]);
    setActiveBoardId(nextId);
  }

  if (!activeBoardId && exerciseBoardsData[0]) {
    setActiveBoardId(exerciseBoardsData[0].id);
  }

  return (
    <div className="App flex App-flex h-full">
      <header className="App-header">
        <h1>Chronomuscu</h1>
      </header>
      <AppMenu
        activeBoardId={activeBoardId}
        exerciseBoards={exerciseBoards}
        onExerciseBoardSelection={handleExerciseBoardSelection}
        position={MENU_POSITION_LEFT}
      ></AppMenu>
      <section className="md:pl-12 md:pl-16 bg-zinc-100 h-full">
        <ExerciseBoardList
          exerciseBoards={exerciseBoards}
          activeBoardId={activeBoardId}
          onNextExerciseClick={handleNextExerciseClick}
        ></ExerciseBoardList>
      </section>
      <AppMenu
        activeBoardId={activeBoardId}
        exerciseBoards={exerciseBoards}
        onExerciseBoardSelection={handleExerciseBoardSelection}
        position={MENU_POSITION_BOTTOM}
      ></AppMenu>
    </div>
  );
}

export default App;
