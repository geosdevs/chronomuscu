import { useEffect, useState } from 'react';
import './App.css';
import ExerciseBoardList from './components/ExerciseBoardList';
import AppMenu from './AppMenu';
import { exerciseBoardsData } from './components/ExerciseBoard/setsData';
import { getLastItem } from './helpers/functions';

export type ExerciseBoardData = {
  id: number
  exerciseName: string
}

function App() {
  const [exerciseBoards, setExerciseBoards] = useState<ExerciseBoardData[]>([]);
  const [activeBoardId, setActiveBoardId] = useState<number>(0);

  // todo: fetch user data
  useEffect(() => {
    setExerciseBoards([{
      id: 1,
      exerciseName: "First exercise"
    }]);
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
        exerciseName: "New Exercise"
      }
    ]);
    setActiveBoardId(nextId);
  }

  if (!activeBoardId && exerciseBoardsData[0]) {
    setActiveBoardId(exerciseBoardsData[0].id);
  }

  return (
    <div className="App flex App-flex">
      <header className="App-header">
        <h1>Chronomuscu</h1>
      </header>
      <nav className='fixed'>
        <AppMenu activeBoardId={activeBoardId} exerciseBoards={exerciseBoards} onExerciseBoardSelection={handleExerciseBoardSelection}></AppMenu>
      </nav>
      <section className='pl-16'>
        <ExerciseBoardList exerciseBoards={exerciseBoards} activeBoardId={activeBoardId} onNextExerciseClick={handleNextExerciseClick}></ExerciseBoardList>
      </section>
    </div>
  );
}

export default App;
