import type { Model } from "../../types";

const initModel: Model = {
  isOpen: false,
  currentMonth: undefined,
  currentDate: new Date(),
};

export default initModel;
