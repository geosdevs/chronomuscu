import { secondsToPrettyString } from "../../../functions/time";
import React, { useContext } from "react";
import { ExerciceBoardRestBtnClickContext } from "../ExerciseBoard";

type RestBtnProps = {
  restSeconds: number;
  children?: React.ReactNode;
};

export default function RestBtn({ restSeconds }: RestBtnProps) {
  const onRestBtnClick = useContext(ExerciceBoardRestBtnClickContext);

  return (
    <div>
      <button
        onClick={() => {
          if (typeof onRestBtnClick === "function") {
            onRestBtnClick(restSeconds);
          }
        }}
      >
        {secondsToPrettyString(restSeconds)}
      </button>
    </div>
  );
}
