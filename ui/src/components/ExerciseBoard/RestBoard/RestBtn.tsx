import { secondsToPrettyString } from "../../../helpers/time";
import React, { useContext } from "react";
import { ExerciseBoardRestBtnClickContext } from "../ExerciseBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";

type RestBtnProps = {
  restSeconds: number
  children?: React.ReactNode
  readOnly: boolean
};

export default function RestBtn({ restSeconds, readOnly }: RestBtnProps) {
  const onRestBtnClick = useContext(ExerciseBoardRestBtnClickContext);
  // let bgColor;
  
  // if (restSeconds >= 60 && restSeconds < 120) {
  //   bgColor = "bg-indigo-700";
  // } else if (restSeconds >= 120) {
  //   bgColor = "bg-indigo-800";
  // } else {
  //   bgColor = 'bg-indigo-600';
  // }

  return (
      <button
        disabled={readOnly}
        className={`m-1 rounded-full text-white 
        hover:scale-110 hover:bg-ecru hover:text-gunmetal
        bg-bluemunsell py-1 px-2 md:p-3 md:px-3 transition  
        leading-5 focus:outline-none focus:ring disabled:bg-gray-400`}
        onClick={() => {
          if (typeof onRestBtnClick === "function") {
            onRestBtnClick(restSeconds);
          }
        }}
      >
        <FontAwesomeIcon icon={faHourglass} size="xs"></FontAwesomeIcon>
        <span className="mx-1">{secondsToPrettyString(restSeconds)}</span>
      </button>
  );
}
