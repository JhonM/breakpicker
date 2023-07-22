import { getCurrentMonthName, getCurrentYear } from "../../helpers/dates";
import type { Model } from "../../types";

const initModel: Model = {
  currentMonth: getCurrentMonthName,
  currentYear: getCurrentYear,
  currentDate: new Date(),
};

export default initModel;
