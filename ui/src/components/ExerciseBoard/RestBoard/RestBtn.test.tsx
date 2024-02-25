import renderer from 'react-test-renderer';
import RestBtn from './RestBtn';

describe('RestBtn', () => {
  it('should render', () => {
    const restTimer = 35;
    const component = renderer.create((
      <RestBtn
      key={`rest-seconds-${restTimer}`}
      restSeconds={restTimer}
      readOnly={false}
    ></RestBtn>
    ));
    let tree = component.toTree();

    expect(tree).toMatchSnapshot();
  });

  it('should render readonly', () => {
    const restTimer = 35;
    const component = renderer.create((
      <RestBtn
      key={`rest-seconds-${restTimer}`}
      restSeconds={restTimer}
      readOnly={true}
    ></RestBtn>
    ));
    let tree = component.toTree();

    expect(tree).toMatchSnapshot();
  })
});