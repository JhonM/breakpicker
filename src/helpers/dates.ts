const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const date = new Date;

export const getYear = (d: Date) => d.getFullYear();
export const getMonth = (d: Date) => d.getMonth();
export const getMonthName = (d: Date) => month[d.getMonth()];

export const getCurrentYear = getYear(date);
export const getCurrentMonth = getMonth(date);
export const getCurrentMonthName = getMonthName(date);
