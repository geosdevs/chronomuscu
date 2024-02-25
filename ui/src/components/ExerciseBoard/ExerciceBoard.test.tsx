import ExerciseBoard from "./ExerciseBoard";
import renderer from "react-test-renderer";

describe("render exercise board", () => {
  test("renders", () => {
    const onNextExerciseClickMock = jest.fn();
    const component = renderer.create(
      <ExerciseBoard
        boardData={{ id: 1, exerciseName: "Exercise name" }}
        lastBoardId={1}
        onNextExerciseClick={onNextExerciseClickMock}
      ></ExerciseBoard>
    );
    let jsonTree = component.toJSON();

    expect(jsonTree).toMatchSnapshot();
    expect(onNextExerciseClickMock).not.toHaveBeenCalled();
  });
});
