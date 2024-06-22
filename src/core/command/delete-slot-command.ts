import { Model } from "../../types";

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
