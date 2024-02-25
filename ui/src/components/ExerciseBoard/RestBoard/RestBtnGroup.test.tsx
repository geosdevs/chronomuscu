import renderer from "react-test-renderer";
import RestBtnGroup from "./RestBtnGroup";

describe("RestBtnGroup", () => {
  it("should render 2 rest buttons", () => {
    const restTimers = [20, 30];
    const component = renderer.create(
      <RestBtnGroup
        restTimers={restTimers.slice(0, 8)}
        flexDirection="row"
        readOnly={false}
      ></RestBtnGroup>
    );
    let jsonTree = component.toJSON();

    expect(jsonTree).toMatchSnapshot();
  });
});
