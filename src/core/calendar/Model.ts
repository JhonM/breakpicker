import type { Model } from "../../types";
import { guid } from "../../helpers/random";

const initModel: Model = {
  id: guid(),
  isOpen: false,
  currentDate: new Date(),
};

export default initModel;
