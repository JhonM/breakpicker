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

const daysMap = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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

export const getDayDetails = ({
  index,
  numberOfDays,
  firstDay,
  year,
  month,
}: DayDetailsType) => {
  const date = index - firstDay;
  const day = index % 7;
  let prevMonth = month - 1;
  let prevYear = year;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear--;
  }
  let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
  let _date = date < 0 ? prevMonthNumberOfDays + date : date % numberOfDays;
  let _month = date < 0 ? -1 : date >= numberOfDays ? 1 : 0;
  let timestamp = new Date(year, month, _date).getTime();

  return {
    date: _date,
    day,
    month: _month,
    timestamp,
    dayString: daysMap[day],
  };
};

export const getMonthDetails = (year: number, month: number) => {
  const firstDay = new Date(year, month).getDate();
  const numberOfDays = getNumberOfDays(year, month);
  const monthArray = [];
  const rows = 6;
  const cols = 7;
  let currentDay = null;
  let index = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      currentDay = getDayDetails({
        index,
        numberOfDays,
        firstDay,
        year,
        month,
      });
      monthArray.push(currentDay);
      index++;
    }
  }
  return monthArray;
};
