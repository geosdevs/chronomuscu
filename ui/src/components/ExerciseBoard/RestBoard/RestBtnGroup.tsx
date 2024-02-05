import RestBtn from "./RestBtn";

type RestBoardProps = {
  restTimers: number[]
  flexDirection?: "row" | "col"
}

export default function RestBtnGroup(props: RestBoardProps) {
  const classes = ['flex', `flex-${props.flexDirection || 'row'}`];

  return (
    <div className={classes.join(' ')}>
      {props.restTimers.map((restTimer) => (
        <RestBtn key={`rest-seconds-${restTimer}`} restSeconds={restTimer}></RestBtn>
        ))}
    </div>
  );
}
