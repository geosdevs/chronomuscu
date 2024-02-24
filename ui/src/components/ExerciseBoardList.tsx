import { useMemo } from "react";
import { ExerciseBoardData, ExerciseBoardOnTitleEditContext } from "../App";
import { getLastItem } from "../helpers/functions";
import ExerciseBoard from "./ExerciseBoard/ExerciseBoard";

type ExerciseBoardListProps = {
  exerciseBoards: ExerciseBoardData[];
  activeBoardId: number;
  onNextExerciseClick: Function;
  handleExerciseNameChange: Function;
};

export default function ExerciseBoardList({
  exerciseBoards,
  activeBoardId,
  onNextExerciseClick,
  handleExerciseNameChange,
}: ExerciseBoardListProps) {
  const lastBoard = useMemo(
    () => getLastItem<ExerciseBoardData>(exerciseBoards),
    [exerciseBoards]
  );

  return (
    <>
      {exerciseBoards.map((exerciseBoard) => (
        <ExerciseBoardOnTitleEditContext.Provider
          key={`exercise-board-${exerciseBoard.id}`}
          value={handleExerciseNameChange.bind(null, exerciseBoard.id)}
        >
          <div
            className={activeBoardId === exerciseBoard.id ? "block" : "hidden"}
          >
            <ExerciseBoard
              boardData={exerciseBoard}
              lastBoardId={lastBoard?.id ?? -1}
              onNextExerciseClick={onNextExerciseClick}
            ></ExerciseBoard>
          </div>
        </ExerciseBoardOnTitleEditContext.Provider>
      ))}
    </>
  );
}
