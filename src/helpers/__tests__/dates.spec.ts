import {
  getYear,
  getMonth,
  getMonthName,
  getCurrentYear,
  getCurrentMonth,
  getCurrentMonthName,
  getNumberOfDays,
} from "../dates";

describe("Get dates", () => {
  const months = [
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
    const expected = months[currentMonth.getMonth()];

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
    const expected = months[date.getMonth()];

    expect(getMonthName(date)).toBe(expected);
  });

  test("getNumberOfDays", () => {
    const febTwentyTwenty = getNumberOfDays(2020, 2);
    expect(febTwentyTwenty).toBe(29);

    const febTwentyTwentyFive = getNumberOfDays(2025, 2);
    expect(febTwentyTwentyFive).toBe(28);

    const decemberEightyEightyOne = getNumberOfDays(1981, 12);
    expect(decemberEightyEightyOne).toBe(31);
  });
});
