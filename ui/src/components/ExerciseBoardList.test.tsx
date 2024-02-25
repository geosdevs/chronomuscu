import renderer from "react-test-renderer";
import ExerciseBoardList from "./ExerciseBoardList";
import { ExerciseBoardData } from "../app-types";

describe("ExerciseBoardList", () => {
  it("should render", () => {
    const handleExerciseNameChangeMock = jest.fn();
    const onNextExerciseClickMock = jest.fn();
    const exerciseBoardsData: ExerciseBoardData[] = [
      { id: 34, exerciseName: "Squat" },
      { id: 35, exerciseName: "Deadlift" },
      { id: 36, exerciseName: "Dragon flag" },
    ];
    const component = renderer.create(
      <ExerciseBoardList
        activeBoardId={7}
        exerciseBoards={exerciseBoardsData}
        handleExerciseNameChange={handleExerciseNameChangeMock}
        onNextExerciseClick={onNextExerciseClickMock}
      />
    );
    let jsonTree = component.toJSON();

    expect(jsonTree).toMatchSnapshot();
    expect(handleExerciseNameChangeMock).not.toHaveBeenCalled();
    expect(onNextExerciseClickMock).not.toHaveBeenCalled();
  });
});
