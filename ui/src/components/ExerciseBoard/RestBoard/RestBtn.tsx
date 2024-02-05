import { secondsToPrettyString } from "../../../functions/time";
import React, { useContext } from "react";
import { ExerciseBoardRestBtnClickContext } from "../ExerciseBoard";

type RestBtnProps = {
  restSeconds: number;
  children?: React.ReactNode;
};

export default function RestBtn({ restSeconds }: RestBtnProps) {
  const onRestBtnClick = useContext(ExerciseBoardRestBtnClickContext);

  return (
    <div className="m-1">
      <button
        className="rounded-full text-white hover:scale-110  bg-indigo-600 p-3 transition hover:bg-indigo-400 focus:outline-none focus:ring"
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
