import {
  getYear,
  getMonth,
  getMonthName,
  getCurrentYear,
  getCurrentMonth,
  getCurrentMonthName,
} from "../dates";

describe("Get dates", () => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  test("getCurrentYear", () => {
    const currentYear = new Date();

    expect(getCurrentYear).toBe(currentYear.getFullYear());
  });

  test("getCurrentMonth", () => {
    const currentMonth = new Date();

    expect(getCurrentMonth).toBe(currentMonth.getMonth());
  });

  test("getCurrentMonthName", () => {
    const currentMonth = new Date();
    const expected = month[currentMonth.getMonth()];

    expect(getCurrentMonthName).toBe(expected);
  });

  test("getYear", () => {
    const date = new Date("2016/02/16");
    const expected = 2016;

    expect(getYear(date)).toBe(expected);
  });

  test("getMonth", () => {
    const date = new Date("2016/02/16");
    const expected = 1;

    expect(getMonth(date)).toBe(expected);
  });

  test("getMonthName", () => {
    const date = new Date("2016/02/16");
    const expected = month[date.getMonth()];

    expect(getMonthName(date)).toBe(expected);
  });
});
