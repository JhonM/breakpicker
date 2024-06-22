import { Model, MsgType } from "../../types";
import { guid } from "../../helpers/random";

export const deleteSlotCommand = (model: Model, msg: any) => {
  return {
    execute: () => {
      const matchedEventArray = model.events?.map((event) => {
        if (
          event.date.toLocaleDateString === msg.startDate.toLocaleDateString
        ) {
          const deleteSlot = event?.slots?.filter(
            (slot) => slot.id !== msg.slotId
          );

          const hasSlots = event.slots?.find(
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

      model.showToast = true;
      model.events = newModel.events;
    },
    undo: () => {
      model.events = model.eventsBeforeCRUD;
    },
  };
};
