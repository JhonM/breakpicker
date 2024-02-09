import {
  getCurrentMonthName,
  getCurrentYear,
  getMonth,
  getYear,
} from "../../helpers/dates";
import { guid } from "../../helpers/random";
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
  nextId: 2,
  editId: null,
  events: [
    {
      id: 1,
      date: new Date("2024-02-13"),
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
      id: 2,
      date: new Date("2024-01-12"),
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
