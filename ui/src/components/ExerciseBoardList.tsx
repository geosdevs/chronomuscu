import { ExerciseBoardData } from "../App";
import ExerciseBoard from "./ExerciseBoard/ExerciseBoard";

type ExerciseBoardListProps = {
  exerciseBoards: ExerciseBoardData[]
  activeBoardId: number
  onNextExerciseClick: Function
};

export default function ExerciseBoardList({
  exerciseBoards,
  activeBoardId,
  onNextExerciseClick
}: ExerciseBoardListProps) {
  return (
    <>
      {exerciseBoards.map((exerciseBoard) => (
        <ExerciseBoard
          key={`exercise-board-${exerciseBoard.id}`}
          isActive={activeBoardId === exerciseBoard.id}
          boardData={exerciseBoard}
          onNextExerciseClick={onNextExerciseClick}
        ></ExerciseBoard>
      ))}
    </>
  );
}
