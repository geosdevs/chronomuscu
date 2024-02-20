import React, { Fragment, MutableRefObject, useContext } from "react";
import { secondsToPrettyString } from "../../../helpers/time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faHashtag,
  faHourglass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  SessionStatus,
  SetsHistoryData,
  TimerActivityStatus,
} from "../../../app-types";
import { TIMER_ACTIVITY_STATUS_EXERCISING, TIME_INTERVAL_MS } from "./Timer";
import {
  ExerciseBoardSetsHistoryRemoveContext,
  SESSION_STARTED,
} from "../ExerciseBoard";
import {
  getCurrentSetHistory,
  getNextSetHistoryId,
} from "./sets-table-functions";
import clsx from "clsx";

type SetsTableProps = {
  setsHistoryRef: MutableRefObject<SetsHistoryData[]>;
  sessionSate: SessionStatus;
  timerActivityStatus: TimerActivityStatus;
  timerSeconds: number;
  readOnly: boolean;
  children?: React.ReactNode;
};

export default function SetsTable({
  setsHistoryRef,
  sessionSate,
  timerActivityStatus,
  timerSeconds,
  readOnly,
}: SetsTableProps) {
  let rowInc = 1;
  const onSetHistoryRemove = useContext(ExerciseBoardSetsHistoryRemoveContext);

  function handleSetsHistory() {
    if (
      sessionSate === SESSION_STARTED &&
      timerActivityStatus === TIMER_ACTIVITY_STATUS_EXERCISING
    ) {
      const currentSetHistory = getCurrentSetHistory(setsHistoryRef);

      if (!currentSetHistory) {
        setsHistoryRef.current.push({
          id: getNextSetHistoryId(setsHistoryRef),
          activitySeconds: timerSeconds / TIME_INTERVAL_MS,
          restSeconds: 0,
        });
      } else {
        currentSetHistory.activitySeconds = timerSeconds / TIME_INTERVAL_MS;
      }
    }
  }

  handleSetsHistory();

  return (
    <div className="">
      <h3 className="text-2xl font-bold text-gray-900">Current set history</h3>
      <div className="grid">
        {setsHistoryRef.current.map((row, index) => {
          const rowStartClass = `row-start-${index + 1}`;
          return (
            <Fragment key={row.id}>
              <div
                className={"col-start-1 col-span-1 mx-2 my-1 " + rowStartClass}
              >
                <FontAwesomeIcon icon={faHashtag} size="lg" />
                <span className="text-lg font-bold">{rowInc++}</span>
              </div>
              <div className={"col-start-2 col-span-3 " + rowStartClass}>
                <span className="align-middle mx-2 my-1 inline-flex items-center justify-center rounded-full bg-orange-100 px-2.5 py-0.5 text-orange-700">
                  <FontAwesomeIcon icon={faDumbbell} size="lg" />
                  <p className="whitespace-nowrap ml-1 txt-6xl">
                    {secondsToPrettyString(row.activitySeconds)}
                  </p>
                </span>
                <span className="align-middle mx-2 my-1 inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-bluemunsell">
                  {row.restSeconds > 0 ? (
                    <>
                      <FontAwesomeIcon icon={faHourglass} size="sm" />
                      <p className="whitespace-nowrap ml-1 text-sm">
                        {secondsToPrettyString(row.restSeconds)}
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <div className={"col-start-5 col-span-1 " + rowStartClass}>
                <button
                  disabled={readOnly}
                  className={clsx(
                    "leading-8 disabled:hidden text-chinarose hover:text-ecru hover:scale-125 transform ease-in-out duration-300",
                    index === setsHistoryRef.current.length - 1 && "hidden"
                  )}
                  onClick={() => {
                    if (!readOnly && typeof onSetHistoryRemove === "function") {
                      onSetHistoryRemove(row.id);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
