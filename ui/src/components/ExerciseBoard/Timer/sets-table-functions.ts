import { MutableRefObject } from "react";
import { SetsHistoryData } from "../../../app-types";

export function getLastSetHistory(setsHistoryRef: MutableRefObject<SetsHistoryData[]>) {
  return setsHistoryRef.current[setsHistoryRef.current.length - 1];
}

export function getNextSetHistoryId(setsHistoryRef: MutableRefObject<SetsHistoryData[]>): number {
  return (getLastSetHistory(setsHistoryRef)?.id ?? 0) + 1;
}

export function getCurrentSetHistory(setsHistoryRef: MutableRefObject<SetsHistoryData[]>): SetsHistoryData | null {
  const lastSetHistory = getLastSetHistory(setsHistoryRef);
  return lastSetHistory?.restSeconds === 0 ? lastSetHistory : null;
}