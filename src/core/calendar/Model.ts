import { getCurrentMonthName } from "../../helpers/dates";
import type { Model } from "../../types";

const initModel: Model = {
  isOpen: false,
  currentMonth: getCurrentMonthName,
  currentDate: new Date(),
};

export default initModel;
