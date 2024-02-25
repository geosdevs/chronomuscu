import renderer from "react-test-renderer";
import Dialog, { DialogContentProps } from "./Dialog";

describe("Dialog", () => {
  it("should render with backdrop close", () => {
    const onCloseMock = jest.fn();
    const onSubmitClickMock = jest.fn();
    const onCancelClickMock = jest.fn();
    const contentProps: DialogContentProps = {
      content: "This is a test message.",
      title: "Test title",
      onSubmitClick: onSubmitClickMock,
      onCancelClick: onCancelClickMock,
      submitLabel: "Submit button",
      cancelLabel: "Cancel button",
      backdropClose: true,
    };
    const component = renderer.create(<Dialog contentProps={contentProps} onClose={onCloseMock} />);
    let jsonTree = component.toJSON();

    expect(jsonTree).toMatchSnapshot();
    expect(onSubmitClickMock).not.toHaveBeenCalled();
    expect(onCancelClickMock).not.toHaveBeenCalled();
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it("should render without backdrop close", () => {
    const onCloseMock = jest.fn();
    const onSubmitClickMock = jest.fn();
    const onCancelClickMock = jest.fn();
    const contentProps: DialogContentProps = {
      content: "This is a test message.",
      title: "Test title",
      onSubmitClick: onSubmitClickMock,
      onCancelClick: onCancelClickMock,
      submitLabel: "Submit button",
      cancelLabel: "Cancel button",
      backdropClose: true,
    };
    const component = renderer.create(<Dialog contentProps={contentProps} onClose={onCloseMock} />);
    let jsonTree = component.toJSON();

    expect(jsonTree).toMatchSnapshot();
    expect(onSubmitClickMock).not.toHaveBeenCalled();
    expect(onCancelClickMock).not.toHaveBeenCalled();
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
