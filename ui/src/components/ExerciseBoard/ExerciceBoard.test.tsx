import { render } from "@testing-library/react";
import ExerciseBoard from "./ExerciseBoard";

describe("render exercise board", () => {
  test("renders", () => {
    render(
      <ExerciseBoard
        boardData={{ id: 1, exerciseName: "Exercise name" }}
        isActive={true}
        onNextExerciseClick={() => {}}
      ></ExerciseBoard>
    );
  });
});
