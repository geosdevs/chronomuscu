import { secondsToPrettyString } from "../../../helpers/time";
import React, { useContext } from "react";
import { ExerciseBoardRestBtnClickContext } from "../ExerciseBoard";

type RestBtnProps = {
  restSeconds: number
  children?: React.ReactNode
  readOnly: boolean
};

export default function RestBtn({ restSeconds, readOnly }: RestBtnProps) {
  const onRestBtnClick = useContext(ExerciseBoardRestBtnClickContext);
  let bgColor;
  
  if (restSeconds >= 60 && restSeconds < 120) {
    bgColor = "bg-indigo-700";
  } else if (restSeconds >= 120) {
    bgColor = "bg-indigo-800";
  } else {
    bgColor = 'bg-indigo-600';
  }

  return (
      <button
        disabled={readOnly}
        className={`m-1 rounded-full text-white hover:scale-110 
        ${bgColor} p-3 transition hover:bg-indigo-300 
        focus:outline-none focus:ring disabled:bg-gray-400`}
        onClick={() => {
          if (typeof onRestBtnClick === "function") {
            onRestBtnClick(restSeconds);
          }
        }}
      >
        {secondsToPrettyString(restSeconds)}
      </button>
  );
}
