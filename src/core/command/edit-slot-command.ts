import { Model } from "../../types";

export const editSlotCommand = (model: Model, msg: any) => {
  return {
    execute: () => {
      const matchedEventArray = model.events?.map((event) => {
        if (event.id === model.eventId) {
          const foundedSlot = event?.slots?.find(
            (slot) => slot.id === model.editId
          );

          if (foundedSlot?.id) {
            const newState = event.slots?.map((obj) =>
              obj.id === foundedSlot.id ? { ...obj, ...msg.submitData } : obj
            );

            const updateSlots = { ...event, slots: newState };
            return updateSlots;
          }

          return event;
        }

        return event;
      });

      const newModel = {
        ...model,
        events: matchedEventArray,
      };

      model.showForm = false;
      model.showToast = true;
      model.editMode = false;
      model.events = newModel.events;
    },
    undo: () => {
      console.info("undo");
      model.events = model.eventsBeforeCRUD;
    },
  };
};
