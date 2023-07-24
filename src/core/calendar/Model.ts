import { getCurrentMonthName, getCurrentYear } from "../../helpers/dates";
import type { Model } from "../../types";

const initModel: Model = {
  currentMonth: getCurrentMonthName,
  currentYear: getCurrentYear,
  currentDate: new Date(),
  currentMonthDays: null,
  showAddForm: false,
  dateSlots: [
    { id: 1, title: "slot title", duration: 4, startDate: new Date() },
    { id: 2, title: "slot title two", duration: 3, startDate: new Date() },
    { id: 3, title: "slot title three", duration: 1, startDate: new Date() },
  ],
};

export default initModel;
