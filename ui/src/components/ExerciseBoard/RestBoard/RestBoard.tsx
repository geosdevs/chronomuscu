import { useEffect, useState } from "react";
import RestBtn from "./RestBtn";

export default function RestBoard() {
  const [restTimers, setRestTimers] = useState<number[]>([]);

  // todo remove tmp effect
  useEffect(() => {
    setRestTimers([2, 5, 10, 60, 90])
  }, [])

  return (
    <div>
      {restTimers.map((restTimer) => (
        <RestBtn key={`rest-seconds-${restTimer}`} restSeconds={restTimer}></RestBtn>
      ))}
    </div>
  );
}
