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
    <div>
      <button
        className="rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
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
