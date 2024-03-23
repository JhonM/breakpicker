import { Model } from "../../types";
import { guid } from "../../helpers/random";

export const addSlotCommand = (model: Model, msg: any) => {
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
