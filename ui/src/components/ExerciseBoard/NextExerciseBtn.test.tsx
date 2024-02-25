import { ExerciseBoardData } from "../../app-types";
import renderer from "react-test-renderer";
import NextExerciseBtn from "./NextExerciseBtn";

describe("NextExerciseBtn", () => {
  it("should render", () => {
    const onNextExerciseClickMock = jest.fn();
    const component = renderer.create(
      <NextExerciseBtn onNextExerciseClick={onNextExerciseClickMock} />
    );
    const jsonTree = component.toJSON();

    expect(jsonTree).toMatchSnapshot();
    expect(onNextExerciseClickMock).not.toHaveBeenCalled();
  });
});
