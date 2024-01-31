import Goal from "./Goal";
import SetsTable from "./SetsTable";
import Timer, { TIMER_ACTIVITY_STATUS_RESTING } from "./Timer/Timer";
import { setsTableData } from "../tests/setsData";
import PlayToolbar from "./Timer/PlayToolbar";
import React, { useRef, useState } from "react";
import { TimerActivityStatus } from "./Timer/timer-types";
import RestBoard from "./RestBoard/RestBoard";

export default function ExerciseBoard() {
  function handlePlayTimer() {}

  return (
    <>
      <section>
        <div>
          <Timer timerInit={2000}></Timer>
          <Goal></Goal>
        </div>
        <div>
          <SetsTable setsData={setsTableData}></SetsTable>
        </div>
      </section>

      <aside>
        <RestBoard></RestBoard>
      </aside>
    </>
  );
}
