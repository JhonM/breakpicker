import {
  getCurrentMonthName,
  getCurrentYear,
  getMonth,
  getYear,
} from "../../helpers/dates";
import type { EventType, Model } from "../../types";

const today = new Date();

const initModel: Model = {
  month: getMonth(today),
  year: getYear(today),
  currentMonth: getCurrentMonthName,
  currentYear: getCurrentYear,
  currentDate: new Date(),
  currentMonthDays: null,
  showAddForm: false,
  events: [
    {
      id: "1",
      date: new Date("2023-07-23"),
      slots: [
        {
          id: "1",
          title: "slot title",
          duration: 4,
          startDate: new Date(),
          endDate: new Date(),
        },
        {
          id: "2",
          title: "slot title two",
          duration: 3,
          startDate: new Date(),
          endDate: new Date(),
        },
        {
          id: "3",
          title: "slot title three",
          duration: 1,
          startDate: new Date(),
          endDate: new Date(),
        },
      ],
    },
    {
      id: "2",
      date: new Date("2023-08-21"),
      slots: [
        {
          id: "1",
          title: "slot two title",
          duration: 4,
          startDate: new Date(),
          endDate: new Date(),
        },
        {
          id: "2",
          title: "slot two title two",
          duration: 3,
          startDate: new Date(),
          endDate: new Date(),
        },
        {
          id: "3",
          title: "slot two title three",
          duration: 1,
          startDate: new Date(),
          endDate: new Date(),
        },
      ],
    },
    ,
  ] as EventType[],
};

export default initModel;
