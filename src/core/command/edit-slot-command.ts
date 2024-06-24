import { Model } from "../../types";

export const editSlotCommand = (model: Model, msg: any) => {
  return {
    execute: () => {
      console.info("execute");
      model.showToast = true;
    },
  };
  undo: () => {
    console.info("undo");
  };
};
