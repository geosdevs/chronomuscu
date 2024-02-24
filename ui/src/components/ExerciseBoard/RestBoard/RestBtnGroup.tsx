import RestBtn from "./RestBtn";

type RestBoardProps = {
  restTimers: number[]
  flexDirection?: "row" | "col"
  readOnly: boolean
}

export default function RestBtnGroup(props: RestBoardProps) {
  const flexDirectionProp = props.flexDirection ?? "row";
  const flexDirection = {
    "row": 'flex-row',
    "col": 'flex-col'
  };

  return (
    <div
      className={`flex ${flexDirection[flexDirectionProp]} md:flex-wrap md:w-fit`}
    >
      {props.restTimers.map((restTimer) => (
        <RestBtn
          key={`rest-seconds-${restTimer}`}
          restSeconds={restTimer}
          readOnly={props.readOnly}
        ></RestBtn>
      ))}
    </div>
  );
}
