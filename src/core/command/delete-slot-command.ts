import { Model, MsgType } from "../../types";
import { guid } from "../../helpers/random";

export const deleteSlotCommand = (model: Model, msg: MsgType) => {
  return {
    execute: () => {
      const matchedEventArray = model.events?.map((event) => {
        if (event.date === msg.date) {
          const deleteSlot = event?.slots?.filter(
            (slot) => slot.id !== msg.slotId
          );

          const hasSlots = event.slots.find(
            (slot) => slot.id === model.currentSlotId
          );
          const updatedSlots = { ...event, slots: deleteSlot };

          return updatedSlots;
        }

        return event;
      });

      const newModel = {
        ...model,
        events: matchedEventArray,
      };

      model.events = newModel.events;
    },
    undo: () => {
      model.events = model.eventsBeforeAddedSlot;
    },
  };
};
