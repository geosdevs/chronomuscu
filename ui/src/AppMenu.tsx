import {
  faArrowRightFromBracket,
  faDumbbell,
  faGear,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExerciseBoardData } from "./app-types";
import { getLastItem } from "./helpers/functions";

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
    <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
      <div>
        <div className="inline-flex size-16 items-center justify-center">
          <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            G
          </span>
        </div>

        <ul className="space-y-1 border-t border-gray-100 py-2">
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

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
              Add Exercise board
            </span>
          </button>
        </div>

        <div className="border-t border-gray-100">
          <ul className="space-y-1 border-t border-gray-100">
            {exerciseBoards.map((exerciseBoard) => (
              <li key={`app-menu-exercise-board-${exerciseBoard.id}`} style={{marginTop: 0}}>
                <a
                  href="/"
                  className={`${activeBoardId === exerciseBoard.id ? 'bg-blue-100 text-blue-700' : 'text-gray-500'} ${exerciseBoard.id === lastExerciseBoardId ? 'font-bold text-lg' : ''} group relative flex justify-center px-2 py-1.5 py-3 hover:bg-blue-100 hover:text-gray-700 active:bg-blue-200`}
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
