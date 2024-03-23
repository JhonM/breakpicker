import { Model } from "../../types";
import { guid } from "../../helpers/random";

type CreateCommandMangerType = {
  doCommand: (CommandType: "ADD_SLOT") => void;
  undo: () => void;
  redo: () => void;
};

const addSlotCommand = (model: Model, msg: any) => {
  return {
    execute: () => {
      const matchedEventArray = model.events?.map((event) => {
        if (event.id === model.currentSlotId) {
          const newSlot = {
            id: guid(),
            startDate: new Date(),
            endDate: new Date(),
            ...msg.submitData,
          };

          const mergeSlots = [...(event.slots || []), newSlot];
          const updatedSlots = { ...event, slots: mergeSlots };

          return updatedSlots;
        }

        return event;
      });

      const hasSlots = model.events?.find(
        (event) => event.id === model.currentSlotId
      );

      const newEvent = {
        id: model.nextId + 1,
        date: msg.submitData.date,
        slots: [
          {
            id: guid(),
            startDate: new Date(),
            endDate: new Date(),
            ...msg.submitData,
          },
        ],
      };

      const mergeEvents = [...(model.events || []), newEvent];

      const newModel = {
        ...model,
        events: hasSlots ? matchedEventArray : mergeEvents,
      };
      model.events = newModel.events;
    },

    undo: () => {
      model.events = model.eventsBeforeAddedSlot;
    },
  };
};

const ADD_SLOT = "ADD_SLOT";

const commands = {
  [ADD_SLOT]: addSlotCommand,
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
