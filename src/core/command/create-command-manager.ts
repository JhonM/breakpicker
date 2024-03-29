import { Model } from "../../types";
import { commands } from "./commands";

type CreateCommandMangerType = {
  doCommand: (CommandType: "ADD_SLOT") => void;
  undo: () => void;
  redo: () => void;
};

export const createCommandManager = (
  target: Model,
  msg: any
): CreateCommandMangerType => {
  let history: any = [null];
  let position = 0;

  return {
    doCommand(CommandType: "ADD_SLOT") {
      if (position < history.length - 1) {
        history = history.slice(0, position + 1);
      }

      if (commands[CommandType]) {
        const concreteCommand = commands[CommandType](target, msg);
        history.push(concreteCommand);
        position += 1;

        concreteCommand.execute();
      }
    },

    undo() {
      if (position > 0) {
        history[position].undo();
        position -= 1;
      }
    },

    redo() {
      if (position < history.length - 1) {
        history[position].redo();

        position += 1;
      }
    },
  };
};
