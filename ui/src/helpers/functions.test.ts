import { SESSION_PAUSED, SESSION_STARTED, SESSION_STOPPED } from "../App";
import { ExerciseBoardData } from "../app-types";
import {
  TIMER_ACTIVITY_STATUS_EXERCISING,
  TIMER_ACTIVITY_STATUS_RESTING,
} from "../components/ExerciseBoard/Timer/Timer";
import MissingImplementationError from "../exceptions/missing-implementation";
import {
  getLastItem,
  isExercising,
  isResting,
  missingImplementation,
  sessionPaused,
  sessionStarted,
  sessionStopped,
} from "./functions";

describe("util functions", () => {
  test("getLastItem", () => {
    const listOfNumbers = [2, 4, 6, 8];
    const exerciseBoardsData: ExerciseBoardData[] = [
      { id: 34, exerciseName: "Squat" },
      { id: 35, exerciseName: "Deadlift" },
      { id: 36, exerciseName: "Dragon flag" },
    ];

    expect(getLastItem(listOfNumbers)).toStrictEqual(8);
    expect(getLastItem(exerciseBoardsData)).toMatchObject({
      id: 36,
      exerciseName: "Dragon flag",
    });
    console.log(getLastItem([]))
  });

  test("isExercising", () => {
    expect(isResting(true)).toStrictEqual(false);
    expect(isResting(false)).toStrictEqual(false);
    expect(isResting(1)).toStrictEqual(false);
    expect(isExercising(TIMER_ACTIVITY_STATUS_RESTING)).toStrictEqual(false);
    expect(isExercising(TIMER_ACTIVITY_STATUS_EXERCISING)).toStrictEqual(true);
  });

  test("isResting", () => {
    expect(isResting(true)).toStrictEqual(false);
    expect(isResting(false)).toStrictEqual(false);
    expect(isResting(1)).toStrictEqual(false);
    expect(isResting(TIMER_ACTIVITY_STATUS_EXERCISING)).toStrictEqual(false);
    expect(isResting(TIMER_ACTIVITY_STATUS_RESTING)).toStrictEqual(true);
  });

  test("sessionStarted", () => {
    expect(sessionStarted(true)).toStrictEqual(false);
    expect(sessionStarted(false)).toStrictEqual(false);
    expect(sessionStarted(1)).toStrictEqual(true);
    expect(sessionStarted(SESSION_PAUSED)).toStrictEqual(false);
    expect(sessionStarted(SESSION_STOPPED)).toStrictEqual(false);
    expect(sessionStarted(SESSION_STARTED)).toStrictEqual(true);
  });

  test("sessionStopped", () => {
    expect(sessionStopped(true)).toStrictEqual(false);
    expect(sessionStopped(false)).toStrictEqual(false);
    expect(sessionStopped(SESSION_PAUSED)).toStrictEqual(false);
    expect(sessionStopped(SESSION_STOPPED)).toStrictEqual(true);
    expect(sessionStopped(SESSION_STARTED)).toStrictEqual(false);
  });

  test("sessionPaused", () => {
    expect(sessionPaused(true)).toStrictEqual(false);
    expect(sessionPaused(false)).toStrictEqual(false);
    expect(sessionPaused(SESSION_PAUSED)).toStrictEqual(true);
    expect(sessionPaused(SESSION_STOPPED)).toStrictEqual(false);
    expect(sessionPaused(SESSION_STARTED)).toStrictEqual(false);
  });

  test("missingImplementation", () => {
    expect(() => {
      missingImplementation();
    }).toThrow(MissingImplementationError);
  });
});
