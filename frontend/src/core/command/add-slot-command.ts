import { EventType, Model } from "../../types";
import { guid } from "../../helpers/random";
import { graphql } from "../../graphql";
import { createSlotQuery } from "../../api/createSlotQuery";

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

const variables = {
  mainTitle: "Some slot title",
  duration: 4,
  startDate: new Date(),
  endDate: new Date(),
};

export const addSlotCommand = (model: Model, msg: any) => {
  return {
    execute: async () => {
      const data = await createSlotQuery(variables);

      console.info(data, "data");
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
        id: guid(),
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
