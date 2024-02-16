import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  SECONDS_FORMAT_TIMER,
  secondsToPrettyString,
} from "../../../helpers/time";
import PlayToolbar from "./PlayToolbar";
import {
  SESSION_PAUSED,
  SESSION_STARTED,
  SESSION_STOPPED,
} from "../ExerciseBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faHourglass } from "@fortawesome/free-solid-svg-icons";
import Goal from "../Goal";
import SetsTable from "./SetsTable";
import {
  SessionStatus,
  SetsHistoryData,
  TimerActivityStatus,
} from "../../../app-types";
import clsx from "clsx";

export const TIME_INTERVAL_MS = 1000;

export const TIMER_ACTIVITY_STATUS_EXERCISING = "Exercising";
export const TIMER_ACTIVITY_STATUS_RESTING = "Resting";

type TimerProps = {
  timerInitSeconds: number;
  timerActivityStatus: TimerActivityStatus;
  setTimerActivityStatusExercising: Function;
  sessionSate: SessionStatus;
  setSessionState: Function;
  prevRestingTimerMs: number;
  setPrevRestingTimerMs: Function;
  setsHistoryRef: MutableRefObject<SetsHistoryData[]>;
  readOnly: boolean;
  children?: React.ReactNode;
};

export default function Timer({
  timerInitSeconds,
  timerActivityStatus,
  setTimerActivityStatusExercising,
  sessionSate,
  setSessionState,
  prevRestingTimerMs,
  setPrevRestingTimerMs,
  setsHistoryRef,
  readOnly,
}: TimerProps) {
  const [timerStateMs, setTimerStateMs] = useState<number>(
    getTimerInitValueMs(timerInitSeconds, timerActivityStatus)
  );
  const refTimerId = useRef<NodeJS.Timer | null>(null);
  let restingProgress = 0;

  if (
    prevRestingTimerMs > 0 &&
    timerActivityStatus === TIMER_ACTIVITY_STATUS_RESTING
  ) {
    restingProgress = (timerStateMs / prevRestingTimerMs) * 100;
  }

  useEffect(() => {
    switch (sessionSate) {
      case SESSION_STARTED:
        if (!refTimerId.current) {
          refTimerId.current = setInterval(() => {
            setTimerStateMs((prevTimerMs) => {
              let timerMs = prevTimerMs;

              if (timerActivityStatus === TIMER_ACTIVITY_STATUS_EXERCISING) {
                timerMs += TIME_INTERVAL_MS;
              } else if (
                timerActivityStatus === TIMER_ACTIVITY_STATUS_RESTING
              ) {
                timerMs -= TIME_INTERVAL_MS;
              } else {
                throw new Error("Unknown activity status");
              }

              return timerMs;
            });
          }, TIME_INTERVAL_MS);
        }
        break;
      case SESSION_STOPPED:
      case SESSION_PAUSED:
        clearTimer();
        break;
      default:
        throw new Error("Unknown SESSION_STATUS");
    }

    return () => {
      clearTimer();
    };
  }, [sessionSate, timerActivityStatus]);

  useEffect(() => {
    if (timerStateMs === 0) {
      setTimerActivityStatusExercising();
    }
  }, [timerStateMs, setTimerActivityStatusExercising]);

  useEffect(() => {
    if (readOnly && refTimerId.current !== null) {
      stopTimer();
    }
  });

  function getTimerInitValueMs(
    wantedAmount: number,
    timerActivityStatus: TimerActivityStatus
  ) {
    return timerActivityStatus === TIMER_ACTIVITY_STATUS_EXERCISING
      ? 0
      : wantedAmount * TIME_INTERVAL_MS;
  }

  function handlePlay() {
    if (!readOnly) {
      setSessionState(SESSION_STARTED);
    }
  }

  function handlePause() {
    if (!readOnly) {
      clearTimer();
      setSessionState(SESSION_PAUSED);
    }
  }

  function handleStop() {
    if (!readOnly) {
      stopTimer();
    }
  }

  function stopTimer() {
    setTimerStateMs(0);
    setPrevRestingTimerMs(0);
    clearTimer();
    setTimerActivityStatusExercising();
    setSessionState(SESSION_STOPPED);
  }

  function clearTimer() {
    if (refTimerId.current) {
      clearInterval(refTimerId.current);
      refTimerId.current = null;
    }
  }

  return (
    <>
      <div className="row-span-1 col-span-4 row-start-1 w-100">
        <div className="flex rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
          <PlayToolbar
            onPlayClick={(playPauseBtnState) => {
              handlePlay();
            }}
            onPauseClick={(playPauseBtnState) => {
              handlePause();
            }}
            onStopClick={() => {
              handleStop();
            }}
            sessionSate={sessionSate}
            readonly={readOnly}
          ></PlayToolbar>

          <div className="my-2 w-4/5">
            <div className="text-center">
              {[SESSION_PAUSED, SESSION_STOPPED].includes(sessionSate) ? (
                <span className="font-bold text-5xl text-frenchgray">
                  {secondsToPrettyString(
                    timerStateMs / 1000,
                    SECONDS_FORMAT_TIMER
                  )}
                </span>
              ) : (
                <span className="font-bold text-5xl">
                  {secondsToPrettyString(
                    timerStateMs / 1000,
                    SECONDS_FORMAT_TIMER
                  )}
                </span>
              )}
            </div>
            <span
              role="progressbar"
              aria-labelledby="ProgressLabel"
              className={clsx(
                "block rounded-full my-2",
                {
                  "bg-gray-200": timerActivityStatus === TIMER_ACTIVITY_STATUS_RESTING,
                  "bg-sunset": timerActivityStatus === TIMER_ACTIVITY_STATUS_EXERCISING
                    && sessionSate === SESSION_STARTED
                }
              )}
            >
              <span
                className="block h-3 rounded-full bg-gunmetal"
                style={{ width: restingProgress + "%" }}
              ></span>
            </span>

            <span className="ml-1 mt-1.5 inline-block">
              <span className={clsx(
                'inline-flex items-center justify-center rounded-full px-2.5 py-0.5',
                timerActivityStatus === TIMER_ACTIVITY_STATUS_EXERCISING && 'bg-orange-100 text-orange-700',
                timerActivityStatus === TIMER_ACTIVITY_STATUS_RESTING && 'bg-blue-100 text-blue-700',
                sessionSate !== SESSION_STARTED && 'hidden'
              )}>
                  <FontAwesomeIcon icon={timerActivityStatus === TIMER_ACTIVITY_STATUS_EXERCISING ? faDumbbell : faHourglass} size="lg" />
                  <p className="whitespace-nowrap ml-1 text-sm">
                    {timerActivityStatus}
                  </p>
                </span>
            </span>
          </div>
        </div>
      </div>

      <div className="w-fit my-2 md:mx-2 row-span-2 col-span-4 row-start-3 md:col-span-2 md:row-start-2">
        <Goal></Goal>
        <SetsTable
          setsHistoryRef={setsHistoryRef}
          sessionSate={sessionSate}
          timerActivityStatus={timerActivityStatus}
          timerSeconds={timerStateMs}
          readOnly={readOnly}
        ></SetsTable>
      </div>
    </>
  );
}
