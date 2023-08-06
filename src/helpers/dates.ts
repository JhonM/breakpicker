import { MonthType, Months } from "../types";

export type DayDetailsType = {
  index: number;
  numberOfDays: number;
  firstDay: number;
  year: number;
  month: number;
};

const today = new Date();

export const getYear = (d: Date) => d.getFullYear();
export const getMonth = (d: Date) => d.getMonth();
export const getMonthName = (d: Date): MonthType => Months[d.getMonth()];

export const getCurrentYear = getYear(today);
export const getCurrentMonth = getMonth(today);
export const getCurrentMonthName: MonthType = getMonthName(today);

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
