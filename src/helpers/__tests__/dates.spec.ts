import { getCurrentYear, getCurrentMonth, getCurrentMonthName } from "../dates";

describe("current dates", () => {
  test("year", () => {
    const currentYear = new Date();

    expect(getCurrentYear).toBe(currentYear.getFullYear());
  });

  test("month", () => {
    const currentMonth = new Date();

    expect(getCurrentMonth).toBe(currentMonth.getMonth());
  });

  test("month name", () => {
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
    const currentMonth = new Date();
    const expected = month[currentMonth.getMonth()];

    expect(getCurrentMonthName).toBe(expected);
  });
});
