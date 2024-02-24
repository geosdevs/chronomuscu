import { SetsHistoryData, SetsHistoryDataList } from "../../../app-types";
import { getLastItem } from "../../../helpers/functions";
import { PENDING_SETS_HISTORY_ITEM_KEY } from "../ExerciseBoard";

export function getLastSetHistory(setsHistory: SetsHistoryData[]) {
  return getLastItem<SetsHistoryData>(setsHistory);
}

export function getNextSetHistoryId(setsHistory: SetsHistoryData[]): number {
  return (getLastSetHistory(setsHistory)?.id ?? 0) + 1;
}

export function getCurrentSetHistory(setsHistory: SetsHistoryData[]): SetsHistoryData | null {
  const lastSetHistory = getLastSetHistory(setsHistory);
  return lastSetHistory?.restSeconds === 0 ? lastSetHistory : null;
}

export function savePendingSetsHistoryData(
  idExerciseBoard: number,
  setsHistory: SetsHistoryData[]
) {
  let pendingSetsHistoryDataList: SetsHistoryDataList = {};

  try {
    const pendingSetsHistoryStr = localStorage.getItem(PENDING_SETS_HISTORY_ITEM_KEY);
    pendingSetsHistoryDataList = JSON.parse(pendingSetsHistoryStr ?? "");
  } catch (exception) {
    pendingSetsHistoryDataList = {};
  } finally {
    pendingSetsHistoryDataList[idExerciseBoard] = setsHistory;
  }

  localStorage.setItem(PENDING_SETS_HISTORY_ITEM_KEY, JSON.stringify(pendingSetsHistoryDataList));
}

export function resetPendingSetsHistoryData() {
  localStorage.setItem(PENDING_SETS_HISTORY_ITEM_KEY, JSON.stringify({}));
}
