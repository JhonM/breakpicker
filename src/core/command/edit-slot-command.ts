import { Model } from "../../types";

export const editSlotCommand = (model: Model, msg: any) => {
  return {
    execute: () => {
      const matchedEventArray = model.events?.map((event) => {
        const findEvent = event.slots?.find((slot) => slot.id === msg.slotId);

        if (findEvent) {
          const newSlot = {
            ...findEvent,
          };

          const mergeSlots = [...(event.slots || []), newSlot];
          const updateSlots = { ...event, slots: mergeSlots };

          return updateSlots;
          return findEvent;
        }
        // if (event.id === model.currentSlotId) {
        //   const newSlot = {
        //     title: "Adjusted title",
        //   };

        //   const mergeSlots = [...(event.slots || []), newSlot];
        //   const updateSlots = { ...event, slots: mergeSlots };

        //   return updateSlots;
        // }

        return event;
      });

      const hasSlots = model.events?.find(
        (event) => event.id === model.currentSlotId
      );

      const newEvent = {
        ...model,
        events: matchedEventArray,
      };

      const mergeEvents = [...(model.events || []), newEvent];

      const newModel = {
        ...model,
        events: hasSlots ? matchedEventArray : mergeEvents,
      };

      // model.showToast = true;
      model.events = newModel.events;
    },
    undo: () => {
      console.info("undo");
      // model.events = model.eventsBeforeCRUD;
    },
  };
};
