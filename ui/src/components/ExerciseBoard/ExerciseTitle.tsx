import { useContext, useRef, useState } from "react";
import { ExerciseBoardOnTitleEditContext } from "../../App";

type ExerciseTitleProps = {
  exerciseName: string;
};

export default function ExerciseTitle({ exerciseName }: ExerciseTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const onTitleEdit = useContext(ExerciseBoardOnTitleEditContext);
  const inputTitleRef = useRef<null|HTMLInputElement>(null);

  function handleNewTitleSubmit(e: any) {
    if (
      typeof onTitleEdit === "function" &&
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
        <>
          <input
            list="exercise-title-datalist"
            type="text"
            id="exercise-title-input"
            className="bg-zinc-200 rounded-md"
            onBlur={handleNewTitleSubmit}
            ref={inputTitleRef}
          ></input>
          <datalist
            id="exercise-title-datalist">
            <option>Push-up</option>
            <option>Pull-up</option>
            <option>Squat</option>
            <option>Deadlift</option>
          </datalist>
        </>
      ) : (
        <h2
          className="text-2xl text-cordovan hover:text-ecru hover:scale-105 transform duration-300"
          onClick={(e) => {
            setIsEditing(true);

            if (inputTitleRef.current instanceof HTMLInputElement) {
              inputTitleRef.current.defaultValue = e.currentTarget.innerText.trim();
            }
          }}
        >
          {exerciseName}
        </h2>
      )}
    </div>
  );
}
