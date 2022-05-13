import type { Model } from "../../types";
import { guid } from "../../helpers/random";

const initModel: Model = {
  isOpen: false,
  currentDate: new Date(),
};

export default initModel;
