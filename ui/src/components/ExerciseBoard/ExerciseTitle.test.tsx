import { ExerciseBoardData } from "../../app-types";
import ExerciseTitle from "./ExerciseTitle";
import renderer from "react-test-renderer";

describe("ExerciseTitle", () => {
  it("should render", () => {
    const boardData: ExerciseBoardData = {
      exerciseName: "Test exercise",
      id: 654,
    };
    const component = renderer.create(<ExerciseTitle exerciseBoard={boardData}/>);
    const jsonTree = component.toJSON();

    expect(jsonTree).toMatchSnapshot();
  });
});
