import {
  faArrowRightFromBracket,
  faDumbbell,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExerciseBoardData } from "./app-types";
import { getLastItem } from "./helpers/functions";
import clsx from "clsx";

type AppMenuProps = {
  exerciseBoards: ExerciseBoardData[]
  onExerciseBoardSelection: Function
  activeBoardId: number
};

export default function AppMenu({
  exerciseBoards,
  onExerciseBoardSelection,
  activeBoardId
}: AppMenuProps) {
  let exerciseBoardInc = 1;
  const lastExerciseBoardId = getLastItem<ExerciseBoardData>(exerciseBoards)?.id ?? 0;

  return (
    <div className="flex h-screen w-12 md:w-16 flex-col justify-between">
      <div>
        <div className="inline-flex size-12 md:size-16 items-center justify-center">
          <span className="grid size-8 md:size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            G
          </span>
        </div>

        <ul className="space-y-1 border-t border-frenchgray py-2">
          <li>
            <a
              href="/"
              className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faGear} />
              <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                Settings
              </span>
            </a>
          </li>

          <li>
            <a
              href="/"
              className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                Account
              </span>
            </a>
          </li>

          <li>
            <form action="/">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                  Logout
                </span>
              </button>
            </form>
          </li>
        </ul>

        <div className="border-t border-gray-100">
          <ul className="space-y-1 border-t border-gray-100">
            {exerciseBoards.map((exerciseBoard) => (
              <li key={`app-menu-exercise-board-${exerciseBoard.id}`} style={{marginTop: 0}}>
                <a
                  href="/"
                  className={clsx(
                    'group relative flex justify-center px-2 py-1.5 py-3 hover:bg-eerieblack hover:text-chinarose',
                    activeBoardId === exerciseBoard.id && 'bg-eerieblack text-chinarose',
                    activeBoardId !== exerciseBoard.id && 'text-frenchgray',
                    exerciseBoard.id === lastExerciseBoardId && activeBoardId !== exerciseBoard.id && 'text-sunset',
                    exerciseBoard.id === lastExerciseBoardId && activeBoardId === exerciseBoard.id && 'bg-eerieblack text-chinarose'
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    onExerciseBoardSelection(exerciseBoard.id);
                  }}
                >
                  <FontAwesomeIcon icon={faDumbbell} />
                  <span className="ml-1">{exerciseBoardInc++}</span>
                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    {exerciseBoard.exerciseName}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
