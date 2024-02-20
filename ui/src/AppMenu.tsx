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
  exerciseBoards: ExerciseBoardData[];
  onExerciseBoardSelection: Function;
  activeBoardId: number;
  position: typeof MENU_POSITION_LEFT | typeof MENU_POSITION_BOTTOM;
};

export const MENU_POSITION_LEFT = "left";
export const MENU_POSITION_BOTTOM = "bottom";

export default function AppMenu({
  exerciseBoards,
  onExerciseBoardSelection,
  activeBoardId,
  position,
}: AppMenuProps) {
  let exerciseBoardInc = 1;
  const lastExerciseBoardId =
    getLastItem<ExerciseBoardData>(exerciseBoards)?.id ?? 0;
  
  function isMenuBottom() {
    return position === MENU_POSITION_BOTTOM;
  }

  function isMenuLeft() {
    return position === MENU_POSITION_LEFT;
  }

  return (
    <nav className={clsx(
      isMenuLeft() && 'fixed bg-gunmetal hidden md:block',
      isMenuBottom() && 'fixed bg-gunmetal md:hidden bottom-0 w-full',
    )}>
      <div
        className={clsx(
          "inline-flex justify-start",
          isMenuLeft() && "flex-col w-12 md:w-16 h-screen",
          isMenuBottom() && "flex-row"
        )}
      >
        <div className="inline-flex size-12 md:size-16 items-center justify-center">
          <span className="grid size-8 md:size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            G
          </span>
        </div>

        <ul className={clsx(
          'space-y-1 inline-flex border-frenchgray',
          isMenuLeft() && "flex-col border-t border-b",
          isMenuBottom() && "flex-row border-l border-r"
        )}>
          <li>
            <a
              href="/"
              className="h-full group relative flex justify-center px-2 py-3 text-gray-500 hover:bg-eerieblack hover:text-chinarose"
            >
              <FontAwesomeIcon icon={faGear} />
              <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                Settings
              </span>
            </a>
          </li>

          <li>
            <a
              href="/"
              className="h-full group relative flex justify-center px-2 py-3 text-gray-500 hover:bg-eerieblack hover:text-chinarose"
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                Account
              </span>
            </a>
          </li>

          <li>
            <form action="/">
              <button
                type="submit"
                className="h-full group relative flex w-full justify-center px-2 py-3 text-sm text-gray-500 hover:bg-eerieblack hover:text-chinarose"
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                  Logout
                </span>
              </button>
            </form>
          </li>
        </ul>

        <div className="">
          <ul className={clsx(
            'space-y-1',
            isMenuLeft() && 'flex flex-col',
            isMenuBottom() && 'inline-flex flex-row w-[80vw] overflow-x-auto'
          )}>
            {exerciseBoards.map((exerciseBoard) => (
              <li
                key={`app-menu-exercise-board-${exerciseBoard.id}`}
                style={{ marginTop: 0 }}
              >
                <a
                  href="/"
                  className={clsx(
                    "group relative flex justify-center px-2 py-1.5 py-3 hover:bg-eerieblack hover:text-chinarose",
                    activeBoardId === exerciseBoard.id &&
                      "bg-eerieblack text-chinarose",
                    activeBoardId !== exerciseBoard.id && "text-frenchgray",
                    exerciseBoard.id === lastExerciseBoardId &&
                      activeBoardId !== exerciseBoard.id &&
                      "text-sunset",
                    exerciseBoard.id === lastExerciseBoardId &&
                      activeBoardId === exerciseBoard.id &&
                      "bg-eerieblack text-chinarose"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    onExerciseBoardSelection(exerciseBoard.id);
                  }}
                >
                  <FontAwesomeIcon icon={faDumbbell} />
                  <span className="ml-1">{exerciseBoardInc++}</span>
                  {isMenuLeft() && (
                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    {exerciseBoard.exerciseName}
                  </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
