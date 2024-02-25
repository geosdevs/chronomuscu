import { SetsHistoryData } from "../app-types";
import {
  getCurrentSetHistory,
  getLastSetHistory,
  getNextSetHistoryId,
} from "./sets-table-functions";

describe("sets table functions", () => {
  const setsHistory: SetsHistoryData[] = [
    { id: 34, activitySeconds: 10, restSeconds: 20 },
    { id: 36, activitySeconds: 17, restSeconds: 60 },
    { id: 35, activitySeconds: 12, restSeconds: 35 },
  ];

  test("getLastItem", () => {
    expect(getLastSetHistory(setsHistory)).toMatchObject({
      id: 36,
      activitySeconds: 17,
      restSeconds: 60,
    });
    expect(getLastSetHistory([])).toBeNull();
  });

  test("getNextSetHistoryId", () => {
    expect(getNextSetHistoryId(setsHistory)).toStrictEqual(37);
  });

  test("getCurrentSetHistory", () => {
    const lastSetExercising = [...setsHistory, { id: 40, activitySeconds: 22, restSeconds: 0 }];
    const zeroRestSecondsIsNotTheLast = [
      ...setsHistory,
      { id: 10, activitySeconds: 22, restSeconds: 0 },
    ];
    expect(getCurrentSetHistory(setsHistory)).toBeNull();
    expect(getCurrentSetHistory(lastSetExercising)).toMatchObject({
      id: 40,
      activitySeconds: 22,
      restSeconds: 0,
    });
    expect(getCurrentSetHistory(zeroRestSecondsIsNotTheLast)).toBeNull();
  });
});
