import { EventType, Model } from "../../types";
import { guid } from "../../helpers/random";
import { graphql } from "../../graphql";

const AllEventsQuery = graphql(`
  query AllEventsQuery {
    getEvents {
      id
      date
    }
  }
`);

const PostEventQuery = graphql(`
  mutation PostEventQuery {
    createEvent(date: "2024-10-25T22:49:58.867Z") {
      date
    }
  }
`);

const GetEventQuery = graphql(`
  query GetEventQuery {
    getEvent(id: "489769e7-d52b-4ad1-867a-97d5e3128639") {
      id
      date
    }
  }
`);

export const addSlotCommand = (model: Model, msg: any) => {
  const date = new Date(model.year, model.month, model.activeDay);

  return {
    execute: async () => {
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

      const newEvent: EventType = {
        id: msg.submitData.eventId,
        date,
        slots: [
          {
            ...msg.submitData,
          },
        ],
      };

      const mergeEvents = [...(model.events || []), newEvent];

      const newModel = {
        ...model,
        events: hasSlots ? matchedEventArray : mergeEvents,
      };

      model.nextId = model.nextId + 1;
      model.showForm = false;
      model.showToast = true;
      model.events = newModel.events;
    },

    undo: () => {
      model.events = model.eventsBeforeCRUD;
    },
  };
};
