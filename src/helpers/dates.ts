export type DayDetailsType = {
  index: number;
  numberOfDays: number;
  firstDay: number;
  year: number;
  month: number;
};

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

const today = new Date();

export const getYear = (d: Date) => d.getFullYear();
export const getMonth = (d: Date) => d.getMonth();
export const getMonthName = (d: Date) => months[d.getMonth()];

export const getCurrentYear = getYear(today);
export const getCurrentMonth = getMonth(today);
export const getCurrentMonthName = getMonthName(today);

export const getNumberOfDays = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

export const getCalendarDays = () => {
  const totalCalendarDay = 6 * 7;

  var start = 0;
  return Array(totalCalendarDay - start + 1)
    .fill(true)
    .map(() => start++);
};
