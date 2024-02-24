import { useContext, useRef, useState } from "react";
import { ExerciseBoardOnTitleEditContext } from "../../App";
import { ExerciseBoardData } from "../../app-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

type ExerciseTitleProps = {
  exerciseBoard: ExerciseBoardData;
};

export const MAX_LENGTH_EXERCISE_TITLE = 12;

export default function ExerciseTitle({ exerciseBoard }: ExerciseTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const onTitleEdit = useContext(ExerciseBoardOnTitleEditContext);
  const inputTitleRef = useRef<null | HTMLInputElement>(null);

  function handleNewTitleSubmit(e: any) {
    if (
      typeof e.currentTarget?.value === "string" &&
      e.currentTarget?.value
    ) {
      onTitleEdit(e.currentTarget.value);
    }
    setIsEditing(false);
  }

  return (
    <div>
      {isEditing ? (
        <span className="text-2xl">
          <strong className="text-gunmetal">
            <FontAwesomeIcon icon={faHashtag} size="lg" />
            {exerciseBoard.id}
          </strong>{" "}
          <input
            list="exercise-title-datalist"
            type="text"
            id="exercise-title-input"
            className="bg-zinc-200 rounded-md max-w-32 md:max-w-none"
            onBlur={handleNewTitleSubmit}
            ref={inputTitleRef}
            onInput={(e) => {
              const titleLength = Number(e.currentTarget.value?.length) ?? 0;

              if (titleLength > MAX_LENGTH_EXERCISE_TITLE) {
                e.currentTarget.value = e.currentTarget.value.substring(
                  0,
                  MAX_LENGTH_EXERCISE_TITLE + 1
                );
              }
            }}
          ></input>
          <datalist id="exercise-title-datalist">
            <option>Push-up</option>
            <option>Pull-up</option>
            <option>Squat</option>
            <option>Deadlift</option>
          </datalist>
        </span>
      ) : (
        <h2 className="text-2xl hover:scale-105 duration-300">
          <strong className="text-gunmetal">
            <FontAwesomeIcon icon={faHashtag} size="lg" />
            {exerciseBoard.id}
          </strong>{" "}
          <span
            className="text-cordovan hover:text-ecru duration-300"
            onClick={(e) => {
              setIsEditing(true);

              if (inputTitleRef.current instanceof HTMLInputElement) {
                inputTitleRef.current.defaultValue =
                  e.currentTarget.innerText.trim();
              }
            }}
          >
            {exerciseBoard.exerciseName}
          </span>
        </h2>
      )}
    </div>
  );
}
