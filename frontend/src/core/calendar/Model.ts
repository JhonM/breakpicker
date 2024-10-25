import {
  getCurrentMonthName,
  getCurrentYear,
  getMonth,
  getYear,
} from "../../helpers/dates";
import { guid } from "../../helpers/random";
import type { EventType, Model } from "../../types";

import { graphql } from "../../graphql";
import { execute } from "../../graphql/execute";

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

execute(GetEventQuery).then((data) => {
  console.info(data, "data");
});

const today = new Date();

function addDaysToDate(date: Date, days: number) {
  let new_date = new Date(date);
  new_date.setDate(new_date.getDate() + days);
  return new_date;
}

const initModel: Model = {
  month: getMonth(today),
  year: getYear(today),
  currentMonth: getCurrentMonthName,
  currentYear: getCurrentYear,
  currentDate: new Date(),
  currentMonthDays: null,
  showForm: false,
  editMode: false,
  nextId: 2,
  editId: null,
  eventId: null,
  currentSlotId: null,
  events: [
    {
      id: guid(),
      date: addDaysToDate(today, 3),
      slots: [
        {
          id: guid(),
          title: "slot title",
          duration: 4,
          startDate: new Date(),
          endDate: new Date(),
        },
        {
          id: guid(),
          title: "slot title two",
          duration: 3,
          startDate: new Date(),
          endDate: new Date(),
        },
        {
          id: guid(),
          title: "slot title three",
          duration: 1,
          startDate: new Date(),
          endDate: new Date(),
        },
      ],
    },
    {
      id: guid(),
      date: addDaysToDate(today, 7),
      slots: [
        {
          id: guid(),
          title: "slot two title",
          duration: 4,
          startDate: new Date(),
          endDate: new Date(),
        },
        {
          id: guid(),
          title: "slot two title two",
          duration: 3,
          startDate: new Date(),
          endDate: new Date(),
        },
        {
          id: guid(),
          title: "slot two title three",
          duration: 1,
          startDate: new Date(),
          endDate: new Date(),
        },
      ],
    },
  ] as EventType[],
};

export default initModel;
