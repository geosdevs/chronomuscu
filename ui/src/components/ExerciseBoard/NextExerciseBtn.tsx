import { faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type NextExerciseBtnProps = {
  onNextExerciseClick: Function;
  setReadOnlyState: Function;
};

export default function NextExerciseBtn({
  onNextExerciseClick,
  setReadOnlyState,
}: NextExerciseBtnProps) {
  return (
    <a
      className="group ml-6 relative inline-block text-sm font-bold text-chinarose focus:outline-none focus:ring active:text-slate-500"
      href="/"
      onClick={(e) => {
        e.preventDefault();
        onNextExerciseClick();
        setReadOnlyState(true);
      }}
    >
      <span className="rounded-lg absolute inset-0 translate-x-0 translate-y-0 bg-chinarose transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"></span>

      <span className="rounded-lg relative block border border-chinarose hover:border-current bg-white px-2.5 py-1.5">
        {" "}
        Next <FontAwesomeIcon icon={faForward} />{" "}
      </span>
    </a>
  );
}
