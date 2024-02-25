import { SECONDS_FORMAT_STANDARD, SECONDS_FORMAT_TIMER, secondsToPrettyString } from "./time";

describe("time functions", () => {
  const standardFormats: [number, string][] = [
    [0, "0s"],
    [2, "2s"],
    [60, "1min"],
    [61, "1min01s"],
    [120, "2min"],
    [132, "2min12s"],
  ];

  test.each<[number, string]>(standardFormats)(
    "secondsToPrettyString(%d) default",
    (value: number, expected: string) => {
      expect(secondsToPrettyString(value)).toEqual(expected);
    }
  );

  test.each<[number, string]>(standardFormats)(
    "secondsToPrettyString(%d, SECONDS_FORMAT_STANDARD)",
    (value: number, expected: string) => {
      expect(secondsToPrettyString(value, SECONDS_FORMAT_STANDARD)).toEqual(expected);
    }
  );

  const timerFormats: [number, string][] = [
    [0, "0"],
    [2, "2"],
    [60, "1:00"],
    [61, "1:01"],
    [120, "2:00"],
    [132, "2:12"],
  ];

  test.each<[number, string]>(timerFormats)(
    "secondsToPrettyString(%d, SECONDS_FORMAT_TIMER)",
    (value: number, expected: string) => {
      expect(secondsToPrettyString(value, SECONDS_FORMAT_TIMER)).toEqual(expected);
    }
  );
});
