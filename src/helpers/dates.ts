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
