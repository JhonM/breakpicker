import { Model } from "../../types";

export const copyEventCommand = (model: Model, msg: any) => {
  return {
    execute: async () => {
      console.info("execute");
      console.info(model, "model");
      console.info(msg, "msg");
    },

    undo: () => {
      console.info("undo");
    },
  };
};
